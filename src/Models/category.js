const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        unique:true,
        require:true
    },
    display:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('category',PostSchema);