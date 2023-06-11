const allowedOrigin = require('./allowedOrigin')

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
const corsOptions ={
    origin:(origin,callback)=>{
        if(allowedOrigin.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }else{
            callback(new Error('this ' + origin +' is not allowed' ))
        }
    },
    optionSuccessStatus :200
}


module.exports= corsOptions