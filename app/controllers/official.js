var Official = require('../models/official.js');

var config = require('../../config/config.js');

const AfricasTalking = require('africastalking')(config.options)
sms = AfricasTalking.SMS

// Create and Save a new Note
exports.create = function (registrationDetails) {

    const { firstName, lastName, phone, state, lga, puCode, puName, ward, supervisor } = registrationDetails

    let official = new Official({
        firstName,
        lastName,
        phone,
        state,
        lga,
        puCode,
        puName,
        ward,
        supervisor
    })

    Official.find({phone}).then((singleOfficial) => {
        if(singleOfficial.length !== 0){
            const smsOptions = {
                to: phone,
                message: `Phone Number in use already`
            }
            sms.send(smsOptions).then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
          }
          else{
            official.save(function (err, data) {
                if (err) {
                    const smsOptions = {
                        to: phone,
                        message: `Could not register: ${err}`
                    }
                    sms.send(smsOptions).then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                } else {
                    const smsOptions = {
                        to: phone,
                        message: 'Registered Successfully'
                    }
                    sms.send(smsOptions).then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }
            });
          }
    })
}