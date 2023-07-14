const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
// const routes=require('./routes/routes')
const bcryptjs = require('bcryptjs');

const app=express();
const port=8000;
//intlizing all the libraries
app.use(bodyParser.json());
app.use(cors());
// app.use('/',routes);

//connecting to mongodb
mongoose.connect(
    'mongodb+srv://Akshay1135:Akmango%401221@cluster0.8gxba.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    
).then((success)=>{

    console.log("mongodb connected");

    const User = require('./models/userDetails');
    app.post('/signup', async (req, res) => {
        const {fname, lname, email, password} = req.body;
        const encryptedPassaword = await bcryptjs.hash(password, 10);
        try{
            const oldUser = await User.findOne({email});
            if(oldUser){
                return res.send({error:'user exists'});
            }
            await User.create({
                fname,
                lname,
                email,
                password:encryptedPassaword
            }) ;
            res.send({status:'ok'});
        }
        catch(e){
            res.send({status:'error'});
        }
    });

    app.listen(port,()=>{
        console.log(`server is running on ${port}`);
    });
}).catch((err)=>{
    
    console.log(`Error occured while Connecting ${err}`)
})





