const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true,
            unique: true
      },
      password: String,
      role: {
            type: [
                  {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "role",
                  },
            ],
            default: ["63d55e619cac0e55684cd453"]
      }
})

module.exports = mongoose.model("user", userSchema)

