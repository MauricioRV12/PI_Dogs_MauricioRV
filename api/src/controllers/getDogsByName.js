const axios = require('axios');
const { Dogs } = require('../db');
require('dotenv').config({ path: 'apiKey.env' });
const apiKey = process.env.API_KEY;

const getDogsByName = async (req, res) => {
    const { name } = req.query;

    try {

        const apiUrl = `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${apiKey}`;

        const response = await axios.get(apiUrl);
        const dogsData = response.data;

        if (dogsData.length > 0) {
            const dogsResults = [];

            for (const dog of dogsData) {
                const dogInfo = {
                    id: dog.id,
                    image: `https://cdn2.thedogapi.com/images/${dog?.reference_image_id}.jpg` || null,
                    name: dog.name,
                    height: {
                        Imperial: dog.height.imperial,
                        Metric: dog.height.metric
                    },
                    weight: {
                        Imperial: dog.weight.imperial,
                        Metric: dog.weight.metric
                    },
                    life_span: dog.life_span,
                    temperament: dog.temperament || null,
                };

                dogsResults.push(dogInfo);

                const existingDog = await Dogs.findOne({ where: { id: dog.id } });
                if (!existingDog) {
                    await Dogs.create(dogInfo);
                }
            }

            return res.status(200).json(dogsResults);
        } else {
            return res.status(404).send("No se encontraron perros con similitud en el nombre");
        }
    } catch (error) {
        return res.status(500).send('Error al buscar perros por nombre');
    }
};

module.exports = { getDogsByName };