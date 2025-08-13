---
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

_Rob_