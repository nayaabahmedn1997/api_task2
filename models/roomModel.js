const mongoose = require('mongoose');

const roomSchema = new  mongoose.Schema({
    numberOfSeats : Number,
    amenities:[String],
    hourlyRate: Number,
    bookings:[
        {
            customerName: String,
            startTime: Date,
            endTime : Date,
            bookingDate:{
                type:Date,
                default: Date.now
            }
        }
    ]
});

 const roomModel = mongoose.model('room', roomSchema);
 
 module.exports = roomModel

