const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', require('./Routes/User.Routes'));

//Connect MongoDB
mongoose.connect(
    process.env.DB_URL, {
    //type warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Mongo DB Connected Successfully");
}).catch((err) => console.log("DB Connection Failed", err));

//Port    
const PORT = 6000
app.listen(PORT, () => console.log(`Backend Server is running on PORT ${PORT}`))