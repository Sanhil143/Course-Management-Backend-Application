const CourseModel = require('../models/courseModel')

const createCourse = async (req, res) => {
      try {
            let data = req.body
            if (Object.keys(data).length === 0) {
                  return res.status(400).send({ status: false, message: "enter data" })
            }
            let savedData = await CourseModel.create(data)
            return res.status(201).send({ status: true, message: savedData })
      }
      catch (error) {
            return res.status(500).send({ status: false, error: error.message })
      }

}

const updateCourse = async (req, res) => {
      try {
            let courseId = req.params.courseId
            if (Object.keys(courseId).length === 0) {
                  return res.status(400).send({ status: false, message: "enter courseId on param" })
            }
            let values = req.body
            if (Object.keys(values).length === 0) {
                  return res.status(400).send({ status: false, message: "enter new values" })
            }
            let savedData = await CourseModel.findOneAndUpdate({ _id: courseId, isDeleted: false },
                  { $set: values }, { new: true })
            if (!savedData) {
                  return res.status(404).send({ status: false, message: "course not found" })
            }
            return res.status(200).send({ status: true, message: savedData })

      }
      catch (error) {
            return res.status(500).send({ status: false, error: error.message })
      }
}

const deleteCourse = async (req, res) => {
      try {
            let courseId = req.params.courseId
            if (Object.keys(courseId).length === 0) {
                  return res.status(400).send({ status: false, message: "enter courseId on param" })
            }
            let deleteData = await CourseModel.findOneAndUpdate({ _id: courseId, isDeleted: false },
                  { $set: { isDeleted: true } }, { new: true })
            if (!deleteData) {
                  return res.status(404).send({ status: false, message: "course not found" })
            }
            return res.status(200).send({ status: false, message: "Deleted successfuly", data: deleteData })
      }
      catch (error) {
            return res.status(500).send({ status: false, error: error.message })
      }
}

module.exports = { createCourse, updateCourse, deleteCourse }