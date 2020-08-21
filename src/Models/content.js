const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        required: true
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    season:{
        type:Int32Array,
        required: true
    },
    episode:{
        type:Int32Array,
        required: true
    },
    isSpecial:{
        type:Boolean,
        required: true
    },
    fileLink:{
        type:String,
        required: true,
    },
    thumbLink:{
        type:String,
        required: true,
    },
    catalog:[
        {type:mongoose.Schema.Types.ObjectId, ref:'catalog'}
    ]

});

module.exports = mongoose.model('content', PostSchema);