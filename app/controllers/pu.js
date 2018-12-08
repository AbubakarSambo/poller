const PU = require('../models/pu.js');



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
