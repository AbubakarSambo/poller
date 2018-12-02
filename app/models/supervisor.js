var mongoose = require('mongoose');

var SupervisorSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    state: String,
    lga: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Volunteer', SupervisorSchema);