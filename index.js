const express=require('express');
const cookieParser=require('cookie-parser');
const app= express();
const port=8000;
//to use expressLayouts install npm install express-ejs-layouts
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser());
//setup for mongoose
const db=require('./config/mongoose')
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const { Store } = require('express-session');
const sassMiddleware= require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');
//set up for static files 
app.use(express.static('./assets'));//with respect to this we need to give the location of our static files
app.use(sassMiddleware({
    src :'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

//extract style and scripts from sub pages into teh layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');



app.use(session({
    name:'codeial',
    //change the secret before deployment in production mode
    secret:'blahsomething',
    saveUnintialized:false,//to prevent creation of uncessary cookies
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
        mongoUrl :'mongodb://localhost/codeial_development',
        autoRemve:'interval',
        autoRemoveInterval:'1'
    }),function(error){
        console.log(error || 'connect-mongo setup ok')
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
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