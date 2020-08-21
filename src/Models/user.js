const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Declare the Schema of the Mongo model
var PostSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

PostSchema.pre('save', async function(next){
    let encrypt = await bcrypt.hash(this.password, 10);
    this.password = encrypt;
    next();
});

//Export the model
module.exports = mongoose.model('User', PostSchema);