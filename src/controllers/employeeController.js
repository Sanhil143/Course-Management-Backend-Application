const CourseModel = require('../models/courseModel')



const getCourses = async (req, res) => {
      try {
            let courseId = req.params.courseId
            
            if (Object.keys(courseId).length === 0) {
                  return res.status(400).send({ status: false, message: "please enter id on param" })
            }
            let fetch = await CourseModel.findById({ _id: courseId, isDeleted: false })
            if (!fetch) {
                  return res.status(404).send({ status: false, message: "Couse not found" })
            }
            return res.status(200).send({ status: true, data: fetch })
      }
      catch (error) {
            return res.status(500).send({ status: false, message: error.message })
      }

}

module.exports = { getCourses }