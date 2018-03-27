module.exports = function(app) {

    var volunteer = require('../controllers/volunteer.js');

    // Create a new Note
    app.post('/volunteers', volunteer.create);
    app.post('/volunteers/donors',volunteer.getDistance)
    app.post('/volunteers/foodbank',volunteer.getDistanceBanks)

    // // Retrieve all Notes
    app.get('/volunteer', volunteer.findAll);

    // // Retrieve a single Note with noteId
    // app.get('/volunteer/:volunteer', notes.findOne);

    // // Update a Note with noteId
    // app.put('/volunteer/:volunteer', notes.update);

    // // Delete a Note with noteId
    // app.delete('/volunteer/:volunteer', notes.delete);
}