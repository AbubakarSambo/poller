var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SupervisorSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    state: String,
    pu: { type: Schema.Types.ObjectId, ref: 'PU' },
    lga: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Supervisor', SupervisorSchema);