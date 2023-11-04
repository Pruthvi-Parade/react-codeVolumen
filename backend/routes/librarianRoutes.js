const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Librarian = require('../models/librarian');

// Librarian signup
router.post('/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const librarian = await Librarian.create({
        username,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({ librarian });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // Librarian login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const librarian = await Librarian.findOne({ email });
      if (!librarian) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, librarian.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      console.log("Hit");
      res.json({ message: 'Librarian login successful', username: librarian.username });    
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // View Appointments

// router.get('/viewappointments/:Librarianname', async (req, res) => {
//   try {
//     const { Librarianname } = req.params;

//     const appointments = await Appointment.find({Librarianname});

//     if ( appointments.length == 0)
//       return res.status(200).json({message: "No Appointments booked"});
//     console.log(appointments);
//     res.status(200).json({appointments});
//   } catch (error) {
    
//   }
// })

  // Make Report

  // router.post('/makereport', async (req, res) => {
  //   try {
      
  //     const {patientname, Librarianname, description} = req.body;

  //     const report = await Report.create({
  //       patientname,
  //       Librarianname,
  //       description,
  //     })

  //     console.log(report);
  //     await report.save();

  //     res.status(200).json({ message: "Report Stored", report});
  //   } catch (error) {

  //     console.error(error);
  //     res.status(500).json({ message: 'Server Error' });
      
  //   }
  // })

    module.exports = router;