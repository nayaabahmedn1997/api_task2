const express = require('express');
const bookingRouter  = require('./routes/bookingRoutes');





const app =express();
app.use(express.json());
app.use("/bookings", bookingRouter);



module.exports = app;