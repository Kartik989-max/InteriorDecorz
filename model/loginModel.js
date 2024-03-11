let mongooose = require('mongoose');
let LoginSchema = new mongooose.Schema({
    name:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});

// const LoginSchema = new mongooose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
//   });
let LoginModel =  mongooose.model('user', LoginSchema)
module.exports = LoginModel
