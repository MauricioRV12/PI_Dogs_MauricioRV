const { Dogs, Temperaments } = require('../db');

const postDogs = async (req, res) => {
    const {name, height, weight, life_span, temperament} = req.body;

    try {
        if(!name || !height || !weight || !life_span){
            return res.status(400).send('Faltan Datos');
        }

        const newDog = await Dogs.create({
            name,
            height,
            weight,
            life_span,
        });

        if(temperament && temperament.length > 0) {
            const tempRecords = await Temperaments.findAll({where: {id: temperament}});
            if(tempRecords.length > 0){
                await newDog.addTemperaments(tempRecords);
            }
        }

        return res.status(200).json(newDog);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = { postDogs };