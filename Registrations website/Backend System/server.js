// server.js

// 1. Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This loads the variables from our .env file

// 2. Initialize the Express App and define the port
const app = express();
const PORT = process.env.PORT || 8000;

// 3. Setup Middleware
app.use(cors()); // Allows your frontend and backend to communicate
app.use(express.json()); // Allows the server to understand JSON data

// 4. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// 5. Define the Data Structure (the "Schema")
const registrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  currentYear: { type: String, required: true },
  branch: { type: String, required: true }, // This field lets us segregate the data
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' fields

// 6. Create a "Model" from the Schema
const Registration = mongoose.model('Registration', registrationSchema);

// 7. Create the API Endpoint
// This is the URL your form will send data to
app.post('/api/register', async (req, res) => {
  try {
    // Create a new registration document with the data from the form
    const newRegistration = new Registration({
      fullName: req.body.fullName,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      currentYear: req.body.currentYear,
      branch: req.body.branch,
    });

    // Save the document to the database
    const savedRegistration = await newRegistration.save();

    // Send a success message back to the frontend
    res.status(201).json({ message: 'Registration successful!', data: savedRegistration });

  } catch (error) {
    // If anything goes wrong, send an error message
    res.status(500).json({ message: 'Registration failed.', error: error.message });
  }
});

// 8. Start the Server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});