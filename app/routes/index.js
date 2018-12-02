module.exports = function(app) {

    const callback = require('../controllers/callback.js');
    const official = require('../controllers/official.js');
    const supervisor = require('../controllers/supervisor.js');

    // Create a new Note
    app.post('/callback', callback.accept);
    app.post('/official/assignsupervisor', official.assignSupervisor )
    app.post('/supervisor', supervisor.createViaApi )
}