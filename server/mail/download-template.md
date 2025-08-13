---
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
<%} %>