const Official = require('../models/official.js');
const Supervisor = require('../models/supervisor.js');
const PU = require('../models/pu.js');

const config = require('../../config/config.js');

const AfricasTalking = require('africastalking')(config.options)
sms = AfricasTalking.SMS

// Create and Save a new Note
exports.create = function (text,phone ) {

    const firstName = text.split(" ")[1]
    const lastName = text.split(" ")[2]
    const state = text.split(" ")[3]
    const lga = text.split(" ")[4]
    const puCode = text.split(" ")[5]


    let official = new Official({
        firstName,
        lastName,
        phone,
        state,
        lga,
        puCode,
        puName,
        ward,
    })

    Official.find({phone}).then((singleOfficial) => {
        if(singleOfficial.length !== 0){
            const smsOptions = {
                to: phone,
                message: `Phone Number in use already`
            }
            sms.send(smsOptions).then(response => {
            })
            .catch(error => {
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
                    })
                    .catch(error => {
                    });
                } else {
                    const smsOptions = {
                        to: phone,
                        message: 'Registered Successfully'
                    }
                    sms.send(smsOptions).then(response => {
                    })
                    .catch(error => {
                    });
                }
            });
          }
    })
}

exports.assignSupervisor = (req, res) => {
    const { body } = req
    const { official, supervisor } = body

    Supervisor.find({phone: supervisor}).then((singleSupervisor) => {
        Official.findOneAndUpdate({ phone: official }, { supervisor: singleSupervisor }).then((item) => {
            res.status(200).send({message: 'Successfully added supervisor to official'})
        }).catch((error) => {
            res.status(400).send({message: `couldn't add supervisor: ${error}`})
        })
    }).catch((error) => {
        res.status(500).send({message: `couldn't add supervisor: ${error}`})
    })
    

        
}

exports.createViaApi = function (req,res ) {
    // have to give supervisors phone number
    const { firstName, lastName, puCode,phone, supervisor} = req.body

    Official.find({phone}).then((singleOfficial) => {
        if(singleOfficial.length !== 0){
            res.status(400).send({message: 'Official exists'})
          }
          else{
            PU.findOne({code: puCode}).then((singlePu) => {
                console.log(singlePu)
                Supervisor.findOne({phone: supervisor}).then((singleSupervisor) => {
                    if(singleSupervisor.length !==0){
                        let newOfficial = new Official({ firstName, lastName, phone, pu: singlePu, supervisor: singleSupervisor})
                        newOfficial.save().then((newOffish) => {
                            const token = jwt.sign({ id: newOffish._id }, config.secretKey, { expiresIn: 86400 });
                            return res.status(201).send({ token });
                        })
                        .catch((err) => {
                            return res.status(500).send({message: err})
                        })
                    }
                    else{
                        res.status(400).send({message: 'No such supervisor'})
                    }
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            })
            .catch(error => {
                res.status(500).send(error);
            })
            
          }
    })
}

exports.getOfficials = function(req, res){
    Official.find().populate(['PU','Supervisor']).then((officials) => {
        if (!officials) return res.status(404).send({message: 'No Official found.'});
        return res.status(200).send({ officials });
    })
}