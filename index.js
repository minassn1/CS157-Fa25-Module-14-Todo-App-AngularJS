require("dotenv").config();
const express = require("express");
const database = require("./database.js");
const todoRoutes = require("./routes/todos.js");
const userRoutes = require("./routes/users.js");
const _ = require("lodash");
const port = (process.env.PORT || 9000);

const app = express();

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use("/api/user", userRoutes);

app.listen(port, (err) => {
   if (!err) {
      console.log("Server started on port " + port);
      let array = [1, 2, 3];
      _.reverse(array);
      console.log(array);
   } else {
      console.log(err);
   }
})
