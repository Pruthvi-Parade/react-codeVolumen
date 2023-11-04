const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// User signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    
    res.status(201).json({ user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    else{
      res.json({ message: 'User login successful', username: user.username });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Book Appointment

// router.post('/bookappointment', async (req, res) => {
//   try {
//     const { patientname, doctorname, time, date } = req.body;

//     const appointment = await Appointment.create({
//       patientname,
//       doctorname,
//       time,
//       date
//     }) 
//     await appointment.save();
//     res.status(200).json({message: "Appointment Booked", appointment})

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// })

// View Reports

// router.get('/viewreports/:patientname', async (req, res) => {

//   try {
//     const { patientname } = req.params;
  
//     const reports = await Report.find({patientname});

//     if ( reports.length == 0)
//         return res.status(200).json({message: "No Reports Available"});
//       console.log(reports);

//     res.status(200).json({reports});
//     } catch (error) {
//     res.status(500).json({message: "Internal Server Error"});
//   }
// })

module.exports = router;
