const CourseModel = require('../models/courseModel')

const createCourse = async (req, res) => {
      try {
            let data = req.body

            let savedData = await CourseModel.create(data)
            return res.status(201).send({ status: true, message: savedData })
      }
      catch (error) {
            return res.status(500).send({ status: false, error: error.message })
      }

}

const updateCourse = async (req, res) => {
      try{
      let param = req.params.courseId
      let keyValue = req.body
      console.log(keyValue);


      let savedData = await CourseModel.updateOne({ _id: param }, { $set: keyValue })
      console.log(savedData);
      return res.status(200).send({ status: true, message: savedData })

      }
      catch(error){
            return res.status(500).send({status:false, error:error.message})
      }
}

const deleteCourse = async (req, res) => {
      try {
      let param = req.params
      let deleteData = await CourseModel.updateOne({param, isDeleted: false },
            { $set: { isDeleted: true }})
            return res.status(200).send({status:false, message:"Deleted successfuly", data:deleteData })
      }
      catch(error){
            return res.status(500).send({status:false, error:error.message})
      }
}

module.exports = { createCourse, updateCourse, deleteCourse }