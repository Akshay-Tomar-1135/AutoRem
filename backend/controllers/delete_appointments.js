const UserInfo = require('../models/userInfo'); // Import the model

// Controller function to delete appointments based on IDs
exports.deleteAppointments = async (req, res) => {
  try {
    const { userId, appointmentIds } = req.body;

    // Find the user by their ID
    const user = await UserInfo.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Filter the appointments array to keep only those with IDs not in appointmentIds
    user.appointments = user.appointments.filter(appointment =>
      !appointmentIds.includes(appointment._id.toString())
    ) || [];

    // Save the updated user
    const updatedUser = await user.save({validateBeforeSave: false});

    res.status(200).json({ success: true, details: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'An error occurred.' });
  }
};
