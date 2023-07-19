const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
