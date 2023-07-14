const mongoose = require('mongoose');

const cameraSchema = new mongoose.Schema({
  serialNo: {
    type: String,
    required: true,
  },
  activeStatus: {
    type: Boolean,
    default: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
});

const Camera = mongoose.model('Camera', cameraSchema);

module.exports = Camera;
