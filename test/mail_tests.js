import { Email } from "../server/mail/index.js";
import assert from "assert";

// describe("Sending email", () => {
//   it("should send the test template", async () => {
//     const email = new Email({
//       template: "test",
//       email: "robconery@gmail.com",
//     });
//     const res = await email.send();
//     //if we're here, it worked
//     assert(res);
//   });
// });