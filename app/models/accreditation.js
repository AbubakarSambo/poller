const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccreditationSchema = mongoose.Schema({
    puCode: String,
    puName: String,
    ward: String,
    official: [{ type: Schema.Types.ObjectId, ref: 'Official' }],
    count: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Accreditation', AccreditationSchema);