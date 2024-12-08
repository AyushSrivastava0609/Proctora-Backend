const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoute');
const testRoutes = require('./src/routes/testRoutes')

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/', testRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));