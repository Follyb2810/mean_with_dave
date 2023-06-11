const fsPromise = require('fs').promises
const path = require('path')


const fileOps = async ()=>{
    try{

        const data = await fsPromise.readFile(path.join(__dirname, 'text.txt'),'utf8')
        console.log(data)
        await fsPromise.unlink(path.join(__dirname, 'text.txt'),data)
        await fsPromise.writeFile(path.join(__dirname, 'promisetext.txt'),data)
        await fsPromise.appendFile(path.join(__dirname, 'promisetext.txt'),'/n/n nice to meet you')
        await fsPromise.rename(path.join(__dirname, 'promisetext.txt'),path.join(__dirname, 'promisetcomplete.txt'))
        const newData = await fsPromise.readFile(path.join(__dirname, 'promisetcomplete.txt'),'utf8')
        console.log(newData)
    }catch(err){
        console.log(err)
    }
}
fileOps()
// fsPromise.readFile(path.join(__dirname, 'starter.txt'))