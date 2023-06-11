const fs =require('fs')
const path=require('path')

fs.readFile(path.join(__dirname,'starter.txt'),"utf8",(err,data)=>{
// fs.readFile('./files/starter.txt',"utf8",(err,data)=>{
    if(err) throw err
    console.log(data)
})
fs.writeFile(path.join(__dirname,'write.txt'),'hello folly',(err)=>{
// fs.readFile('./files/starter.txt',"utf8",(err,data)=>{
    if(err) throw err
    console.log('operation')
    fs.appendFile(path.join(__dirname,'append.txt'),'hello append folly',(err)=>{
        // fs.readFile('./files/starter.txt',"utf8",(err,data)=>{
            if(err) throw err
            console.log('operation append')
        })
})
fs.appendFile(path.join(__dirname,'append.txt'),'hello append folly',(err)=>{
// fs.readFile('./files/starter.txt',"utf8",(err,data)=>{
    if(err) throw err
    console.log('operation append')

fs.appendFile(path.join(__dirname,'append.txt'),path.join(__dirname,'rename.txt'),(err)=>{
        // fs.readFile('./files/starter.txt',"utf8",(err,data)=>{
            if(err) throw err
            console.log('operation rename append')
        })
})



// ! exist on uncaught errors
process.on('uncaughtException',err =>{
    console.log(` there was an uncaught error; ${err}`)
    process.exit(1)
})
