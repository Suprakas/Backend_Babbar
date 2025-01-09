const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 4400;

// cookie-parser

const cookieParser = require('cookie-parser');
app.use(cookieParser()); 

app.use(express.json());

const dbConnect = require("./config/database");
dbConnect();

const user = require('./routes/user');
app.use('/api/v1', user);

app.listen(PORT, () => {
    console.log(`Server is started successfully in port ${PORT}`);
})

app.get('/', (req, res) => {
    res.send("<h1>This is my new Auth Project</h1>");
})