import dotenv from 'dotenv';
import { Email } from './email.js';

dotenv.config();

export { Email };

export const sendDownloadEmail = async function (email, { courses, downloads }) {
  return new Email({
    template: "download-template",
    data: {
      data: {
        email,
        courses,
        downloads,
      }
    },
    email: email,
  }).send();
};

export const sendAIDeadlinesEmail = async function (email, checkoutData) {
  return new Email({
    template: "ai-deadlines-personal",
    data: {
      data: {
        download_url: checkoutData.download_url,
        checkout: checkoutData.checkout
      }
    },
    email: email,
  }).send();
};

export const sendRobError = async function (
  err = { message: "No error message", stack: "--" }
) {
  const ctx = err && err.data ? JSON.stringify(err.data) : "--";
  return new Email({
    template: "error",
    data: {
      data: {
        message: err.message,
        stack: err.stack,
        context: JSON.stringify(ctx),
      }
    },
    email: "rob@bigmachine.io",
  }).send();
};
