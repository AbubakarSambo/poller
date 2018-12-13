var Official = require('../models/official.js');
var Accreditation = require('../models/accreditation.js');
var PU = require('../models/pu.js');

var config = require('../../config/config.js');

const AfricasTalking = require('africastalking')(config.options)
sms = AfricasTalking.SMS

// Create and Save a new Note
exports.setup = function (text, phone) {
    const puCode = text.split(" ")[1]

    Official.find({ phone }).then((singleOfficial) => {
        if (singleOfficial.length !==0 ) {
            PU.findOneAndUpdate({code: puCode},{setup: true}).then((pu) => {
                if(pu){
                    const smsOptions = {
                        to: phone,
                        message: `PU ${puCode} Setup successfully`
                    }
                    sms.send(smsOptions).then(response => {
                        console.log(response);
                    })
                        .catch(error => {
                            console.log(error);
                        });
                }
                else{
                    const smsOptions = {
                        to: phone,
                        message: `PU ${puCode} Does not exist`
                    }
                    sms.send(smsOptions).then(response => {
                        console.log(response);
                    })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
            .catch((err) => {

            })
        }
        else {
            const smsOptions = {
                to: phone,
                message: 'This official is not registered'
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

exports.accreditationStarted = function (text, phone) {

    const puCode = text.split(" ")[1]

    Official.find({ phone }).then((singleOfficial) => {
        if (singleOfficial.length !==0 ) {
            PU.findOneAndUpdate({code: puCode},{accreditationStarted: true}).then((pu) => {
                if(pu){
                    const smsOptions = {
                        to: phone,
                        message: `PU ${puCode} Accreditation successfully started`
                    }
                    sms.send(smsOptions).then(response => {
                        console.log(response);
                    })
                        .catch(error => {
                            console.log(error);
                        });
                }
                else{
                    const smsOptions = {
                        to: phone,
                        message: `PU ${puCode} Does not exist`
                    }
                    sms.send(smsOptions).then(response => {
                        console.log(response);
                    })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
            .catch((err) => {

            })
        }
        else {
            const smsOptions = {
                to: phone,
                message: 'This official is not registered'
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

exports.accreditationEnded = function (text, phone) {
    console.log('in ended')
    const puCode = text.split(" ")[1]
    const numberAccredited = text.split(" ")[2]

    Official.find({ phone }).then((singleOfficial) => {
        console.log(singleOfficial)
        if (singleOfficial.length !==0 ) {
            PU.findOneAndUpdate({code: puCode},{accreditationEnded: true, numberAccredited}).then((pu) => {
                console.log('ended?',pu)
                if(pu){
                    const smsOptions = {
                        to: phone,
                        message: `PU ${puCode} Accreditation successfully ended with ${numberAccredited} people accredited`
                    }
                    sms.send(smsOptions).then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }
                else{
                    const smsOptions = {
                        to: phone,
                        message: `PU ${puCode} Does not exist`
                    }
                    sms.send(smsOptions).then(response => {
                        console.log(response);
                    })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
            .catch((err) => {

            })
        }
        else {
            const smsOptions = {
                to: phone,
                message: 'This official is not registered'
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

exports.votingStarted = function (text, phone) {
    const puCode = text.split(" ")[1]

    Official.find({ phone }).then((singleOfficial) => {
        if (singleOfficial.length !==0 ) {
            PU.findOneAndUpdate({code: puCode},{votingStarted: true}).then((pu) => {
                if(pu){
                    const smsOptions = {
                        to: phone,
                        message: `PU ${puCode} Voting Started successfully`
                    }
                    sms.send(smsOptions).then(response => {
                        console.log(response);
                    })
                        .catch(error => {
                            console.log(error);
                        });
                }
                else{
                    const smsOptions = {
                        to: phone,
                        message: `PU ${puCode} Does not exist`
                    }
                    sms.send(smsOptions).then(response => {
                        console.log(response);
                    })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
            .catch((err) => {

            })
        }
        else {
            const smsOptions = {
                to: phone,
                message: 'This official is not registered'
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


exports.votingEnded = function (text, phone) {
    const puCode = text.split(" ")[1]

    Official.find({ phone }).then((singleOfficial) => {
        if (singleOfficial.length !==0 ) {
            PU.findOneAndUpdate({code: puCode},{votingEnded: true}).then((pu) => {
                if(pu){
                    const smsOptions = {
                        to: phone,
                        message: `PU ${puCode} voting ended successfully`
                    }
                    sms.send(smsOptions).then(response => {
                        console.log(response);
                    })
                        .catch(error => {
                            console.log(error);
                        });
                }
                else{
                    const smsOptions = {
                        to: phone,
                        message: `PU ${puCode} Does not exist`
                    }
                    sms.send(smsOptions).then(response => {
                        console.log(response);
                    })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
            .catch((err) => {

            })
        }
        else {
            const smsOptions = {
                to: phone,
                message: 'This official is not registered'
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

exports.results = function (text, phone) {
    const puCode = text.split(" ")[1]
    const apc = text.split(" ")[2]
    const pdp = text.split(" ")[3]
    const others = text.split(" ")[4]

    Official.find({ phone }).then((singleOfficial) => {
        if (singleOfficial.length !==0 ) {
            PU.findOneAndUpdate({code: puCode},{results: `APC: ${apc}, PDP: ${pdp}, Others: ${others}`}).then((pu) => {
                if(pu){
                    const smsOptions = {
                        to: phone,
                        message: `PU ${puCode} results successfully added`
                    }
                    sms.send(smsOptions).then(response => {
                        console.log(response);
                    })
                        .catch(error => {
                            console.log(error);
                        });
                }
                else{
                    const smsOptions = {
                        to: phone,
                        message: `PU ${puCode} Does not exist`
                    }
                    sms.send(smsOptions).then(response => {
                        console.log(response);
                    })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
            .catch((err) => {

            })
        }
        else {
            const smsOptions = {
                to: phone,
                message: 'This official is not registered'
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