const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
            })
            .catch(error => {
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
                    })
                    .catch(error => {
                    });
                } else {
                    const smsOptions = {
                        to: phone,
                        message: 'Registered Supervisor Successfully'
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

exports.createViaApi = function (req,res ) {

    const { firstName, lastName, state,phone, lga ,puCode, username, password } = req.body

    Supervisor.find({phone}).then((singleSupervisor) => {
        if(singleSupervisor.length !== 0){
            res.status(400).send({message: 'Supervisor exists'})
          }
          else{
            PU.findOne({code: puCode}).then((pu) => {
                const hashedPassword = bcrypt.hashSync(password, 8)
                let supervisor = new Supervisor({ firstName, lastName, phone, state, lga, puCode, pu, username, password: hashedPassword })
                supervisor.save().then((newSupervisor) => {
                    const token = jwt.sign({ id: newSupervisor._id }, config.secretKey, { expiresIn: 86400 });
                    return res.status(201).send({ token });
                })
                .catch((err) => {
                    return res.status(400).send({message: 'could not save'})
                })
            })
            .catch(error => {
                res.status(500).send('couldnt find pu');
            })
            
          }
    })
}

exports.login = function (req, res) {
    const { password, username } = req.body
    Supervisor.findOne({ username }).then((supervisor) => {
        if (!supervisor) return res.status(404).send({message: 'That Username does not exist'});
        const passwordIsValid = bcrypt.compareSync(password, supervisor.password);
        if (!passwordIsValid) return res.status(401).send({ message: 'Invalid Password' });
        const token = jwt.sign({ id: supervisor._id }, config.secretKey, { expiresIn: 86400 });
        return res.status(200).send({ supervisor, token });
    })

};