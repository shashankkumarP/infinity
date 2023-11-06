const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    name:{type:String,required:[true,'should be defined']},
    email:{type:String,required:[true,'email should be defined'],unique:true},
    password:{type:String,required:[true,'password should be defined']},
    pancard:{type:String,required:true},
    number:{type:Number,default:()=>{
        return 8770165191
    }},
    scores:{type:Number,default:0}


},{
    strict:false
})

module.exports = model('user',userSchema)