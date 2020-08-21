const mongoose = require('mongoose'); // Erase if already required
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
})

PostSchema.method = {
    compareHash(hash) {
        return bcrypt.compare(hash, this.password);
      },
    
    generateToken() {
        return jwt.sign({ id: this.id }, process.env.SECRET, {
          expiresIn: 86400
        });
      }
}

//Export the model
module.exports = mongoose.model('User', PostSchema);