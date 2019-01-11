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
    const { page=1, limit=10 } = req.query
    PU.paginate({state},{ page, limit: parseInt(limit) }).then((pus) => {
        return res.status(200).send(pus);
    }).catch(error => {
        res.status(500).send(error);
    })

}

exports.getPuCount = async function(req,res){
    const { state } = req.params
    const { page=1, limit=10 } = req.query
        const lgas = await PU.find({state}).distinct('lga')
        let data = lgas.map(async (lga) => {

            const pollingUnitsInLga = await PU.find({lga}).count()
            const wardsinLga = await PU.find({lga}).distinct('ward')
            const wardsInLgaPromise =  wardsinLga.map( async (ward) => {
                const pollingUnitsInWard = await PU.find({ward}).count()
                return {
                    ward,
                    pollingUnitsInWard
                }
            })
            const wards = await  Promise.all(wardsInLgaPromise)
            return {
                lga,
                pollingUnitsInLga,
                wards
            }
        })
        const finalAns = await Promise.all(data)
        return res.status(200).send(finalAns);
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
exports.getResultsByWard = function(req,res){
    const { ward } = req.params
    PU.find({ward}).then((pus) => {
        const apc = pus.reduce((acc=0,cv) => {
            return acc + cv.apc ? cv.apc : 0
        })
        const pdp = pus.reduce((acc,cv) => {
            return acc + cv.pdp ? cv.pdp : 0
        },0)
        //return res.status(200).send(pus);
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