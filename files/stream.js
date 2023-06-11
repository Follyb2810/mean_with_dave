const fs = require('fs');

const path = require('path')
const rs =fs.createReadStream(path.join('files','new-lorem.txt'),{encoding:'utf8'}) 

const ws = fs.createWriteStream('./files/new-lorem2.txt')
// rs.on('data',(dataChunk)=>{
//     ws.write(dataChunk)
// })

rs.pipe(ws);