const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://admin:admin123@cluster0.r8af16e.mongodb.net/bookingDB"
)
.then(() => console.log('Connected successfully!'))
.catch(err => console.error('Connection error:', err));