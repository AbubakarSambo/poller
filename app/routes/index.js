module.exports = function(app) {

    const callback = require('../controllers/callback.js');
    const official = require('../controllers/official.js');
    const supervisor = require('../controllers/supervisor.js');
    const pu = require('../controllers/pu.js');

    // Create a new Note
    app.post('/callback', callback.accept); 
    app.post('/official/assignsupervisor', official.assignSupervisor );
    app.post('/supervisor/register', supervisor.createViaApi );
    app.post('/official/register', official.createViaApi );
    app.post('/pu/register', pu.create );
    app.get('/pu', pu.getPu );
    app.get('/fetch-data', pu.fetchThirdParty);
}