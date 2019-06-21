const express = require('express');
const router = express.Router();

//Load User model

const Filedata = require('../../models/Filedata');


// @route   GET api/filedata/test
// @desc    Test users route
// @acess   Public
router.get('/test',(req,res)=>res.json({msg:'Filedata works'}));


/* ...............................................................................................................................*/

// @route   POST api/filedata/updateinfo
// @desc    update file info
// @acess   Public

router.post('/updateinfo',(req,res)=>{
    console.log(res.body)
})



module.exports= router;
