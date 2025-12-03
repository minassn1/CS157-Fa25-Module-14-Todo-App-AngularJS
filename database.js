const mongoose = require("mongoose");

// STEP 1 - ESTABLISH THE CONNECTION TO MONGODB
mongoose.connect(process.env.DATABASE_URL, { })
   .then(() => console.log("Connected to MongoDB!"))
   .catch(err => console.log(err));