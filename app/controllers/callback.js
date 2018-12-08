
const official = require('./official.js');
const supervisor = require('./supervisor.js');
const pu = require('./pu.js');
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
        case 'pu': 
            return pu.create(text, from)
        case '1':
            return actions.setup(text, from)
        case '2':
            return actions.accreditationStarted(text, from)
        case '3':
            return actions.accreditationEnded(text, from)
        case '4':
            return actions.votingStarted(text, from)
        case '5':
            return actions.votingEnded(text, from)
        case '6':
            return actions.results(text, from)
        

    }
}