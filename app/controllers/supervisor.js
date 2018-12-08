var Supervisor = require('../models/supervisor.js');
var PU = require('../models/pu.js');
var config = require('../../config/config.js');

const AfricasTalking = require('africastalking')(config.options)
sms = AfricasTalking.SMS

// Create and Save a new Note
exports.create = function (text,phone ) {

    const firstName = text.split(" ")[1]
    const lastName = text.split(" ")[2]
    const state = text.split(" ")[3]
    const lga = text.split(" ")[4]


    let supervisor = new Supervisor({
        firstName,
        lastName,
        phone,
        state,
        lga,
    })

    Supervisor.find({phone}).then((singleSupervisor) => {
        if(singleSupervisor.length !== 0){
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
            supervisor.save(function (err, data) {
                if (err) {
                    const smsOptions = {
                        to: phone,
                        message: `Could not register supervisor: ${err}`
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
                        message: 'Registered Supervisor Successfully'
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

exports.createViaApi = function (req,res ) {

    const { firstName, lastName, state,phone, lga ,puCode } = req.body

    Supervisor.find({phone}).then((singleSupervisor) => {
        if(singleSupervisor.length !== 0){
            res.status(400).send({message: 'Supervisor exists'})
          }
          else{
            PU.findOne({code: puCode}).then((pu) => {
                let supervisor = new Supervisor({ firstName, lastName, phone, state, lga, puCode, pu })
                supervisor.save().then((newSupervisor) => {
                    return res.status(200).send(newSupervisor)
                })
                .catch((err) => {
                    return res.status(400).send({message: err})
                })
            })
            .catch(error => {
                res.status(500).send(error);
            })
            
          }
    })
}