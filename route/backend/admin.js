// let express = require("express")
// let pageModel = require('../../model/pageModel')
// let router = express()

// router.get("/",(req,res)=>{
//     pageModel.find({}).count()
//     .then((x)=>{
//         res.render("../views/backend/admin-file",{x})
//         // console.log(x)
//     })
// })
// module.exports = router

let express = require("express")
let pageModel = require('../../model/pageModel')
const LoginModel = require("../../model/loginModel");
const bcrypt = require('bcrypt');
// let LoginModel = require('../../model/loginModel')
let router = express()
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/",(req,res)=>{
        res.render("backend/login")
})


router.post("/", async (req, res) => {
    try {
        const check = await LoginModel.findOne({ name: req.body.username });
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!check && !isPasswordMatch) {
            res.status(200).send("wrong credentials");
        }
        else {
            console.log('conn');
            // res.status(200).render("backend/admin-file");
            pageModel.find({}).count()
            .then((x)=>{
                res.render("../views/backend/admin-file",{x})
                // console.log(x)
            })
        }
        ;
    }
    catch {
        res.status(405).send("wrong Details");
    }
});

// router.get("/",(req,res)=>{
//     pageModel.find({}).count()
//     .then((x)=>{
//         res.render("../views/backend/admin-file",{x})
//         // console.log(x)
//     })
// })


module.exports = router
