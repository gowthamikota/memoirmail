const mongoose = require('mongoose');

const TimeCapsuleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  media: [{
    type: String // URLs to stored media files
  }],
  deliveryDate: {
    type: Date,
    required: true
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Static method to remove a time capsule
TimeCapsuleSchema.statics.removeCapsule = async function(capsuleId, userId) {
  try {
    const capsule = await this.findById(capsuleId);
    
    if (!capsule) {
      throw new Error('Time capsule not found');
    }

    if (capsule.user.toString() !== userId) {
      throw new Error('Not authorized to delete this capsule');
    }

    // Delete the capsule
    await this.findByIdAndDelete(capsuleId);
    
    return { success: true, message: 'Time capsule removed successfully' };
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('TimeCapsule', TimeCapsuleSchema); 