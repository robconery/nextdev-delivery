import dotenv from 'dotenv'
dotenv.config();
import assert from 'assert';
import ejs from 'ejs';
import MarkdownIt from 'markdown-it';
import frontMatter from 'front-matter';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const md = MarkdownIt();

const tsp = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 465,
  secure: true,
  pool: true,
  auth: {
    user: "mail@mg.bigmachine.io",
    pass: process.env.MAILGUN_API_KEY,
  },
});

export class Email {
  constructor(args) {
    assert(args.template, "Need a template");
    assert(args.email, "Need an email please");

    this.template = `${args.template}.md`;
    this.data = args.data || null;
    this.email = args.email;
  }
  static async sendErrorToRob(err) {
    try {
      const ctx = err.data ? JSON.stringify(err.data) : "--";
      await new Email({
        email: "rob@bigmachine.io",
        template: "error",
        data: {
          message: err.message,
          stack: err.stack,
          context: JSON.stringify(ctx),
        },
      }).send();
    } catch (err) {
      console.error(err);
      //swallow this so we don't get recursion
    }
  }
  async render() {
    const templateFile = path.resolve(__dirname, this.template);
    const template = fs.readFileSync(templateFile, "utf-8");

    // First render with EJS to process the data
    const renderOne = ejs.render(template, this.data || {});
    
    // Parse front matter
    const mattered = frontMatter(renderOne);

    assert(
      mattered.attributes.subject,
      "Can't send an email without a subject"
    );
    
    const layoutFile = path.resolve(__dirname, "layout.ejs");
    const layout = fs.readFileSync(layoutFile, "utf-8");

    // Convert markdown body to HTML
    const body = md.render(mattered.body);
    
    // Render the final email with layout
    const renderThree = ejs.render(layout, {
      data: {
        body: body,
        preheader: mattered.attributes.subject || ""
      },
    });
    
    this.body = renderThree;
    this.subject = mattered.attributes.subject;
  }
  async send() {
    await this.render();

    if (process.env.NODE_ENV !== "test") {
      console.log("Sending", this.template, "to", this.email);

      this.response = await tsp.sendMail({
        from: "Rob Conery <rob@bigmachine.io>", // sender address
        to: this.email, // list of receivers
        subject: this.subject, // Subject line
        html: this.body, // html body
      });
    } else {
      this.response = { sent: false, mail: this.body, subject: this.subject };
    }

    this.sent_at = new Date();
    this.sent_at_unix = new Date();

    //strip the data
    delete this.data;
    return this;
  }
}