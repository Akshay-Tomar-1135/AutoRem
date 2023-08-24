const express=require('express');
const router=express.Router();
const authenticate = require('../middleware/auth');

const Registeration=require('../controllers/user');
const UpdateData = require('../controllers/update_data');
const GetData=require("../controllers/get_data");
const mailController = require('../controllers/mail_controller');
const deleteController = require('../controllers/delete_appointments');

router.post('/signup',Registeration.userRegister); 
router.post('/login', Registeration.userLogin);
router.get('/getuser/:id', GetData.getUser);
router.post('/add_appointments/:user_id', UpdateData.addAppointment);
router.put('/update_appointments/:user_id/:appointment_id', UpdateData.updateAppointment);
router.put('/update_user', UpdateData.updateUser);
router.post('/send_email/:user_id/:appointment_id', mailController.sendEmail);
router.delete('/delete_appointments', deleteController.deleteAppointments);
router.get('/auth_user', authenticate, (req, res)=>{
    res.send({success:true, userId: req.userId});
});
router.get('/set-cookie', (req, res) => {
    // Set a cookie with name 'user' and value 'john'
    res.cookie('user', 'john', { maxAge: 3600000 });

    // Send a response
    res.send({msg:'Cookie set successfully'});
});
router.get('/get-cookie', (req, res) => {
    const userName = req.cookies.user;
    res.send({msg:`User name from cookie: ${userName}`});
  });

module.exports=router;