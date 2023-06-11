const {format} = require('date-fns')
const {v4:uuid} =require('uuid') 

const fs = require('fs')
const fsPromise = require('fs').promises
const path = require('path')

const logEvent = async (message,logName)=>{
    const dateTime =`${format(new Date(),'yyyy:MMdd\tHH:mm:ss')}`
    const logItem=`${dateTime}\t ${uuid()}\t ${message}\n`
    console.log(logItem)
    try{
         if(!fs.existsSync(path.join(__dirname,'log'))){
            await fsPromise.mkdir(path.join(__dirname,'log'))
         }
        await fsPromise.appendFile(path.join(__dirname,'log',logName),logItem)
// 
    }catch(err){
        console.log(err)
    }
}
// console.log(uuid( ))
// console.log(format(new Date(),'yyyy:MMdd\tHH:mm:ss'))

module.exports =logEvent