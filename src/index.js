const express = require('express')
const mongoose = require('mongoose')
const router = require("./routers/router")

mongoose.set('strictQuery', true)
const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://sanhil143:raisahab12345@sanhildb.kk3knyj.mongodb.net/courseManagement")
      .then(() =>  console.log("My mongoDB is connected") )
      .catch((error) => console.error(error))

app.use("/", router)

app.listen(5000, () => {
      console.log("Express app running on port " + 5000);
})

