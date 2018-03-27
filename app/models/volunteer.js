var mongoose = require('mongoose');

var VolunteerSchema = mongoose.Schema({
    name: String,
    phone: String,
    postalCode: String,
    availability: Object
}, {
    timestamps: true
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);