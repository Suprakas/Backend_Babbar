const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4500;

app.use(express.json());

const dbConnect = require('../Config/');
dbConnect();

// Correct the import path
const blogRoutes = require('./Routes/blogs'); // Make sure this path is correct
app.use('/api/v1', blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is started successfully on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("<h1>This is my blogApp</h1>");
});



