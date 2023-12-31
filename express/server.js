const express = require('express');
const path = require('path'); 
const app = express();
const PORT = process.env.PORT || 3500


app.get('^/$|/index(.html)?', (req, res, next) => {
    // res.sendFile('./views/index.html',{root:__dirname});
    res.sendFile(path.join(__dirname,'views','index.html'));
})
app.get('/new-page(.html)?', (req, res, next) => {
    // res.sendFile('./views/index.html',{root:__dirname});
    res.sendFile(path.join(__dirname,'views','new-page.html'));
})
app.get('/old-page(.html)?', (req, res, next) => {
    // res.sendFile('./views/index.html',{root:__dirname});
    res.redirect(301,'/new-page.html');
})
app.get('/hello.html', (req, res, next) => {
    console.log('hello using next')
    next()
},
(req,res)=>{
    res.send('hello folly')
}
)

const one =(req,res,next) => {
    console.log('one')
    next()
}
const two =(req,res,next) => {
    console.log('two')
    next()
}
const three =(req,res) => {
    console.log('three')
    
}
app.get('/chain(.html)?', [one,two,three])
app.get('/*',(req, res, next) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));

})




app.listen(PORT, ()=>console.log(`listening on ${PORT}`));