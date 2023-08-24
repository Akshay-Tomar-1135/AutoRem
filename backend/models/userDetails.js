const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');

const userDetails=new mongoose.Schema({

    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:false
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }, 
    tokens:[
        {
            token:{
                type:String,
                // required:true
            }
        }
    ]
}, 
{
    collection: 'users'
});

// generate token
userDetails.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id: this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
        return err;
    }
};


module.exports=mongoose.model('users', userDetails);