const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OfficialSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    pu: { type: Schema.Types.ObjectId, ref: 'PU' },
    supervisor: { type: Schema.Types.ObjectId, ref: 'Supervisor' },
}, {
    timestamps: true
});

module.exports = mongoose.model('Official', OfficialSchema);