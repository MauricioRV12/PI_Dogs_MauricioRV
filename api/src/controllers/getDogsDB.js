const { Dogs } = require('../db');

const getDogsDB = async (req, res) => {
    try {

        const dogsDB = await Dogs.findAll();

        return res.status(200).json(dogsDB);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getDogsDB };