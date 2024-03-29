const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "kr.manjeet319@gmail.com",
    pass: "mfvadlyccsgukabu",
  },
});
let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views", relativePath+'.ejs'),
    data,
    function (err, template) {
      if (err) {
        console.log("error in rendering template", err);
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};
module.exports.mail = (data,file) => {
  let htmlString = renderTemplate(data, file);
  transporter.sendMail(
    {
      from: "kr.manjeet319@gmail.com",
      to: data.email,
      subject: data.subject,
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }
      console.log("Message sent", info);
      return;
    }
  );
};