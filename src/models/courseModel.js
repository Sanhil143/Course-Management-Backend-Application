const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
      title: {
            type: String,
            required: true
      },
      description: String,
      videoUrl: String,
      topics: [String],
      duration: String,
      category: String,
      isDeleted:{
            type:Boolean,
            default:false
      }

},
      { timestamps: true })

module.exports = mongoose.model("courses", courseSchema)



// Create new course (title, description, video Url, topics array, duration, category, )