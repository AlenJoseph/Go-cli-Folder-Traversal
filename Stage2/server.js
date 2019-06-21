const express =require('express');
const mongoose = require('mongoose');  
const bodyParser = require('body-parser');
const cors = require("cors");

// route declaration
const filedata =require('./routes/api/filedata');
const app= express();

//Body parser middleware
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


//DB Congif
const db = require('./config/keys').mongoURI;

mongoose
.connect(db,{ useNewUrlParser: true })
.then(()=>console.log('MongoDb Connected'))
.catch(err=> console.log(err))



// Users Routes
app.use(cors());
app.use('/api/filedata',filedata)




const port = process.env.PORT || 5000;


app.listen(port,()=> console.log(`Server is running on Port ${port}`)); 
