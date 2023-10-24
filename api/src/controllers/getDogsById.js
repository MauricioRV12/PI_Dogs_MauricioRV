const axios = require('axios');
const { Dogs } = require('../db');
require('dotenv').config({ path: 'apiKey.env' });
const apiKey = process.env.API_KEY;

const getDogsById = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(404).send('No existe raza con ese ID');
        }

        const apiUrl = `https://api.thedogapi.com/v1/breeds/${id}?api_key=${apiKey}`;

        const response = await axios.get(apiUrl);
        const dogData = response.data;

        const existingDog = await Dogs.findOne({ where: { id: dogData.id } });

        if (existingDog) {
            return res.status(200).json(existingDog);
        } else {
            const newDog = {
                id: dogData.id,
                image: `https://cdn2.thedogapi.com/images/${dogData?.reference_image_id}.jpg` || null,
                name: dogData.name,
                height: { 
                    Imperial: dogData.height.imperial,
                    Metric: dogData.height.metric
                },
                weight: { 
                    Imperial: dogData.weight.imperial,
                    Metric: dogData.weight.metric
                },
                life_span: dogData.life_span,
                temperament: dogData.temperament || null,
            };

            await Dogs.create(newDog);

            return res.status(200).json(newDog);
        }
    } catch (error) {
        return res.status(404).send('No existe ese ID');
    }
};

module.exports = { getDogsById };