const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const UserInfo = require('../models/userInfo');
const mongoose = require('mongoose');

// Function to send an email
exports.sendEmail = async (req, res) => {
    const { recipientEmail, subject, body } = req.body;
    const userId= req.params.user_id;
    const appointmentId = req.params.appointment_id;
    
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL, // Replace with your email
                pass: process.env.PASSWORD, // Replace with your email password
            },
        });

        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "AutoRem",
                link: '#'
            }
        });

        let mail = MailGenerator.generate({ body: body });

        
        const user = await UserInfo.findById(userId);
        if (!user) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        const appointmentIndex = user.appointments.findIndex(
            (appointment) => appointment._id.toString() === appointmentId
        );

        if (appointmentIndex === -1) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ success: false, error: 'Appointment not found' });
        }
        const currentDate = new Date();
        // const offset = currentDate.getTimezoneOffset();
        const currentTime = currentDate.getTime();// - (offset * 60 * 1000);

        const emailTime = new Date(user.appointments[appointmentIndex].email_sent);
        // console.log(emailTime.getTime(), currentTime);
        if(emailTime.getTime()>currentTime-600000){
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({success: false, error: 'Email can be sent only in interval of 10 minutes'})
        }
        user.appointments[appointmentIndex]["email_sent"] = currentDate;//new Date(currentTime);
        // console.log(user.appointments[appointmentIndex]);
        const updatedUser = await user.save({ validateBeforeSave: false , versionKey:false});
        
        if (!updatedUser) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ success: false, error: 'User or appointment not found' });
        }

        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: subject,
            html: mail,
        });

        // If both updates are successful, commit the transaction
        await session.commitTransaction();
        session.endSession();

        console.log('Email sent:', info.response);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (err) {
        // If any error occurs during the updates, rollback the transaction
        await session.abortTransaction();
        session.endSession();
        console.error('Error sending email:', err);
        res.status(500).json({ success: false, error: 'Error sending email' });
    }
};
