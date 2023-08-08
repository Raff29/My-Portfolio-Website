const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

    const msg = {
      to: "raphael@raphaelpinto.tech",
      from: "raphael@raphaelpinto.tech",
      subject:"Email from your website",
      text: `Message from ${email}:\n${message}`,
    };

    try {
      await sgMail.send(msg);
      return res.status(200).json({ success: true, message: "Message Successfully Sent!" });
    } catch (error) {
      console.error(error);
      let errorMessage = "Message Could not be Sent";
      let errorCode = error.code || 500;
      if (error.response && error.response.body && error.response.body.errors) {
        errorMessage = error.response.body.errors
          .map((err) => err.message)
          .join(", ");
      }
      return res.status(errorCode).json({ success: false, message: errorMessage });
    }
  };