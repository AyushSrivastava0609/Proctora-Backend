const nodemailer = require('nodemailer');
const Test = require('../models/test');
const Submission = require('../models/submission');

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
            <tr><td>Test Description</td><td>${testDescription}</td></tr>
            <tr><td>Test Duration</td><td>${testDuration} minutes</td></tr>
            <tr><td>Test Start Time</td><td>${startsOn}</td></tr>
            <tr><td>Test End Time</td><td>${endsOn}</td></tr>
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

//   -----------------------------------------------------------------------------------------   \\

exports.getTest = async (req, res) => {
    const Tests = await Test.find();
    if(Tests){
        res.status(200).send(Tests)
    }else{
        res.status(404).json({ message: 'No Tests Found' });
    }
}

exports.getTestById = async(req, res) => {
    const {id} = req.params;
    const test = await Test.findById(id);
    if(test){
        res.status(200).send(test)
    }else{
        res.status(404).json({ message: 'No Test Found' });
    }
}

exports.modifyTest = async (req, res) => {
  try {
      const { id } = req.params; 
      const updatedData = req.body; 

      const updatedTest = await Test.findByIdAndUpdate(id, updatedData, {
          new: true,
          runValidators: true,
      });

      if (updatedTest) {
          res.status(200).json({ message: 'Test Updated Successfully', test: updatedTest });
      } else {
          res.status(404).json({ message: 'No Test Found with the given ID' });
      }
  } catch (error) {
      console.error('Error updating test:', error);
      res.status(500).json({ message: 'Server Error' });
  }
};

//   -----------------------------------------------------------------------------------------   \\

exports.submitTest = async (req, res) => {
  try {
    const { testId, userId, userName, answers } = req.body;

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    let score = 0;
    test.questions.forEach((question) => {
      const userAnswer = answers.find((ans) => ans.questionId === question._id.toString());
      if (userAnswer && userAnswer.selectedOption === question.correctOption) {
        score+=4;
      }else{
        score-=1;
      }
    });

    const submission = await Submission.create({
      userName,
      userId,
      testId,
      answers,
      score
    });

    res.status(200).json({
      message: 'Test Submitted Successfully',
      submission
    });
  } catch (error) {
    console.error('Error Submitting Test:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

  