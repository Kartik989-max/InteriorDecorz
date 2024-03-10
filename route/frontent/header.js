let express = require('express')
let pageModel = require('../../model/pageModel')
let router = express()

router.get('/',(req,res)=>{
    pageModel.find({})
    .then((x)=>{
        res.render('../views/frontent/index',{x})
    })
})

router.get('/contact', (req, res) => {
    // Assuming you have a separate view file for the contact page
    res.render('../views/frontent/contact');
});
router.get('/interior', (req, res) => {
    // Assuming you have a separate view file for the contact page
    res.render('../views/frontent/interior');
});
router.get('/architecture', (req, res) => {
    // Assuming you have a separate view file for the contact page
    res.render('../views/frontent/architecture');
});
router.get('/custom', (req, res) => {
    // Assuming you have a separate view file for the contact page
    res.render('../views/frontent/custom');
});
router.get('/about', (req, res) => {
    // Assuming you have a separate view file for the contact page
    res.render('../views/frontent/about');
});
router.get('/blogg', (req, res) => {
    // Assuming you have a separate view file for the contact page
    res.render('../views/frontent/blogg');
});
router.get('/:id', (req,res)=>{
    pageModel.findOne({pageUrl:req.params.id})
    .then((x)=>{
        res.render('../views/frontent/dynamic-page',{x})
        console.log(x)
     })
     .catch((y)=>{
         console.log(y)
     })
})
module.exports = router