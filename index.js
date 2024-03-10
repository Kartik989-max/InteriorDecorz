let express = require("express");
let dotenv = require("dotenv")
let bodyParser = require('body-parser')
let mongooose = require("mongoose")
let session = require('express-session');
let flash = require('connect-flash')
let methodOverride=require('method-override')
// let pageModel = require('./model/pageModel')
let path = require('path')

mongooose.set('strictQuery',false);
dotenv.config({path:'./config.env'})
const connectDB = async()=>{
    try{
        const conn = await mongooose.connect(process.env.mognUrl)
         console.log("Database connection Done")
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}



let app = express()
let pageModel = require('./model/pageModel')

app.set("view engine", 'ejs')
app.use(express.static(__dirname+'/public/'))
// app.use(express.static(path.join(__dirname,'views/frontent/common/img')))
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'))


app.use(session({
    secret:"First web Project",
    resave:true,
    saveUninitialized:true
}))

app.use(flash())
app.use((req, res, next)=>{
    res.locals.sucess=req.flash('sucess');
    res.locals.err=req.flash('err');
    pageModel.find({})
    .then((naavdata) => {
        res.locals.naavdata = naavdata;
        next();
    })
    .catch((err) => {
        console.error(err); 
        next(err);
    });
    
})



//backend route
let adminroute = require('./route/backend/admin')
let pageroute = require('./route/backend/page')
app.use('/admin',adminroute)
app.use('/admin/page/',pageroute)

//frontend routes
let headerroute = require('./route/frontent/header')
app.use('/',headerroute)

connectDB().then(()=>{
    app.listen(process.env.PORT,()=> {
    console.log(process.env.PORT, "Port Working")
    })
});

