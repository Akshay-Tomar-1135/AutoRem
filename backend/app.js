const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const routes=require('./routes/route')
const bcryptjs = require('bcryptjs');

const app=express();
const port=8000;
//intlizing all the libraries
app.use(bodyParser.json());
app.use(cors());
app.use('/',routes);

//connecting to mongodb
mongoose.connect(
    'mongodb+srv://Akshay1135:Akmango%401221@cluster0.8gxba.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    
).then((success)=>{

    console.log("mongodb connected");

    app.listen(port,()=>{
        console.log(`server is running on ${port}`);
    });
}).catch((err)=>{
    
    console.log(`Error occured while Connecting ${err}`)
})





