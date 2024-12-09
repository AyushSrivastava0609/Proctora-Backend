const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Test = require('../models/test');

const JWT_SECRET = process.env.JWT_SECRET;

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' });
        }
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        const token = jwt.sign({ adminId: admin._id }, JWT_SECRET , { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAdminTest = async (req, res) => {
    const Tests = await Test.find();
    if(Tests){
        res.status(200).send(Tests)
    }else{
        res.status(404).json({ message: 'No Tests Found' });
    }
}