const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const router = require("./routers/router")

mongoose.set('strictQuery', true)
const app = express()
app.use(express.json())
dotenv.config()


mongoose.connect(process.env.MY_DB_URL)
      .then(() =>  console.log("My mongoDB is connected") )
      .catch((error) => console.error(error))

app.use("/", router)

app.listen(process.env.PORT, () => {
      console.log("Express app running on port " + process.env.PORT);
})

