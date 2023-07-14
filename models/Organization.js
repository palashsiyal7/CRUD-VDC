const mongoose = require('mongoose')

const organizationSchema = new mongoose.Schema({

      organizationName: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      contactNumber: {
        type: String,
        required: true,
      },
      contactName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      activeStatus: {
        type: Boolean,
        required: true,
        default: true,
      },
    });
    
    const Organization = mongoose.model('Organization', organizationSchema);
    
    module.exports = Organization;