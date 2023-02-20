const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//import routes
app.use(require('./Routes/User.Routes'));
app.use('/article', require('./Routes/Article.Routes'));

//Connect MongoDB
mongoose.connect(
    process.env.DB_URL, {
    //warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Mongo DB Connected Successfully");
}).catch((err) => console.log("DB Connection Failed", err));

//Port    
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Backend Server is running on PORT ${PORT}`))