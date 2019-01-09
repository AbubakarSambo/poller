const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

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
    apc: Number,
    pdp: Number,
}, {
    timestamps: true
});

PuSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('PU', PuSchema);