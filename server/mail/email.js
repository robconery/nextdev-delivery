import dotenv from 'dotenv'
dotenv.config();
import assert from 'assert';
import ejs from 'ejs';
import MarkdownIt from 'markdown-it';
import frontMatter from 'front-matter';
import nodemailer from 'nodemailer';
import { templates } from './templates.js';
import { layout } from './layout.js';

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

    this.template = args.template;
    this.data = args.data || null;
    this.email = args.email;
  }

  async render() {
    const template = templates[this.template];
    assert(template, `Template '${this.template}' not found`);

    // First render with EJS to process the data
    const renderOne = ejs.render(template, this.data || {});
    
    // Parse front matter
    const mattered = frontMatter(renderOne);

    assert(
      mattered.attributes.subject,
      "Can't send an email without a subject"
    );

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