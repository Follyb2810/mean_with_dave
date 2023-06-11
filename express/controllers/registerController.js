// const userDB ={
//     users :require('../model/users.json'),
//     setUsers:function(data){this.users = data}
// }
const User = require('../model/User')

 const fsPromises = require('fs').promises
 const path = require('path')
 const bcrypt = require('bcrypt')

 const handleNewUser = async (req,res)=>{
    const {user,pwd} =req.body
    if(!user || !pwd) return res.status(400).json({"message":'username and password are required'})

    // const duplicate  = userDB.users.find(person => person.username === user)
    // ! using mongoose
    const duplicate  = await User.findOne({username:user})
    if(duplicate) return res.sendStatus(409)
    try{
            // ! using to  mongose to create,store and encrypt
            const hashedPwd = await bcrypt.hash(pwd,10)
            const result = await User.create({
                "username":user,
                "password":hashedPwd
            }) 
            result.save()
            // ? other way to save in mongoose it can be wtitten like this too in mongoose
            //! const newUser = new User()
            //! newUser.username = user,
            //! newUser.password = hashed
            //! const result = await newUser.save()
            // ? other way to save in mongoose
            //!  const newUser = new User({
            //!  "usermname":user,
            //! "password":hashedPwd
            //! })
            console.log(result)          
            // const hashedPwd = await bcrypt.hash(pwd,10)
            // const newUser = {'username': user, 'password': pwd}
            // const newUser = {"username": user,"roles":{"User":2001}, "password": hashedPwd}
            // userDB.setUsers([...userDB.users,newUser])
            // await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'),JSON.stringify(userDB.users))
            // console.log(userDB.users)
            res.status(201).json({succes:`new user created${user} successfully`})
    }catch(err){
        res.status(500).json({"message":`error here${user} ` })
    }
 }


 module.exports = {handleNewUser}