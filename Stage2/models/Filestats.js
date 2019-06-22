const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create filestat schema
const FilestatSchema = new Schema({
   

    Filestatistics:{
        type: [Object],
    }
});

module.exports = Filestatdata = mongoose.model('filestatdata',FilestatSchema);