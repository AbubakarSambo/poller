
const official = require('./official.js');
const supervisor = require('./supervisor.js');
const actions = require('./actions.js');

exports.accept = function (req, res) {
    // Create and Save a new Note
    const { body } = req
    const { text, from, date } = body

    const action = text.split(" ")[0]
    

    switch(action){
        case 'Register':
            return official.create(text, from)
        case 'rs': 
            return supervisor.create(text, from)
        case '2':
            return actions.accreditation(text, from)
        

    }
}