const mongoose = require('mongoose');
const clientSchema = mongoose.Schema({
  client_name: {
    type: String,
    require: true,
  },

  dni: {
    type: String,
    require: true,
    unique: true,
  },
});

module.exports = mongoose.model('clientcollection', clientSchema)
