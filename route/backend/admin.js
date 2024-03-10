let express = require("express")
let pageModel = require('../../model/pageModel')
let router = express()

router.get("/",(req,res)=>{
    pageModel.find({}).count()
    .then((x)=>{
        res.render("../views/backend/admin-file",{x})
        // console.log(x)
    })
})
module.exports = router