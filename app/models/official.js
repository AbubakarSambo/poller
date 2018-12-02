const mongoose = require('mongoose');

const SupervisorSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    state: String,
    lga: String,
}, {
    timestamps: true
});
const OfficialSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    state: String,
    lga: String,
    puCode: String,
    puName: String,
    ward: String,
    supervisor: [SupervisorSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Volunteer', OfficialSchema);