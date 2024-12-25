const mongoose  = require('mongoose');

const customerSchema  = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        unique: true
    },
    bookings:[
        {
            roomId: mongoose.Schema.Types.ObjectId,
            startTime: Date,
            endTime : Date,
            bookingDate:{
                type:Date,
                default: Date.now
            }
        }
    ]
});


const customerModel = mongoose.model('customer', customerSchema);

module.exports = customerModel;