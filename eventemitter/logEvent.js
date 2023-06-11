
const {format} = require('date-fns')
const {v4:uuid} =require('uuid') 

const fs = require('fs')
const fsPromise = require('fs').promises
const path = require('path')

const logEvent = async (message)=>{
    const dateTime =`${format(new Date(),'yyyy:MMdd\tHH:mm:ss')}`
    const logItem=`${dateTime}\t ${uuid()}\t ${message}\n`
    console.log(logItem)
    try{
         if(!fs.existsSync(path.join(__dirname,'log'))){
            await fsPromise.mkdir(path.join(__dirname,'log'))
         }
        await fsPromise.appendFile(path.join(__dirname,'log','eventlog.txt'),logItem)
// 
    }catch(err){
        console.log(err)
    }
}
// console.log(uuid( ))
// console.log(format(new Date(),'yyyy:MMdd\tHH:mm:ss'))

module.exports =logEvent

// const {format} = require('date-fns')
// const {v4:uuid} =require('uuid') 

// const fs = require('fs')
// const fsPromise = require('fs').promises
// const path = require('path')

// const logEvent = async (message,logName)=>{
//     const dateTime =`${format(new Date(),'yyyy:MMdd\tHH:mm:ss')}`
//     const logItem=`${dateTime}\t ${uuid()}\t ${message}\n`
//     console.log(logItem)
//     try{
//          if(!fs.existsSync(path.join(__dirname,'..','log'))){
//             await fsPromise.mkdir(path.join(__dirname,'..','log'))
//          }
//         await fsPromise.appendFile(path.join(__dirname,'log','..',logName),logItem)
// // 
//     }catch(err){
//         console.log(err)
//     }
// }

// const logger = (req, res, next) =>{
//     logEvent(`${req.method}\t${req.url}\t${req.header.origin}\t${req.url}`,'reqLog.txt')
//     console.log(`${req.method} ${req.path}`)
//     next();
// }

// module.exports ={logEvent,logger}

// const logger = (req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//     next();
//   };
// console.log(uuid( ))
// console.log(format(new Date(),'yyyy:MMdd\tHH:mm:ss'))