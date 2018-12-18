const PU = require('../models/pu.js');

const axios = require('axios')

exports.create = function (req,res ) {

    const { name, code, state,ward, lga } = req.body

    let newPuUnit = new PU({
        name,
        code,
        state,
        lga,
        ward,
    })

    PU.find({code}).then((singlePu) => {
        if(singlePu.length !== 0){
            res.status(400).send({message: 'Polling Unit exists'})
          }
          else{
            newPuUnit.save(function (err, data) {
                if (err) {
                    return res.status(500).send({message: err})
                } else {
                    return res.status(200).send({message: 'Pu created Successfully'})
                }
            });
          }
    })
}


exports.getPuByState = function(req,res){
    const { state } = req.params
    const { page, limit } = req.query
    PU.paginate({state},{ page, limit: parseInt(limit) }).then((pus) => {
        return res.status(200).send(pus);
    }).catch(error => {
        res.status(500).send(error);
    })

}

exports.getPuByLga = function(req,res){
    const { lga } = req.params
    const { page, limit } = req.query
    PU.paginate({lga},{ page, limit: parseInt(limit) }).then((pus) => {
        return res.status(200).send(pus);
    }).catch(error => {
        res.status(500).send(error);
    })

}

exports.getPuByWard = function(req,res){
    const { ward } = req.params
    const { page, limit } = req.query
    PU.paginate({ward},{ page, limit: parseInt(limit) }).then((pus) => {
        return res.status(200).send(pus);
    })

}

exports.getAllStates = async function(req,res){
    const states  = await this.getStates()
    const { data } = states
    return res.status(200).send(data);
}

exports.getLgas = async function(req,res){
    const { state } = req.params
    const lgas  = await this.getLgas(state)
    const { data } = lgas
    return res.status(200).send(data);
}
exports.getWards = async function(req,res){
    const { lga } = req.params
    let wards = []
    PU.find({lga: lga.toUpperCase()}).then((pu) => {
        pu.forEach((lgaFound) => {
            if(!wards.includes(lgaFound.ward)){
                wards.push(lgaFound.ward)
            }
        })
        return res.status(200).send(wards);
    })
    
}

getStates = () => {
    return axios.get(`http://locationsng-api.herokuapp.com/api/v1/states`)
}

getLgas = (state) => {
    return axios.get(`http://locationsng-api.herokuapp.com/api/v1/states/${state}/lgas`)
}