const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  deptName: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
