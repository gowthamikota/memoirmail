const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const TimeCapsule = require('../models/TimeCapsule');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Create a new time capsule
router.post('/', auth, upload.array('media'), async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    console.log('Received files:', req.files);

    const { title, message, deliveryDate } = req.body;
    
    // Validate required fields
    if (!title || !message || !deliveryDate) {
      console.log('Missing required fields:', { title, message, deliveryDate });
      return res.status(400).json({ 
        msg: 'Please provide all required fields',
        missing: {
          title: !title,
          message: !message,
          deliveryDate: !deliveryDate
        }
      });
    }

    // Get media file paths if any files were uploaded
    const media = req.files ? req.files.map(file => file.path) : [];

    const newCapsule = new TimeCapsule({
      user: req.user.id,
      title,
      message,
      media,
      deliveryDate: new Date(deliveryDate)
    });

    console.log('Creating new capsule:', {
      title,
      message,
      deliveryDate: new Date(deliveryDate),
      mediaCount: media.length
    });

    const capsule = await newCapsule.save();
    console.log('Capsule created successfully:', capsule);
    res.json(capsule);
  } catch (err) {
    console.error('Error creating capsule:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        msg: err.message,
        errors: err.errors 
      });
    }
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Get all time capsules for a user
router.get('/', auth, async (req, res) => {
  try {
    const capsules = await TimeCapsule.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(capsules);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a single time capsule
router.get('/:id', auth, async (req, res) => {
  try {
    const capsule = await TimeCapsule.findById(req.params.id);
    
    if (!capsule) {
      return res.status(404).json({ msg: 'Time capsule not found' });
    }

    // Check if user owns the capsule
    if (capsule.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(capsule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a time capsule
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, message, media, deliveryDate } = req.body;

    let capsule = await TimeCapsule.findById(req.params.id);

    if (!capsule) {
      return res.status(404).json({ msg: 'Time capsule not found' });
    }

    // Check if user owns the capsule
    if (capsule.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    capsule = await TimeCapsule.findByIdAndUpdate(
      req.params.id,
      { title, message, media, deliveryDate },
      { new: true }
    );

    res.json(capsule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a time capsule
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await TimeCapsule.removeCapsule(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    console.error('Error deleting time capsule:', err);
    if (err.message === 'Time capsule not found') {
      return res.status(404).json({ message: err.message });
    }
    if (err.message === 'Not authorized to delete this capsule') {
      return res.status(401).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 