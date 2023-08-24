const mongoose = require('mongoose');

// Define the schema for the nested element
const appointmentSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
  client_name: { type: String, required: true },
  appointment_description: { type: String, required: true },
  appointment_date_time: { type: Date, unique:true, required: true },
  client_email: { type: String, required: true },
  client_contact: { type: String, default:'' },
  client_location: {type: String, default:'' }, 
  email_sent: {type: Date, default: 0}
});

// Define the main schema for the MongoDB collection
const userInfo = new mongoose.Schema({
  email: { type: String, required: true, unique:true },
  location: { type: String, default:'' },
  contact: { type: String, default: '' },
  appointments: [appointmentSchema], // Embed the nested schema as an array of elements
}, 
{
  collection: 'userData'
});

// Create a model for the schema
module.exports = mongoose.model('userData', userInfo);
