require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const cors =require('cors');
const  {logger}  = require('./middleware/logEvent');
const  errorHandler  = require('./middleware/errorHandler');
const corsOptions =require('./config/corsOption')
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser'); 
const credentials = require('./middleware/credential');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
// const logger = require('./middleware/logger'); 
const PORT = process.env.PORT || 3500;
connectDB()
app.use(logger);
// app.use(cookieParser)
// const whitelist = [
//     'https://follyb.com',
//     'http://localhost:3000',
//     'http://localhost:3500',
//     'https://127.0.0.1:500',
//     // 'https://www.google.com'
// ];

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('This is not allowed.'));
//         }
//     },
//     optionsSuccessStatus: 200
// };
// let corsOption = {
//     origin: [ 'http://localhost:3500', 'http://localhost:3000' ]
// }
// let ALLOWED_ORIGINS = ["http://serverabc.com", "http://localhost:3500"];
// app.use((req, res, next) => {
//     let origin = req.headers.origin;
//     let theOrigin = (ALLOWED_ORIGINS.indexOf(origin) >= 0) ? origin : ALLOWED_ORIGINS[0];
//     res.header("Access-Control-Allow-Origin", theOrigin);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//     next();
// })
// app.use(cors(corsOption));
// app.use(cors(corsOptions));
// app.use(cors({ origin: ["http://localhost:3500", "https://origin2.com"] }))

// const whitelist =[
//     'https://follyb.com',
//     'https://localhost:3500',
//     'http://localhost:3500',
//     'http://localhost:3500'
// ]
// const corsOptions ={
//     origin:(origin,callback)=>{
//         if(whitelist.indexOf(origin) !== -1 || !origin){
//             callback(null,true);
//         }else{
//             callback(new Error('this ' + origin +' is not allowed' ))
//         }
//     },
//     optionSuccessStatus :200
// }
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
// app.use('/subdir',express.static(path.join(__dirname, 'public')));

// app.get(/^\/$|^\/index(\.html)?$/, (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });
app.use('/',require('./routes/root'))
// app.use('/subdir',require('./routes/subdir'))
app.use('/register',require('./routes/register'))
app.use('/auth',require('./routes/auth'))
app.use('/refresh',require('./routes/refresh'))
app.use('/logout',require('./routes/logout'))
app.use(verifyJWT)
app.use('/employees',require('./routes/api/employes'))

// app.get('^/$|/index(.html)?', (req, res) =>{
//     res.sendFile(path.join(__dirname,'views','index.html'))
// })
// app.get('/new-page(.html)?', (req, res, next) => {
//     // res.sendFile('./views/index.html',{root:__dirname});
//     res.sendFile(path.join(__dirname,'views','new-page.html'));
// })
// app.get('/old-page(.html)?', (req, res, next) => {
//     // res.sendFile('./views/index.html',{root:__dirname});
//     res.redirect(301,'/new-page.html');
// })
// app.get('/hello.html', (req, res, next) => {
//     console.log('hello using next')
//     next()
// },
// (req,res)=>{
//     res.send('hello folly')
// }
// )

// const one =(req,res,next) => {
//     console.log('one')
//     next()
// }
// const two =(req,res,next) => {
//     console.log('two')
//     next()
// }
// const three =(req,res) => {
//     console.log('three')
    
// }
// app.get('/chain(.html)?', [one,two,three])
// app.get('/*',(req, res, next) => {
//     res.status(404).sendFile(path.join(__dirname,'views','404.html'));

// })

// ! custom 404
app.all('*', (req, res, next)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }else if(req.accepts('json')){
        res.json({error : 'Not Found'})
    }else {
        res.type('txt').sendFile('not found')
    }
})
app.use(errorHandler)
mongoose.connection.once("open", ()=>{
    console.log('connected to mongo')
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
})
// const express = require('express');
// const app = express();
// const path = require('path'); 
// const {logger} = require('./middleware/logEvent')
// const PORT = process.env.PORT || 3500
// app.use(logger)

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '/public')));

// app.get('^/$|/index(.html)?', (req, res) =>{
//     res.sendFile(path.join(__dirname,'views','index.html'))
// })

// app.listen(PORT, ()=>console.log(`listening on ${PORT}`)); 

// let a =[1,2,3]
// let c =[4,5,6]

// const b = (c)=>console.log(c )
// b([{a,c}])

const folly ='folly Babs'
 console.log(folly.startsWith('f'))

