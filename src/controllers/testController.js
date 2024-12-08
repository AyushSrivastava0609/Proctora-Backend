const nodemailer = require('nodemailer');
const Test = require('../models/test');

exports.createTest = async (req, res) => {
  const {
    testName,
    testDuration,
    startsOn,
    endsOn,
    testDescription,
    testType,
    candidateEmails,
    questions,
  } = req.body;

  try {
    const newTest = new Test({
      testName,
      testDuration,
      startsOn,
      endsOn,
      testDescription,
      testType,
      candidateEmails,
      questions
    });

    const savedTest = await newTest.save();

    if (candidateEmails.length > 0) {
      sendTestNotificationEmails(candidateEmails, testType , testName, testDuration, startsOn, endsOn, testDescription);
    }

    res.status(201).json(savedTest);
  } catch (error) {
    console.error('Error creating test:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const sendTestNotificationEmails = (candidateEmails, testType , testName, testDuration, startsOn, endsOn, testDescription) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  
    const emailSubject = `New Test Assigned: ${testName}`;
    
    const emailBody = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 10px; border: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <p>Hello,</p>
          <p>You have been Assigned a New Test. Below are the Details:</p>
          <table>
            <tr><td>Test Name</td><td>${testName}</td></tr>
            <tr><td>Test Type</td><td>${testType}</td></tr>
            <tr><td>Test Duration</td><td>${testDuration} minutes</td></tr>
            <tr><td>Test Start Time</td><td>${startsOn}</td></tr>
            <tr><td>Test End Time</td><td>${endsOn}</td></tr>
            <tr><td>Test Description</td><td>${testDescription}</td></tr>
          </table>
          <p>Please Ensure that you Complete the Test within the given Time Frame. If you have any Questions, Feel Free to Reach out to the Test Administrator.</p>
          <p>Best Regards,<br>Proctora Team</p>
        </body>
      </html>
    `;
  
    candidateEmails.forEach((email) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: emailSubject,
        html: emailBody 
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Error sending email to ${email}:`, error);
        } else {
          console.log(`Email sent to ${email}: ${info.response}`);
        }
      });
    });
  };
  