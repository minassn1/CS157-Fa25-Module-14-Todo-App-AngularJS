const mongoose = require("mongoose");

// STEP 2 - DEFINE THE SCHEMA FOR OUR COLLECTION
const todoSchema = new mongoose.Schema({
   task: {
      type: String,
      required: true
   }
})

// STEP 3 - CREATE THE MODEL
// The model is what we use to do the CRUD operations against our collection
module.exports = mongoose.model("todo", todoSchema);