const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
   await mongoose.connect(process.env.DATABASE_URL).then(() =>{
        console.log("DB Connection is successful");
    }).catch((error) =>{
        console.log("DB Connection is failed");
        console.error(error.message);
        process.exit(1);
    })
}

module.exports = dbConnect;
