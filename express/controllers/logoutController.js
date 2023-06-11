// const userDB ={
//     users :require('../model/users.json'),
//     setUsers:function(data){this.users = data}
// }
const User =require('../model/User')
// const jwt =require('jsonwebtoken')
// require('dotenv').config()
const fsPromises =require('fs').promises
const path = require('path')



 const handleLogout = async (req, res) => {
    // ! on client also deleted the access
    const cookies =req.cookies 
    if(!cookies?.jwt) return res.sendStatus(204) //!no content
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
        // ! is refresh token in the db
    // const foundUser =userDB.users.find(person =>person.refreshToken === refreshToken)
    //  !
    const foundUser =User.findOne({refreshToken}).exec()
    if(!foundUser) {
        res.clearCookie('jwt',{ httpOnly: true,sameSite:'None',secure: true, maxAge: 24 * 60 * 60 * 1000 })
        return res.sendStatus(204)
     }
     //! delete the refesh token    
    //  const otherUser = userDB.users.filter(person => person.refreshToken === foundUser.refreshToken)
    //  const currentUser={...foundUser, refreshToken:''}
    //  userDB.setUsers([...otherUser,currentUser])
    //  await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'),JSON.stringify(userDB.users) )
    // ! using the model
    foundUser.refreshToken =''
    // const result = await foundUser.save()
    // console.log(result)

     res.clearCookie('jwt',{ httpOnly: true,sameSite:'None',secure: true }) //! secure:true ---only in https
     res.sendStatus(204)
    }

     module.exports = {handleLogout}