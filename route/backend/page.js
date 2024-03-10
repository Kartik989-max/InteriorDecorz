let express = require("express")
let pageModel = require('../../model/pageModel')
let multer = require('multer')
let router = express()

let storage = multer.diskStorage({
    destination:'public/backend/images/',
    filename:(req,file,cb)=>{
        // cb(null,Data.now(+file+originalname))
        cb(null,file.originalname)
    }
})

let upload = multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype=='image/jpeg' || file.mimetype=='image/jpg' || file.mimetype=='image/png' || file.mimetype=='image/gif'){
            cb(null,true)
        }
        else{
            cb(null,false);
            return cb(new Error('Only Jpg, Jpeg, Png, Gif images allow'))
        }
    }
})

router.get("/", (req, res) => {
        pageModel.find({})
        .then((x)=>{
            res.render("../views/backend/page-file",{x})
        })
        .catch((y)=>{
            console.log(y)
        })
})


// router.post('/add-page/',(req,res)=>{
//     const user = req.body
//     console.log(req.body.Page_Url)
// })

router.get('/add-page', (req, res) => {
    res.render('../views/backend/add-page-file')
})

router.post("/add-page/",upload.single('Page_Photo'), (req, res) => {
    pageModel.findOne({pageUrl:req.body.Page_Url})
    .then((a)=>{
        if(a){
            console.log("Your Url Duplicate, Please try another Url")
            res.redirect('/admin/page')
        }
        else{
            if(!req.file){
                pageModel.create({
                    pageUrl: req.body.Page_Url,
                    // pageNavText: req.body.Page_Nav_Text,
                    // pageTitle: req.body.Page_Title,
                    pageMetaDescription: req.body.Page_Meta_Description,
                    pageMetaKeyword: req.body.Page_Meta_Keyword,
                    pageHeading: req.body.Page_Heading,
                    // pagePhoto:req.file.filename,
                    pageDetails: req.body.Page_Details
                })  
                .then((x) => {
                    req.flash('sucess', ' Your Data is saved on Data Base')
                    res.redirect('/admin/page/')
                    // console.log(x)
                })
            }
            else{
                pageModel.create({
                    pageUrl: req.body.Page_Url,
                    // pageNavText: req.body.Page_Nav_Text,
                    // pageTitle: req.body.Page_Title,
                    pageMetaDescription: req.body.Page_Meta_Description,
                    pageMetaKeyword: req.body.Page_Meta_Keyword,
                    pageHeading: req.body.Page_Heading,
                    pagePhoto:req.file.filename,
                    pageDetails: req.body.Page_Details
                })  
                .then((x) => { 
                    req.flash('sucess','Your Data is saved on Data Base')
                    res.redirect('/admin/page/')
                    // console.log(x)
                })
            }

        }
    })
    
    
        
    // res.render("../views/backend/page-file")
})




router.get('/edit-page/:id', (req, res) => {
    pageModel.findOne({pageUrl:req.params.id})
    .then((x)=>{
    res.render('../views/backend/edit-page-file',{x})
    })
    .catch((y)=>{
        console.log(y)
    })
})

router.put('/edit-page/:id', upload.single('Page_Photo'), (req, res) => {
    if(req.file){
        pageModel.updateOne({pageUrl:req.params.id}, {$set:{
            pageUrl: req.body.Page_Url,
            // pageNavText: req.body.Page_Nav_Text,
            // pageTitle: req.body.Page_Title,
            pageMetaDescription: req.body.Page_Meta_Description,
            pageMetaKeyword: req.body.Page_Meta_Keyword,
            pageHeading: req.body.Page_Heading,
            pagePhoto:req.file.filename,
            pageDetails: req.body.Page_Details
        }})
        .then((x)=>{
            req.flash('sucess','Your data has been Updated successfully')
            res.redirect('/admin/page/')
        })

    }
    else{

        pageModel.updateOne({pageUrl:req.params.id}, {$set:{
            pageUrl: req.body.Page_Url,
            // pageNavText: req.body.Page_Nav_Text,
            // pageTitle: req.body.Page_Title,
            pageMetaDescription: req.body.Page_Meta_Description,
            pageMetaKeyword: req.body.Page_Meta_Keyword,
            pageHeading: req.body.Page_Heading,
            // pagePhoto:req.file.filename,
            pageDetails: req.body.Page_Details
        }})
        .then((x)=>{
            req.flash('sucess','Your data has been Updated successfully')
            res.redirect('/admin/page/')
        })
    }
   
})

router.delete('/delete-page/:id',(req,res)=>{
    pageModel.deleteOne({pageUrl:req.params.id})
    .then((x)=>{
        req.flash('sucess','Your data has been Deleted successfully')
        res.redirect('/admin/page/')
    })
})

module.exports = router