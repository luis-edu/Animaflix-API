const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const PostSchema = new mongoose.Schema({
    
    sname:String,
    desc: String,
    vname: String,
    cname: String,
    vkey: String,
    ckey: String,
    vsize: Number,
    csize: Number,
    vurl: String,
    curl: String,
    createdAt:{
        type:Date,
        default: Date.now
    }
});
PostSchema.pre('save', function(){
    if(!this.url){
        this.vurl = `${process.env.APP_URl}/stream/${this.vkey}`
        this.curl = `${process.env.APP_URl}/files/${this.ckey}`
    }
})

PostSchema.pre('remove', function(){
     promisify(fs.unlink)(path.resolve(__dirname,'..','..','assets',this.vkey));
    return promisify(fs.unlink)(path.resolve(__dirname,'..','..','assets',this.ckey));
})
module.exports = mongoose.model('Movie',PostSchema);