const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        required: true
    },
    display:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    isMovie:{
        type:Boolean,
        required: true
    },
    thumbLink:{
        type:String,
        required: true,
    },
    coverLink:{
        type:String,
        required: true,
    },
    categories:[
        {type:mongoose.Schema.Types.ObjectId, ref:'category'}
    ]

});

module.exports = mongoose.model('catalog', PostSchema);