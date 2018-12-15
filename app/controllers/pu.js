const PU = require('../models/pu.js');
const request = require('request-promise');
const states = ["ABIA","ADAMAWA","AKWA IBOM","ANAMBRA"];//,"BAUCHI","BAYELSA","BENUE","BORNO","CROSS RIVER","DELTA","EBONYI","EDO","EKITI","ENUGU","FCT","GOMBE","IMO","JIGAWA","KADUNA","KANO","KATSINA","KEBBI","KOGI","KWARA","LAGOS","NASARAWA","NIGER","OGUN","ONDO","OSUN","OYO","PLATEAU","RIVERS","SOKOTO","TARABA","YOBE","ZAMFARA"];

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


exports.getPu = function(req,res){
    PU.find({}).then((pus) => {
        return res.status(200).send(pus);
    }).catch(error => {
        res.status(500).send(error);
    })

}

exports.fetchThirdParty = function(req, res){
       var statemap = states.map(state =>{
        request({
            "method":"GET", 
            "uri": 'https://pollrace.com/api/v1/pollingunits/distinctLgaByState?state='+ state,
            "json": true
          }).then((response) => {
              const lga = response.data;
              lga.forEach(lg => {
                request({
                    "method":"GET", 
                    "uri": 'https://pollrace.com/api/v1/pollingunits/distinctWardByStatelga?state='+ 
                        state + '&lga='+ lg ,
                    "json": true
                }).then((resp)=> {
                    const wad = resp.data;
                    wad.forEach(wd => {
                        request({
                            "method":"GET", 
                            "uri": 'https://pollrace.com/api/v1/pollingunits/getPollingUnitsByStateLgaWard?state='+ 
                                state + '&lga='+ lg + '&ward=' + wd,
                            "json": true
                        }).then((rep)=> {
                            // const pus = rep.data.map((pu)=> {
                            //     return {
                            //         name: pu.puLocation,
                            //         code: pu.puCode,
                            //         state,
                            //         stateCode: pu.stateCode,
                            //         lga: lg,
                            //         lgaNum: pu.lgaNum,
                            //         lgaCode: pu.lgaCode,
                            //         ward: wd,
                            //         wardNum: pu.wardNum,
                            //         puNum: pu.puNum
                            //     }
                            // });
                            rep.data.forEach(pu => {
                                let pollmodel = new PU({
                                    name: pu.puLocation,
                                    code: pu.puCode,
                                    state,
                                    stateCode: pu.stateCode,
                                    lga: lg,
                                    lgaNum: pu.lgaNum,
                                    lgaCode: pu.lgaCode,
                                    ward: wd,
                                    wardNum: pu.wardNum,
                                    puNum: pu.puNum
                                });
                                // console.log(pollmodel);
                                PU.find({code:pu.code}).then((singlePu) => {
                                    if(singlePu.length !== 0){
                                        console.log(`${pu.code} Polling Unit exists`)
                                      }
                                      else{
                                        pollmodel.save(function (err, data) {
                                            if (err) {
                                                console.log(`${data.code}: err`);
                                            } else {
                                                console.log(`${data.code}: Pu created Successfully`);
                                            }
                                        });
                                      }
                                })
                            });

                        });
                    });
                });
            }); 
          });
        });

    res.status(200).send("lgas");

}