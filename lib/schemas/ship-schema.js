const mongoose = require('mongoose');

const shipSchema = new mongoose.Schema({
    shipsID: Number,
    shipName: String,
    slug: String,
    version: String,
});

module.exports = mongoose.model('shiplist', shipSchema);