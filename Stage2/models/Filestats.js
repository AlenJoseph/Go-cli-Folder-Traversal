const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create filestat schema
const FilestatSchema = new Schema({
    NoOfFiles:{
        type:String,
        required:true
    },
    MaxFileSize :{
        size: {
            type: String
          },
         path: {
            type: String
          },
  
    },
    FileExtentions: {
        type: [String],
       },
    MostFreqFileExtention:{
        extention: {
            type: String
          },
         path: {
            type: String
          },
    },
    LatestTenPaths:{
        type: [String],
    }
});

module.exports = Filestatdata = mongoose.model('filestatdata',FilestatSchema);