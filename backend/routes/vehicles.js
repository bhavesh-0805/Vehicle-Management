const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, async (req, res) => {
  const { make, model, year, registrationNumber } = req.body;
  const vehicle = new Vehicle({ owner: req.user.id, make, model, year, registrationNumber });
  await vehicle.save();
  res.json(vehicle);
});

router.get('/', auth, async (req, res) => {
  const list = await Vehicle.find({ owner: req.user.id });
  res.json(list);
});

// DELETE /vehicles/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
