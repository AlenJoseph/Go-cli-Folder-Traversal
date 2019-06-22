const express = require('express');
const router = express.Router();

//Load User model

const Filedata = require('../../models/Filedata');
const Filestatdata = require('../../models/Filestats');

// @route   GET api/filedata/test
// @desc    Test users route
// @acess   Public
router.get('/test',(req,res)=>res.json({msg:'Filedata works'}));


/* ...............................................................................................................................*/

// @route   POST api/filedata/updateinfo
// @desc    update file info
// @acess   Public

router.post('/updateinfo',(req,res)=>{
     let  name = req.body[0].Name
     let ext =name.split('.').pop()
     const filedata = new Filedata({
         name:      req.body[0].Name,
         extention: ext,
         size:      req.body[0].Size,
         path:      req.body[0].FilePath,
         globalpath:req.body[0].Dir
   })
   filedata
   .save()
   .then(filedata=>res.status(200).json(filedata))
   .catch(err=>console.log(err));


})



module.exports= router;
