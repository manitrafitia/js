const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var cors = require('cors');
const app = express();

const materiel = require('./models/matSchema');

const router = require('./routes/router');

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(router);

mongoose.connect(process.env.Database).then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err);
});

app.listen(3003);