const mongoose = require("mongoose");
// USER SCHEMA AND ENDPOINTS
// SCHEMA (Typlical User)
// Schema for the user collection

const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
      maxlength: 15
   },
   lastName: {
      type: String,
      required: true,
      maxlength: 30
   },
   email: {
      type: String,
      required: true,
      // Index only get created automatically for new collections
      index: {
         unique: true,
         collation: { locale: 'en', strength: 2 } // case in-sensitive index
      },
      match: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
   },
   password: {
      type: String,
      requied: true
   },
   address: {
      number: { type: String },
      street: { type: String },
      city: { type: String },
      zip: { type: String }
   },
   phoneNumbers: [{
      location: {
         type: String,
         required: true,
         enum: ["home", "work", "cell", "other"]
      },
      number: {
         type: String,
         required: true,
         match: /(:?\+[Il]* ?)?[\d()–-][\d ()\-"–OОli_|]{6,20}[\dOОli|]\d/
      }
   }],
   nickName: {
      type: [String]
   },
   created: {
      type: Date,
      required: true,
      default: Date.now()
   },
   enabled: {
      type: Boolean,
      required: true,
      default: true
   },
   role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
   }
})


module.exports = mongoose.model("User", userSchema);