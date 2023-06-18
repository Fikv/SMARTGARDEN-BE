const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: String,
  status: String,
  type: String,
  connectionType: String,
  address: String
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = { Device };