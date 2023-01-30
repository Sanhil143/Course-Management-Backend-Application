const UserModel = require('../models/userModel')
const RoleModel = require('../models/roleModel')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')

//roles
const role = async (req,res) => {
      let data = req.body
      let savedData = await RoleModel.create(data)
      return res.status(201).send({status:true, message:savedData})
}

const signUp = async (req, res) => {
      try {
            let data = req.body
            password = cryptoJs.AES.encrypt(req.body.password,process.env.PASS_KEY).toString()
            data.password = password
            let savedData = await UserModel.create(data)
            return res.status(201).send({status:true, message:savedData})
      }
      catch (error) {
            return res.status(500).send({ status: false, message: error.message })
      }
}

const signIn = async (req,res) => {
      try{
            let user = req.body
            let verifyUser = await UserModel.findOne({email:user.email})
            if(!verifyUser){
                  return res.status(400).send({status:false, message:"Wrong email"})
            }
            
            const hashedPass = cryptoJs.AES.decrypt(verifyUser.password,process.env.PASS_KEY)
            const mainPass = hashedPass.toString(cryptoJs.enc.Utf8)

            if(mainPass != user.password){
                  return res.status(400).send({status:false, message:"Wrong password"})
            }
            //json coming on picture
            let token = jwt.sign({id:verifyUser._id},process.env.SECU_KEY,{expiresIn:"100000"})

            const {password,__v,...others} = verifyUser._doc

            return res.status(200).send({status:true, message:"successfully login", others, token })
      }
      catch(error){
            return res.status(500).send({status:false, message:error.message})
      }
}



module.exports = {signUp, role, signIn}