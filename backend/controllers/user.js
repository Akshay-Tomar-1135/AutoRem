const User=require('../models/userDetails');
const UserInfo = require('../models/userInfo');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

exports.userRegister = async (req, res) => {
    const {fname, lname, email, password} = req.body;
    const encryptedPassaword = await bcryptjs.hash(password, 10);
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.status(500).json({success:false, error:'Email already exists'});
        }
        await User.create({
            fname,
            lname,
            email,
            password:encryptedPassaword
        }) ;
        await UserInfo.create({
            email:email
        });

        // If both updates are successful, commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({success: true});
    }
    catch(e){
        // If any error occurs during the updates, rollback the transaction
        await session.abortTransaction();
        session.endSession();

        res.status(500).json({success:true, error:'Something went Wrong'});
    }
}

exports.userLogin = async (req, res) => {
    const {email, password} = req.body;
    // res.cookie('authToken', 'Akshay', {
    //     maxAge: 86400000, // Cookie expiration time in milliseconds (1 day)
    //     // httpOnly: true,   // Make the cookie accessible only by the server
    //     // secure: true,     // Use 'true' in production to only send cookies over HTTPS
    //     // sameSite: 'strict' // Restrict cookie sharing to same-site requests
    //     // path:'/',
    // });
    
    //   // Send response
    //   return res.status(200).json({ success: true, message: 'Login successful' });
    
    try{
        let token;
        const user = await User.findOne({email:email});
        if(user){
            let result = await bcryptjs.compare(password, user.password);
            token = await user.generateAuthToken();
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now()+86400000),
                httpOnly: true
            });
            // return res.status(200).json({msg: 'hello'});
            if(result){
                console.log(user);
                return res.status(200).json({success:true, user:user}); 
            }
            return res.status(500).json({success:false, error:'Incorrect password'});
        }
        res.status(500).json({success:false, error:'User does not exist'});
    }
    catch(e){
        res.status(500).json({success:false, error:'Something went wrong'});
    }
}



