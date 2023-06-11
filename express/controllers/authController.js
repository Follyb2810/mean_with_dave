// const userDB ={
//     users :require('../model/user.json'),
//     setUsers:function(data){this.users = data}
// }

// const jwt =require('jsonwebtoken')
// require('dotenv').config()
//  const fsPromises = require('fs').promises
//  const path = require('path')
//  const bcrypt = require('bcrypt')


//  const handleLogin = async (req, res) => {
//     const {user,pwd} =req.body
//     if(!user || !pwd) return res.status(400).json({"message":'username and password are required'})
   
//     const foundUser =userDB.users.find(person =>person.username === user)
//     if(!foundUser) return res.sendStatus(401)
//      const match = await bcrypt.compare(pwd, foundUser.password)
//      if(match){
//         const accessToken = jwt.sign(
//             {'username':foundUser.username},
//             process.env.ACCESS_TOKEN_SECRET,
//             {expiresIn:'30s'}
//         )
//         const refreshToken = jwt.sign(
//             {'username':foundUser.username},
//             process.env.REFRESH_TOKEN_SECRET,
//             {expiresIn:'1d'}
//         )
//         // !saving refresh token with curreny user
//         const otherUsers = userDB.users.filter(person => person.username !== foundUser.username)
//         const currentUser = {...foundUser,refreshToken}
//         userDB.setUsers([...otherUsers,currentUser])
//         await fsPromises.writeFile(path.join(__dirname,'..','model','user.json'),JSON.stringify(userDB.users))
//         res.cookie('jwt',refreshToken,{htttOnly:true,maxAge: 24*60*60*1000})
//         res.json({"message":`user ${user} is logged in`})
//         res.json({accessToken})
//         console.log(refreshToken)
//      }else{
//          res.sendStatus(401)
//      }
//      }


//      module.exports ={handleLogin}

// const userDB = {
//     users: require('../model/users.json'),
//     setUsers: function(data) {
//       this.users = data;
//     }
//   };
const User =require('../model/User')
  
  const jwt = require('jsonwebtoken');
  // require('dotenv').config();
  const fsPromises = require('fs').promises;
  const path = require('path');
  const bcrypt = require('bcrypt');
  
  const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ "message": 'username and password are required' });
  
    // const foundUser = userDB.users.find(person => person.username === user);
    // ! using mongoose
    const foundUser =await User.findOne({ username: user}).exec();
    if (!foundUser) return res.sendStatus(401);
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      const roles = Object.values(foundUser.roles)

      const accessToken = jwt.sign(
        { 
          "UserInfo":{
            'username': foundUser.username,
            "roles": roles 

          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      );
      const refreshToken = jwt.sign(
        { 'username': foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );
      // Saving refresh token with current user
      // const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);
      // const currentUser = { ...foundUser, refreshToken };
      // userDB.setUsers([...otherUsers, currentUser]);
      // await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(userDB.users));
      // ! using mongoose
      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save()
      console.log(result);
      res.cookie('jwt', refreshToken, { httpOnly: true,sameSite:'None',maxAge: 24 * 60 * 60 * 1000 });
      // res.cookie('jwt', refreshToken, { httpOnly: true,sameSite:'None',secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.json({ "message": `user ${user} is logged in`, accessToken });
      console.log(refreshToken);
    } else {
      res.sendStatus(401);
    }
  };
  
  module.exports = { handleLogin };
  