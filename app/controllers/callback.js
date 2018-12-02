
const official = require('./official.js');

exports.accept = function (req, res) {
    // Create and Save a new Note
    const { body } = req
    console.log(req.body)
    const { text, from, date } = body

    const action = text.split(" ")[0]
    const firstName = text.split(" ")[1]
    const lastName = text.split(" ")[2]
    const state = text.split(" ")[3]
    const lga = text.split(" ")[4]
    const puCode = text.split(" ")[5]
    const puName = text.split(" ")[6]
    const ward = text.split(" ")[7]

    let registrationDetails = {
        firstName,
        lastName,
        phone: from,
        state,
        lga,
        puCode,
        puName,
        ward
    }

    switch(action){
        case 'Register':
            return official.create(registrationDetails)

    }
}