

const express = require('express');
const roomModel = require('../models/roomModel');
const customerModel = require('../models/customerModel');


 const bookingRouter = express.Router();

// API Endpoints

// 1. Create a room
bookingRouter.post("/rooms", async(req, res)=>{

    try {
        const {numberOfSeats, amenities, hourlyRate} = req.body;
        const room = new roomModel({
            numberOfSeats, 
            amenities,
            hourlyRate,
            bookings:[]
        });
        await room.save();
        return res.status(201).json({
            message:"Room successfully created"
        });
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
    
});

// 2. Book a room
bookingRouter .post("/rooms/:roomId/book",async(req, res)=>{
    try {
        const {roomId}  = req.params;
        const {customerName, startTime, endTime} = req.body;
    
        //Check if room exists
        const room = await roomModel.findById(roomId);
        if(!room)
        {
            return res.status(404).json({
                message:"Room not found"
            });
        }
        //Check for booking conflicts
        const conflict = room.bookings.some((booking) =>(
            (new Date(startTime) < new Date(booking.endTime)) &&
            (new Date(endTime) > new Date(booking.startTime))
        ));
    
        if(conflict){
            return res.status(400).json(
                {
                    message:"Room is already booked for this time slot"
                }
            )
        }
    
        //Add booking to room
        room.bookings.push({
            customerName,
            startTime,
            endTime
        });
    
        //Add booking to customer
        let customer = await customerModel.findOne({name: customerName});
        if(!customer)
        {
            customer =  new customerModel({name: customerName, bookings:[]});
        }
        customer.bookings.push({
            roomId,
            startTime,
            endTime
        });
    
        await customer.save();
        return res.status(201).json({
            message:"Room booked successfully"
        })     
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
   
});

// 3. List all rooms 
bookingRouter.get("/rooms", async (req, res)=>{
    try {
        const rooms = await roomModel.find();
        return res.status(200).json({
            rooms
        });
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
   
});

// 4. list all customers with bookings data
bookingRouter.get("/customers", async(req, res)=>{
    try {
        const customers = await customerModel.find();
    return res.status(200).json({
        customers
    });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
    
});

//5. List booking history with customer
bookingRouter.get("/customers/:name/bookings", async(req, res)=>{
    try {
        const {name} = req.params;
    const customer = await customerModel.findOne({name});
    if(!customer)
    {
        return res.status(404).json({
            message:"Customer doesn't exists"
        });
    }
    return res.status(200).json({
        "bookings":customer.bookings
    })

    } catch (error) {
        return res.status(500).json({
            error
        });
    }
    
        
    
})

module.exports  = bookingRouter;