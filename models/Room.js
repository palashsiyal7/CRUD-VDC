const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNo: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;