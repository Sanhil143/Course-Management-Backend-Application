const CourseModel = require('../models/courseModel')



const getCourses = async (req, res) => {
      try {
            let courseId = req.params.courseId

            if (Object.keys(courseId).length === 0) {
                  return res.status(400).send({ status: false, message: "please enter id on param" })
            }
            let fetch = await CourseModel.findById({ _id: courseId, isDeleted: false })
            if (!fetch) {
                  return res.status(404).send({ status: false, message: "Course not found" })
            }
            return res.status(200).send({ status: true, data: fetch })
      }
      catch (error) {
            return res.status(500).send({ status: false, message: error.message })
      }

}

const queryCourse = async (req, res) => {
      try {
            let query = req.query
            if (Object.keys(query).length === 0) {
                  let find = await CourseModel.find({ isDeleted: false }).sort({ title: 1 })
                  if (!find) {
                        return res.status(404).send({ status: false, message: "Courses not found" })
                  }
                  return res.status(200).send({ status: true, Courses: find })
            }
            const { title, topics, category } = query

            let filter = { ...query, isDeleted: false }

            if (title)
                  query.title = title
            if (topics)
                  query.topics = topics
            if (category)
                  query.category = category

            let findData = await CourseModel.find(filter).sort({title:1})
            if(!findData){
                  return res.status(404).send({ status: false, message: "Course not found" })
            }
            return res.status(200).send({status:true, data:findData})
      }
      catch (error) {
            return res.status(500).send({ status: false, message: error.message })
      }
}

module.exports = { getCourses, queryCourse }