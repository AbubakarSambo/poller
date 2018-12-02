var Official = require('../models/official.js');
var Accreditation = require('../models/accreditation.js');

var config = require('../../config/config.js');

const AfricasTalking = require('africastalking')(config.options)
sms = AfricasTalking.SMS

// Create and Save a new Note
exports.accreditation = function (text, phone) {

    const count = text.split(" ")[1]
    const puCode = text.split(" ")[2]
    const puName = text.split(" ")[3]
    const ward = text.split(" ")[4]

    Official.find({ phone }).then((singleOfficial) => {
        if (singleOfficial) {
            let accreditationDetails = new Accreditation({
                puCode,
                puName,
                ward,
                official: singleOfficial,
                count
            })

            accreditationDetails.save().then(() => {
                const smsOptions = {
                    to: phone,
                    message: `Accredited successfully`
                }
                sms.send(smsOptions).then(response => {
                    console.log(response);
                })
                    .catch(error => {
                        console.log(error);
                    });
            })
        }
        else {
            const smsOptions = {
                to: phone,
                message: 'This nigga aint registered'
            }
            sms.send(smsOptions).then(response => {
                console.log(response);
            })
                .catch(error => {
                    console.log(error);
                });


        }
    })
}