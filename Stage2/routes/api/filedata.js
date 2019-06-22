const express = require('express');
const router = express.Router();

//Load User model
const arr =[];
const Filedata = require('../../models/Filedata');
const Filestatdata = require('../../models/Filestats');
const data =[]
const latestdata =[]
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
/* ...............................................................................................................................*/

// @route   GET api/filedata/filestats
// @desc    GET the file Info
// @acess   Public

router.get('/filestats',(req,res)=>{
     
    const p1 = new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
        Filedata.find({})
     .then(files=>{
         const value ={
            "Number of files":files.length
         }
        resolve(data.push(value))
     })
    })
      const p2 = new Promise((resolve, reject) => {
     Filedata.find({}).sort({size:-1}).limit(1)
     .then(filesize=>{
         const value={
            "Maximum File Size":filesize[0].size,
            "Maximum File Size Path":filesize[0].path
         }
       resolve(data.push(value))
     })
    })
    const p3 = new Promise((resolve, reject) => {
     Filedata.find({}).then(files=>{
         let sum =0
         let length = files.length
         for (i in files){
            sum = sum + parseInt(files[i].size, 10);
          
         }
         
         const average = sum/length
         const value ={
            "Average file Size":average
         }
         resolve(data.push(value))
         

     })
    })
    const p4 = new Promise((resolve, reject) => {
     Filedata.distinct( "extention" )
     .then(ext=>{
        const value={
            "List of file extensions":ext
        }
        resolve(data.push(value))
     })
    })
    const p5 = new Promise((resolve, reject) => {
     Filedata.find({}).sort({$natural:-1}).limit(10).then(latest=>{
        
         for(i in latest)
            latestdata.push(latest[i].globalpath)
             const value={
                "List of file extensions":latestdata
             }
            resolve(data.push(value))
     });
    })
    const p6 = new Promise((resolve, reject) => {
     Filedata.find({}).then(ext=>{
        for (i in ext){
            arr.push(ext[i].extention)
            }
            
            let mostfrequent = 1;
            let mode = 0;
            let item;
            for (let i=0; i<arr.length; i++)
            {
                    for (let j=i; j<arr.length; j++)
                    {
                            if (arr[i] == arr[j])
                             mode++;
                            if (mostfrequent<mode)
                            {
                                mostfrequent=mode; 
                              item = arr[i];
                            }
                    }
                    mode=0;

            }
            const value={
                "Most frequent file extension No of occurences ": mostfrequent,
                "Most frequent file extension":item

            }
           resolve (data.push(value))

     
     });
    })
    Promise.all([p1, p2, p3,p4,p5,p6]).then(values => { 
        
        console.log(values);
        console.log(data)
        
        const filestats=new Filestatdata(
            {
                Filestatistics:data
            }
        )

        filestats
        .save()
        .then(filestats=>res.status(200).json(filestats))
        
        
    })
 

})

module.exports= router;
