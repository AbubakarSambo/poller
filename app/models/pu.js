const mongoose = require('mongoose');


const PuSchema = mongoose.Schema({
    name: String,
    code: String,
    state: String,
    stateCode: String,
    lga: String,
    lgaNum: String,
    lgaCode: String,
    ward: String,
    wardNum: String,
    puNum: String,
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