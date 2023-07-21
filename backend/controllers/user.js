const User=require('../models/userDetails');
const bcryptjs = require('bcryptjs');

exports.userRegister = async (req, res) => {
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
        res.send({status:'error', error:e.messages});
    }
}

exports.userLogin = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email:email});
        if(user){
            // res.send({error:'user exists'});
            let result = await bcryptjs.compare(password, user.password);
            if(result){
                return res.send({status:'logined'});
            }
            return res.send({status:'incorrect password'});
        }
        res.send({status:'not exist', result:result});
    }
    catch(e){
        res.send({status:'error', error:e.messages});
    }
}
