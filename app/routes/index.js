module.exports = function(app) {

    const callback = require('../controllers/callback.js');
    const official = require('../controllers/official.js');
    const supervisor = require('../controllers/supervisor.js');
    const pu = require('../controllers/pu.js');
    const verifyToken = require('../middleware/verifytoken.js');

    console.log('in route index')
    // Create a new Note
    app.post('/callback', callback.accept);
    app.post('/official/assignsupervisor', official.assignSupervisor )
    app.post('/supervisor/register', supervisor.createViaApi )
    app.post('/supervisor/login', supervisor.login )
    app.post('/official/register', official.createViaApi )
    app.post('/pu/register', pu.create )
    app.get('/pu/:state',verifyToken, pu.getPuByState )
    app.get('/count/pu/:state',verifyToken, pu.getPuCount )
    app.get('/result/pu/:state',verifyToken, pu.getResultCount )
    app.get('/pu/lga/:lga',verifyToken, pu.getPuByLga )
    app.get('/pu/ward/:ward',verifyToken, pu.getPuByWard )
    app.get('/pu/results/ward/:ward',verifyToken, pu.getResultsByWard )
    app.get('/states', pu.getAllStates )
    app.get('/lgas/:state', pu.getLgas )
    app.get('/wards/:lga', pu.getWards )
    app.get('/official', official.getOfficials )
}