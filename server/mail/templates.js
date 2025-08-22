// Email templates exported as text
export const templates = {
  'ai-deadlines-personal': `---
subject: "[Rob Conery] Thank you for buying the workshop! Order Number: <%=data.checkout.number%>"
---

You are about to embark on an wild journey that is hopefully fun, and empowering. I'll have more to say in just a second, but for now here is the important stuff:

 - This is a 3.6G download (link below) and will take a minute, but if you have any issues just reply to this email and let me know!
 - Speaking of issues: there is a GitHub link in the PDF, [or you can just click here](https://github.com/robconery/ai-intro-workshop).
 - You can also reply to this email and I'll get right back to you.

## Downloading Again
You can always return to [your confirmation page](https://app.thenext.dev/checkout/thanks?id=<%=data.checkout.id%>) to get access to your purchase.

If you have any trouble, just reply to this email and I'll get right back to you.

<%if(data.checkout.invoice_url) {%>

## Your Invoice

You can see a copy if your receipt from my payment processor, Stripe, [which is right here](<%=data.checkout.invoice_url%>). If you need to add or change information, you should be able to do so on that page, or just edit the PDF as you need.
<%}%>

## Your Download

Your download is below and please note that **the link expires in two hours**. Please download now and put in a safe place. I would encourage you not to share - I worked very hard on this stuff. If you know someone that _really needs the help_ go ahead, I'll trust you. Or you can let me know (reply to this email) and I'll do what I can for them.

**<%=data.checkout.fulfillment.file %>**
[Download Now](<%=data.checkout.fulfillment.download_url%>)

Again: thank you!. I really appreciate your business!

_Rob_`,

  'ai-deadlines-team': `---
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

## Licensing

This workshop is licensed to you, individually, to use for yourself, your team, or your company. Please don't put it online and resell the content. I thought about coming up with a stricter license but I figure that I'll go with the honor system here.

If you change jobs, make them pay for a new license :). You're a good persona and I'm going to trust your judgment.

## Downloading Again
You can always return to [your confirmation page](https://app.thenext.dev/checkout/thanks?id=<%=data.checkout.id%>) to get access to your purchase.

If you have any trouble, just reply to this email and I'll get right back to you.


<%if(data.checkout.invoice_url) {%>

## Your Invoice

You can see a copy if your receipt from my payment processor, Stripe, [which is right here](<%=data.checkout.invoice_url%>). If you need to add or change information, you should be able to do so on that page, or just edit the PDF as you need.
<%}%>

## Your Download

Your download is below and please note that **the link expires in two hours**. Please download now and put in a safe place. I would encourage you not to share - I worked very hard on this stuff. If you know someone that _really needs the help_ go ahead, I'll trust you. Or you can let me know (reply to this email) and I'll do what I can for them.

**<%=data.checkout.fulfillment.file %>**
[Download Now](<%=data.checkout.fulfillment.download_url%>)

Again: thank you!. I really appreciate your business!

_Rob_`,

  'checkout': `---
subject: "[Rob Conery] Thanks for your order! Order Number: <%=data.checkout.number%>"
---

Your order is received and you should be downloading your goodies right now. If you have any issues, just reply to this email.

<%if(data.checkout.invoice_url) {%>

## Your Invoice

You can see a copy if your receipt from my payment processor, Stripe, [which is right here](<%=data.checkout.invoice_url%>). If you need to add or change information, you should be able to do so on that page, or just edit the PDF as you need.
<%}%>

## Your Download

Your download is below and please note that **the link expires in two hours**. Please download now and put in a safe place. I would encourage you not to share - I worked very hard on this stuff. If you know someone that _really needs the help_ go ahead, I'll trust you. Or you can let me know (reply to this email) and I'll do what I can for them.

**<%=data.checkout.fulfillment.file %>** (<%=data.checkout.fulfillment.size%>)
[Download Now](<%=data.checkout.fulfillment.download_url%>)

Again: thank you!. I really appreciate your business!

_Rob_`,

  'download-template': `---
subject: Your Download Request
---

Hiya friendo! You (or someone that looks a lot like you) requested an email with order and download information.

<% if(data.downloads && data.downloads.length > 0) {%>
## Downloads

The download links below will expire in 30 minutes, so please download now, if you don't mind.

<% for(let item of data.downloads) {%>
[<%=item.name %>](<%=item.downloadUrl %>)
<%}%>

<% if(data.courses && data.courses.length > 0) {%>
## Courses

The courses below are viewable on the site and if you want to download them, you have to [login](https://app.bigmachine.io) do it from there.

<% for(let item of data.courses) {%>
[<%=item.name %>]("https://app.bigmachine.io/courses/<%=item.sku %>/go")
<%}%>
<%}%>

<%} else {%>
Unfortunately there don't seem to be any orders with the email **"<%=data.email%>"**. Maybe try another? The email has to match what's on the order - it's the only way I can reconcile who ordered what.
<%} %>`,

  'error': `---
subject: Error Report
---

An error occurred in the delivery application:

**Error Message:** <%=data.message %>

**Stack Trace:**
\`\`\`
<%=data.stack %>
\`\`\`

**Context:**
\`\`\`
<%=data.context %>
\`\`\`

Please investigate this issue.`
};
