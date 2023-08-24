const User=require('../models/userDetails');
const UserInfo = require('../models/userInfo');
    
exports.getUser = async(req, res) =>{
    const user_id = req.params.id;
    // const todaysAppointments = (userData)=>{
    //     const tonight = new Date();
    //     tonight.setHours(23, 59, 59, 999);
    //     console.log(tonight);
    //     const todaysapp = userData.appointments.filter(appointment => {
    //       return new Date(appointment.appointment_date_time) < tonight;
    //     });
    //     return todaysapp.length;
    // }

    // setTodayApp(todaysapp.length);
    try{
        console.log(user_id, ':',typeof(user_id));
        const user = await User.findById(user_id);
        if(user){
            const userInfo = await UserInfo.findOne({email:user.email});
            if(userInfo){
                return res.status(200).json({success:true, user:user, userData: userInfo}); 
            }
            return res.status(500).json({success:false, error:'User info does not found'})
        }
        res.status(500).json({success:false, error:'User not found'});
    }
    catch(e){
        console.log('error raised: ', e);
        res.status(500).json({success:false, error:'Something went wrong'});
    }
}