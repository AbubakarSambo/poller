const mongoose = require('mongoose');


const PuSchema = mongoose.Schema({
    name: String,
    code: String,
    state: String,
    lga: String,
    ward: String,
    setup: Boolean,
    accreditationStarted: Boolean,
    accreditationEnded: Boolean,
    numberAccredited: Number,
    votingStarted: Boolean,
    votingEnded: Boolean,
    results: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('PU', PuSchema);