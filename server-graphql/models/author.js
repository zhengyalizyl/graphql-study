const mongoose=require('mongoose');

const {Schema} =mongoose;

const authorschema=new Schema({
    name:String,
    age:Number,

});

module.exports=mongoose.model('Author',authorschema);