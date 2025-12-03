const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();



// USER REGISTRATION ENDPOINT (/api/user/register)
// { "email": "minassn@laccd.edu", "password": "abc123", firstName: "Narbeh", lastName: "Minassian"}

router.post("/register", (req, res) => {
   // User is trying to create a new account
   // The user account might already exist!
   // We can only create the account if it does not exist

   User.findOne({ email: req.body.email })
      .then(result => {
         if (result) {
            res.status(400).send("User already exists");
            return;
         }

         // Create the new User object
         let newUser = new User(req.body);

         // Hash and salt the user password
         newUser.password = bcrypt.hashSync(newUser.password, 10);

         // Save the user account
         newUser.save()
            .then(result => {
               res.status(201).send(result);
            })
            .catch(err => {
               res.status(400).send(err);
            })
      })
      .catch(err => {
         res.status(500).send(err);
      })
})

// LOGIN ENDPOINT (/api/user/login)
// { "email": "minassn@laccd.edu", "password": "abc123"}

router.post("/login", (req, res) => {
   // Check to make sure the user exists

   User.findOne({ email: req.body.email })
      .then(result => {
         if (!result) {
            res.status(400).send("Invalid email/password");
            return;
         }

         // Step 1: compare the user's stored hashed password to the one passed in
         bcrypt.compare(req.body.password, result.password, (err, bcresult) => {
            // if bcresult is defined, the password was a match
            if (bcresult) {
               // At this point the username/password is valid

               // Step 2: Create and issue the JWT
               let payLoad = {
                  _id: result._id,
                  role: result.role
               }

               // Create the token (sign it)
               let token = jwt.sign(payLoad, process.env.JWT_KEY);

               // Send the token to the client
               res.status(200).send({ jwt: token });

            } else {
               res.status(400).send("Invalid email/password");
               return;
            }
         })
      })
      .catch(err => {

      })
})

// GET (Read All tasks)
router.get("/", (req, res) => {
   User.find().exec()
      .then(result => {
         res.status(200).send(result);
      })
      .catch(err => {
         res.status(500).send(err);
      })
})


// GET (Read one task by id)
router.get("/:id", (req, res) => {
   User.findById(req.params.id)
      .then(result => {
         res.status(200).send(result);
      })
      .catch(err => {
         res.status(400).send(err);
      })
})


// POST (Create new task)
router.post("/", (req, res) => {
   let newTask = new User(req.body);

   newTask.save()
      .then(result => {
         res.status(201).send(result);
      })
      .catch(err => {
         res.status(400).send(err);
      })
})


// PATCH (Update a task)
router.patch("/:id", (req, res) => {
   User.findByIdAndUpdate(
      req.params.id, // The id of the document we want to update
      req.body, // The object that contains the changes
      {
         new: true, // return the updated object
         runValidators: true // make sure the updates are validated against the schema
      })
      .then(result => {
         res.status(200).send(result);
      })
      .catch(err => {
         res.status(400).send(err);
      })
})

// DELETE (Delete a task)
router.delete("/:id", (req, res) => {
   User.findByIdAndDelete(req.params.id)
      .then(result => {
         res.status(200).send(result);
      })
      .catch(err => {
         res.status(400).send(err);
      })

})

module.exports = router;