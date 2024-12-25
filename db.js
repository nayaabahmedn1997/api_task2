const mongoose =require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL,{
          
        });
        console.log("MongoDb connected successfully");
    } catch (error) {
        console.log(`Error in connecting to DB ${error}`);
    }
}



module.exports = connectDB;