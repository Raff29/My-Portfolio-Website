require("dotenv").config();
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
const express = require("express");
const app = express();

// this file is only for testing locally 
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sendEmail = (email, message) => {
  const msg = {
    to: "raphael@raphaelpinto.tech",
    from: "raphael@raphaelpinto.tech",
    subject: "Email from your website",
    text: `Message from ${email}:\n${message}`,
  };

  return sgMail
    .send(msg)
    .then(() => {
      return { success: true, message: "Message Successfully Sent!" };
    })
    .catch((error) => {
      console.error(error.response.body.errors);
      let errorMessage = "Message Could not be Sent";
      let errorCode = 500;
      if (error.response && error.response.body && error.response.body.errors) {
        errorMessage = error.response.body.errors
          .map((err) => err.message)
          .join(", ");
        if (error.code) {
          errorCode = error.code;
        }
      }
      return { success: false, message: errorMessage, code: errorCode };
    });
};

app.post("/contact", (req, res) => {
  console.log(req.body);

  if (!req.body.email || !req.body.message) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  sendEmail(req.body.email, req.body.message).then((result) => {
    if (result.success) {
      return res.status(200).json(result);
    } 
    const statusCode  = typeof result.code === 'number' ? result.code : 500;
    return res.status(statusCode).json(result);
    }
  );
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
