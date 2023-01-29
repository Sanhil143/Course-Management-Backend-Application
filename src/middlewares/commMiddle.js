const jwt = require('jsonwebtoken')
const RoleModel = require('../models/roleModel')
const UserModel = require('../models/userModel')

const verifyToken = (req, res, next) => {
      try {
            let token = req.headers["x-api-key"]
            if (!token) {
                  return res.status(401).send({ status: false, message: "Token is missing!" })
            }
            jwt.verify(token, "Sanhil", (err, decode) => {
                  if (err) {
                        return res.status(403).send({ status: false, message: "You are not authorize" })
                  }
                  req.userId = decode.id
                  // console.log(decode.id);
                  next()
            })
      }
      catch (error) {
            return res.status(500).send({ status: false, error: error.message })
      }
}

const isAdmin = async (req, res, next) => {
      try {
            let checkUser = await UserModel.findById(req.userId)
            if (!checkUser) {
                  return res.status(400).send({ status: false, message: "Wrong credentials!" })
            }
            let checkRoles = await RoleModel.find({ _id: { $in: checkUser.role } })
            
            if (!checkRoles) {
                  return res.status(404).send({ status: false, message: "role not found" })
            }
            
            let filterRoles = checkRoles.find(docs => docs.name === "Admin")
            
             if(!filterRoles){
                  return res.status(403).send({status:false, message:"You are not admin!"})
             }
             next()            
      }
      catch (error) {
            return res.status(500).send({ status: false, error: error.message })
      }
}

module.exports = { verifyToken, isAdmin } 



// for (let i = 0; i < checkRoles.length; i++) {
            //       if (checkRoles[i].name !== "Admin") {
            //             return res.status(403).send({status:false, message:"You are not admin!"})
            //       }
            //       next()
            // }