const { Dogs } = require('../db');

const getDogsDB = async (req, res) => {
    try {

        const dogsDB = await Dogs.findAll();
        if(dogsDB){
        const dbDogsData = dogsDB.map((dbDog) => {
            return {
                id: dbDog.id,
                image: dbDog.image,
                name: dbDog.name,
                height: dbDog.height,
                weight: dbDog.weight,
                life_span: dbDog.life_span,
            };
        })

        return res.status(200).json(dbDogsData);
    } } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getDogsDB };