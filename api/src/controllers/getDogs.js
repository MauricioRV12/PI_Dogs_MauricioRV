const axios = require('axios');
require('dotenv').config({ path: 'apiKey.env' });
const apiKey = process.env.API_KEY;

const getDogs = async (req, res) => {
    try {

        const apiUrl = `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`;

        const response = await axios.get(apiUrl);
        const dogsData = response.data;

        const allDogs = dogsData.map((dog) => {
            return {
                id: dog.id,
                image: `https://cdn2.thedogapi.com/images/${dog?.reference_image_id}.jpg`,
                name: dog.name,
                height: dog.height,
                weight: dog.weight,
                life_span: dog.life_span,
            };
        });

        return res.status(200).json(allDogs);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getDogs };