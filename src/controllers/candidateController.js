const Submission = require('../models/submission');

exports.getUserTestHistory = async (req, res) => {
    try {
      const { userId } = req.query;

      const submissions = await Submission.find({ userId })
      .populate('testId', 'testName testDescription', )
      .populate('userId', 'name email');;
      
      if (submissions.length > 0) {
        res.status(200).json(submissions);
      } else {
        res.status(404).json({ message: 'No Submissions Found for this User' });
      }
    } catch (error) {
      console.error('Error Fetching Test History:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


exports.getTestAttempts = async (req, res) => {
    const { testId } = req.params;

    try {
        const attempts = await Submission.find({ testId })
            .populate('userId', 'name email') 
            .select('score submittedAt ');

        if (!attempts || attempts.length === 0) {
            return res.status(404).json({ message: 'No Attempts Found for this Test.' });
        }

        res.status(200).json({ attempts });
    } catch (error) {
        console.error('Error fetching test attempts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

  