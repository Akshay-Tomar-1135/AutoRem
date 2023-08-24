const User=require('../models/userDetails');
const UserInfo = require('../models/userInfo');
const mongoose = require('mongoose');

exports.updateUser= async(req, res)=>{
    const {id, fname, lname, email, location, contact} = req.body;
    console.log(req.body);
    // Assuming you have already connected to the MongoDB server
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        // First update operation using findByIdAndUpdate
        await User.findByIdAndUpdate(id, { fname: fname, lname: lname }, { session });

        // Second update operation using findOneAndUpdate
        await UserInfo.findOneAndUpdate({ email: email }, { location: location, contact: contact }, { session });

        // If both updates are successful, commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Return success response if needed
        res.status(200).json({ success: true, data:req.body });
    } catch (error) {
        // If any error occurs during the updates, rollback the transaction
        await session.abortTransaction();
        session.endSession();

        // Handle the error or return an error response
        res.status(500).json({ success: false, message: 'Updates failed', error: error.message });
    }

}

// Controller function to add a new appointment
exports.addAppointment = async (req, res) => {
  try {
    const userId = req.params.user_id;
    // Create a new appointment object
    const newAppointment = {
        client_name: req.body.name, 
        appointment_description: req.body.appdesc,
        appointment_date_time: new Date(req.body.dateTime+':00.000Z'),//moment(req.body.dateTime+':00.000Z').toISOString(),
        client_email: req.body.email,
        client_contact: req.body.contact || '',
        client_location: req.body.location || '',
        email_sent: new Date(0)
    };
    // console.log(newAppointment);
    // Get the current date and time in UTC
    const currentUTC = new Date();

    // Get the timezone offset of your local timezone in minutes
    const timezoneOffset = currentUTC.getTimezoneOffset();

    // Adjust the current date and time according to your timezone offset
    const currentTimestamp = currentUTC.getTime() - (timezoneOffset * 60 * 1000);
    // console.log(currentDate);
    const appointmentTimestamp = newAppointment.appointment_date_time.getTime();
    // const timeDifference = appointmentTimestamp-currentTimestamp;
    
    if((appointmentTimestamp-currentTimestamp)<3600000){
        return res.status(500).json({success:false, error:'Appointment time should be 1 hour post to current time '});
    }

    const updatedUser = await UserInfo.findByIdAndUpdate(
      userId ,
      { $push: { appointments: newAppointment } },
      { new: true }
    );

    if (updatedUser) {
      console.log('New appointment added successfully:');
      console.log(updatedUser);
      res.status(200).json({success:true, details:updatedUser});
    } else {
      console.log('User not found or appointment not added.');
      res.status(404).json({ success:false, error: 'User not found or appointment not added.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, error: 'An error occurred.' });
  }
};

exports.updateAppointment = async (req, res) => {
  const userId = req.params.user_id; 
  const appointmentId = req.params.appointment_id; 
  // const {name, contact, location, appdesc, email, dateTime} = req.body;
  const updatedAppointment = {
      client_location: req.body.location || '',
      client_name: req.body.name,
      appointment_description: req.body.appdesc,
      appointment_date_time: new Date(req.body.dateTime+':00.000Z'),
      client_email: req.body.email,
      client_contact: req.body.contact || '',
  };
  // console.log(updatedAppointment);
    
  // Get the current date and time in UTC
  const currentUTC = new Date();
  // Get the timezone offset of your local timezone in minutes
  const timezoneOffset = currentUTC.getTimezoneOffset();
  
  // Adjust the current date and time according to your timezone offset
  const currentTimestamp = currentUTC.getTime() - (timezoneOffset * 60 * 1000);
  // console.log(currentDate);
  const appointmentTimestamp = updatedAppointment.appointment_date_time.getTime();
  const timeDifference = appointmentTimestamp-currentTimestamp;
  
  console.log(appointmentTimestamp, currentTimestamp, timeDifference);
  if((appointmentTimestamp-currentTimestamp)<0){
      return res.status(500).json({success:false, error:'The appointment is old, Create new one'});
  }

  try {
    const user = await UserInfo.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    const appointmentIndex = user.appointments.findIndex(
        (appointment) => appointment._id.toString() === appointmentId
    );
        
    if (appointmentIndex === -1) {
        return res.status(404).json({ success: false, error: 'Appointment not found' });
    }
    console.log(user.appointments[appointmentIndex]);
    updatedAppointment['email_sent'] = user.appointments[appointmentIndex].email_sent;
    user.appointments[appointmentIndex] = updatedAppointment;
    console.log(user.appointments[appointmentIndex]);
    // return res.send({message:'hello'});
    const updatedUser = await user.save({ validateBeforeSave: false , versionKey:false});
        
    if (!updatedUser) {
      return res.status(404).json({ success: false, error: 'User or appointment not found' });
    }
    res.status(200).json({success: true, userDetail:user});
  } catch (err) {
    console.log('Error in updating:', err);
    res.status(500).json({success:false, error: 'Error updating appointment' });
  }
};

// exports.updateAppointment = async (req, res) => {
//   const userId = req.params.user_id;
//   const appointmentId = req.params.appointment_id;
//   const updatedAppointment = {
//     client_location: req.body.location || '',
//     client_name: req.body.name,
//     appointment_description: req.body.appdesc,
//     appointment_date_time: new Date(req.body.dateTime+':00.000Z'),
//     client_email: req.body.email,
//     client_contact: req.body.contact || '',
//     email_sent: req.body.email_sent || 0
// };
// // console.log(updatedAppointment);
  
// // Get the current date and time in UTC
// const currentUTC = new Date();

// // Get the timezone offset of your local timezone in minutes
// const timezoneOffset = currentUTC.getTimezoneOffset();

// // Adjust the current date and time according to your timezone offset
// const currentTimestamp = currentUTC.getTime()// - (timezoneOffset * 60 * 1000);
// // console.log(currentDate);
// const appointmentTimestamp = updatedAppointment.appointment_date_time.getTime();
// // const timeDifference = appointmentTimestamp-currentTimestamp;

// if((appointmentTimestamp-currentTimestamp)<3600000){
//     return res.status(500).json({success:false, error:'Appointment time should be 1 hour post to current time '});
// }

//   try {
//     const updatedUser = await UserInfo.findOneAndUpdate(
//       { _id: userId, 'appointments._id': appointmentId },
//       { $set: { 'appointments.$': updatedAppointment } },
//       { new: true, versionKey: false }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ error: 'User or appointment not found' });
//     }

//     res.status(200).json({ success: true, userDetail: updatedUser });
//   } catch (err) {
//     res.status(500).json({ success: false, error: 'Error updating appointment' });
//   }
// };
