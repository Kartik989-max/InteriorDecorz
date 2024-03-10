let mongooose = require('mongoose');
let pageSchema = mongooose.Schema({
    pageUrl : String,
    pageMetaDescription : String,
    pageMetaKeyword : String,
    pageHeading : String,
    pagePhoto : String,
    pageDetails : String
})

let pageModel =  mongooose.model('pagetables', pageSchema)
module.exports = pageModel