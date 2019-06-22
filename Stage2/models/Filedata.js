const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Filedata schema
const FileSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    extention :{
        type:String,
        required:true
    },
    size :{
        type: String,
        required:true
    },
    path :{
        type: String,
        required:true
    },
    globalpath :{
        type: String,
        required:true
    }
});

module.exports = Filedata = mongoose.model('filedata',FileSchema);