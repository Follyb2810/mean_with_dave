const fs = require('fs');
const path = require('path');
if(!fs.existsSync(path.join(__dirname,'nooo'))){

    fs.mkdir(path.join(__dirname,'nooo'),(err)=>{
        if(err) throw err;
        console.log('new directory created')
    })
}
if(fs.existsSync(path.join(__dirname,'nooo'))){

    fs.rmdir(path.join(__dirname,'nooo'),(err)=>{
        if(err) throw err;
        console.log('new remove directory created')
    })
}

