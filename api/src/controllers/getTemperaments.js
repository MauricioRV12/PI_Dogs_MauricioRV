const axios = require('axios');
const { Temperaments } = require('../db');
require('dotenv').config({ path: 'apiKey.env' });
const apiKey = process.env.API_KEY;

const getTemperaments = async (req, res) => {
    try {

        const apiUrl = `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`;

        const response = await axios.get(apiUrl);
        const tempData = response.data;

        const uniqueTemperaments = new Set();

        tempData.forEach((temp) => {
            if (temp.temperament) {
                const temperamentsArray = temp.temperament.split(',').map((temp) => temp.trim());

                // Agrega cada temperamento al conjunto
                temperamentsArray.forEach((temperament) => {
                    if (temperament) {
                        uniqueTemperaments.add(temperament);
                    }
                });
            }
        });

        const uniqueTemperamentsArray = [...uniqueTemperaments];

        // Itera sobre los temperamentos únicos y crea un registro por cada uno si no existe
        for (const temperament of uniqueTemperamentsArray) {
            const existingTemperament = await Temperaments.findOne({ where: { name: temperament } });
            if (!existingTemperament) {
                await Temperaments.create({ name: temperament });
            }
        }

        return res.status(200).json(uniqueTemperamentsArray);
    } catch (error) {
        console.error("Error al buscar temperamentos:", error);
        return res.status(500).send('Hubo un error al buscar los temperamentos');
    }
};

module.exports = { getTemperaments };