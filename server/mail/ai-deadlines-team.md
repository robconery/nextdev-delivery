---
subject: "[Rob Conery] Thank you for buying the workshop! Order Number: <%=data.checkout.number%>"
---

You and your team are about to embark on an wild journey that is hopefully fun, and empowering. I'll have more to say in just a second, but for now here is the important stuff:

 - This is a 3.6G download (link below) and will take a minute, but if you have any issues just reply to this email and let me know!
 - Speaking of issues: there is a GitHub link in the PDF, [or you can just click here](https://github.com/robconery/ai-intro-workshop).
 - You can also reply to this email and I'll get right back to you.

Take the time to look over the Extra content in the "/extras" directory, as you will likely be using much of that straight away, including:

 - The instructor's guide. If you plan on delivering this workshop to your team, you'll want to read this.
 - Guidance on handling skepticism and hesitance. It _will_ happen on teams of any size. AI is a snark magnet.
 - Rollout and measurement guides. AI comes with a lot of promises, but facts and numbers will save the day.
 - The policies. Your team will need to understand what's expected ASAP.

<%if(data.checkout.invoice_url) {%>

## Your Invoice

You can see a copy if your receipt from my payment processor, Stripe, [which is right here](<%=data.checkout.invoice_url%>). If you need to add or change information, you should be able to do so on that page, or just edit the PDF as you need.
<%}%>

## Your Download

Your download is below and please note that **the link expires in two hours**. Please download now and put in a safe place. I would encourage you not to share - I worked very hard on this stuff. If you know someone that _really needs the help_ go ahead, I'll trust you. Or you can let me know (reply to this email) and I'll do what I can for them.

**<%=data.checkout.fulfillment.file %>**
[Download Now](<%=data.checkout.fulfillment.download_url%>)

Again: thank you!. I really appreciate your business!

_Rob_