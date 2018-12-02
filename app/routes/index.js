module.exports = function(app) {

    const callback = require('../controllers/callback.js');

    // Create a new Note
    app.post('/callback', callback.accept);
}