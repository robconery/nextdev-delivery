import dotenv from 'dotenv';
import { Email } from './email.js';

dotenv.config();

export { Email };

export const sendDownloadEmail = async function (email, { courses, downloads }) {
  return new Email({
    template: "downloads",
    data: {
      email,
      courses,
      downloads,
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
      message: err.message,
      stack: err.stack,
      context: JSON.stringify(ctx),
    },
    email: "rob@bigmachine.io",
  }).send();
};
