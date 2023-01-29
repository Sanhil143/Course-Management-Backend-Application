const express = require("express")
const router = express.Router()
const { signUp, role, signIn } = require('../controllers/userController')
const { createCourse, updateCourse, deleteCourse } = require('../controllers/adminController')
const { verifyToken, isAdmin } = require('../middlewares/commMiddle')
const { getCourses, queryCourse } = require("../controllers/employeeController")


router.post('/roles', role)

//User
router.post('/signUp', signUp)
router.post('/signIn', signIn)

//Courses by admin
router.post('/courses', verifyToken, isAdmin, createCourse)
router.put('/courses/:courseId', verifyToken, isAdmin, updateCourse)
router.delete('/courses/:courseId', verifyToken, isAdmin, deleteCourse)

//Employee access 
router.get('/courses/:courseId', verifyToken, getCourses)
router.get('/courses',verifyToken, queryCourse)


module.exports = router