var mongoose = require('mongoose');

var VolunteerSchema = mongoose.Schema({
    name: String,
    phone: String,
    postalCode: String,
    availability: Object
}, {
    timestamps: true
});
var LiftSchema = mongoose.Schema({
    origin: String,
    availability: {
        day: String,
        time: {
            hour: Number,
            minute: Number,
        }
    },
    hasVolunteer: {type: Boolean, default: false },
    volunteer: [VolunteerSchema],

}, {
    timestamps: true
});

module.exports = mongoose.model('Lifts', LiftSchema);