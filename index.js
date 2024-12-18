const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoute');
const testRoutes = require('./src/routes/testRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const candidateRoutes = require('./src/routes/candidateRoutes');

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/', testRoutes);
app.use('/', adminRoutes);
app.use('/', candidateRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));