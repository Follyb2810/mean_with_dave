const logEvent =require('./logEvent');
const http = require('http');
const fs = require('fs');
const path = require('path');
const fsPromise = require('fs').promises

const EventEmitter = require('events');
const { da } = require('date-fns/locale');
class Emitter extends EventEmitter{}

const myEmitter = new Emitter()
myEmitter.on('log',(msg,fileName)=>logEvent(msg,fileName))
const PORT = process.env.PORT || 3500


const serveFile =async (filePath,contentType,response)=>{
    try{
          const rawData = fs.readFileSync(filePath,
            !contentType.includes('image')?"utf8":""
            ) 
          const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData
          response.writeHead(
            filePath.includes('404.html')?400: 200,
            {"content-Type":contentType})
          response.end(
            contentType === 'application/json' ? JSON.stringify(data): data
          );

    }catch(err){
        console.log(err)
        myEmitter.emit('log',`${err.message}\t ${err.name}`,'errlog.txt')
        response.statusCode = 500
        response.end()
    }
}
const server = http.createServer((req,res)=>{
    console.log(req.url,req.method,)
    myEmitter.emit('log',`${req.url}\t ${req.method}`,'reqlog.txt')
        // let path;
    // if(req.url === '/' || req.url === 'index.html'){
    //     res.statusCode=200;
    //     res.setHeader('Content-Type', 'text/html');
    //     path = path.join(__dirname,'views','index.html')
    //     fs.readFile(path,'utf8',(err,data)=>{
    //         res.end(data)
    //     })


    // }

    //! using switch
    // switch(req.method){
    //     case '/':
    //     res.statusCode=200;
    //     path = path.join(__dirname,'views','index.html')
    //     fs.readFile(path,'utf8',(err,data)=>{
    //         res.end(data)
    //     })
    //     break;
    // }
    //! using tenary
    const extension =path.extname(req.url)
    let contentType;
    switch(extension){
        case '.css':
            contentType ='text/css';
            break;
        case '.js':
            contentType ='text/javascript';
            break;
        case '.json':
            contentType ='application/json';
            break;
        case '.jpg':
            contentType ='image/jpeg';
            break;
        case '.png':
            contentType ='image/png';
            break;
        case '.txt':
            contentType ='text/plain';
            break;
        default :
            contentType ='text/html';
            break;
    }
    let filePath =
       contentType === 'text/html' && req.url === '/' 
            ? path.join(__dirname,'views','index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
               ? path.join(__dirname,'views',req.url,'index')
               :contentType === 'text/html' 
                  ?path.join(__dirname,'views',req.url)
                   :path.join(__dirname,req.url)


                   console.log(req.url);
        if(!extension && req.url.slice(-1) !== '/') filePath +='.html';

        const fileExists = fs.existsSync(filePath);

        if(fileExists) {
            serveFile(filePath, contentType,res)
        }else{
            //404
            //301
            // console.log(path.parse(filePath))
            switch(path.parse(filePath).base){
                case 'old-page.html':
                        res.writeHead(301,{'location':'/new-page.html'});
                        res.end()
                        break;
                case 'www-page.html':
                            res.writeHead(301,{'location':'/'});
                            res.end()
                            break;
                default: 
                serveFile(path.join(__dirname,'views','404.html'),'text/html',res)

            
            }
        }
})
const url = '/images/myimage.jpg';
const extensions = path.extname(url);

console.log(extensions);
server.listen(PORT,()=>console.log(`Server listening on ${PORT}`))
// myEmitter.on('log',(msg)=>logEvent(msg))
//  myEmitter.emit('log','log evebt emmited' 
