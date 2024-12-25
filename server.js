
const http  =require('http');
const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./db');


dotenv.config();

const PORT  = process.env.PORT || 5001;
connectDB();


const server  = http.createServer(app);


server.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}`);
})
