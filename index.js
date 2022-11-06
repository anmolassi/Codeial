const express=require('express');
const app= express();
const port=8000;


//to use expressLayouts install npm install express-ejs-layouts
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);


//set up for static files 
app.use(express.static('./assets'));//with respect to this we need to give the location of our static files


//extract style and scripts from sub pages into teh layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

//use express server
app.use('/',require('./routes'));//it will move to routes/index.js for furthur 

console.log('ejs file load done');
app.listen(port,function(err){
    if(err)
    {
        console.log('Error: ',err);
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});