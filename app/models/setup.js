const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SetupSchema = mongoose.Schema({
    puCode: String,
    puName: String,
    official: [{ type: Schema.Types.ObjectId, ref: 'Official' }],
    setup: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Setup', SetupSchema);