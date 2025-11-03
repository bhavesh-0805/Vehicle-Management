const express = require('express');
const router = express.Router();
const Maintenance = require('../models/Maintenance');
const auth = require('../middlewares/authMiddleware');
const mongoose = require('mongoose');

// ✅ Add a maintenance record
router.post('/', auth, async (req, res) => {
  try {
    const { vehicleId, title, dueDate, cost } = req.body;

    // Validate vehicle ID
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: 'Invalid vehicle ID' });
    }

    const record = new Maintenance({
      vehicle: vehicleId,
      title,
      dueDate,
      cost,
    });

    await record.save();
    res.status(201).json(record);
  } catch (error) {
    console.error('Error adding maintenance record:', error.message);
    res.status(500).json({ message: 'Server error while adding maintenance record' });
  }
});

// ✅ Get all maintenance records for a specific vehicle
router.get('/vehicle/:vehicleId', auth, async (req, res) => {
  try {
    const { vehicleId } = req.params;

    // Validate vehicle ID
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: 'Invalid vehicle ID' });
    }

    const records = await Maintenance.find({ vehicle: vehicleId }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    console.error('Error fetching maintenance records:', error.message);
    res.status(500).json({ message: 'Server error while fetching maintenance records' });
  }
});

// ✅ Optional: Get all maintenance records for all user’s vehicles
router.get('/', auth, async (req, res) => {
  try {
    const records = await Maintenance.find().populate('vehicle');
    res.json(records);
  } catch (error) {
    console.error('Error fetching all maintenance:', error.message);
    res.status(500).json({ message: 'Server error while fetching all maintenance' });
  }
});

module.exports = router;
