// const axios = require('axios');
// require('dotenv').config({ path: 'apiKey.env' });
// const apiKey = process.env.API_KEY;

// const getDogs = async (req, res) => {
//     try {

//         const apiUrl = `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`;

//         const response = await axios.get(apiUrl);
//         const dogsData = response.data;

//         const allDogs = dogsData.map((dog) => {
//             return {
//                 id: dog.id,
//                 image: `https://cdn2.thedogapi.com/images/${dog?.reference_image_id}.jpg`,
//                 name: dog.name,
//                 height: dog.height,
//                 weight: dog.weight,
//                 life_span: dog.life_span,
//             };
//         });

//         return res.status(200).json(allDogs);
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// };

// module.exports = { getDogs };




const axios = require('axios');
const { Dogs } = require('../db');
require('dotenv').config({ path: 'apiKey.env' });
const apiKey = process.env.API_KEY;

const getDogs = async (req, res) => {
    try {
        const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`);
        const apiDogs = apiResponse.data.map((dog) => {
            return {
                id: dog.id,
                image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
                name: dog.name,
                height: dog.height,
                weight: dog.weight,
                life_span: dog.life_span,
                source: 'API',
            };
        });

        const dbDogs = await Dogs.findAll();
        const dbDogsData = dbDogs.map((dbDog) => {
            return {
                id: dbDog.id,
                image: dbDog.image,
                name: dbDog.name,
                height: dbDog.height,
                weight: dbDog.weight,
                life_span: dbDog.life_span,
                source: 'DB', 
            };
        });

        // Combina los resultados de ambas fuentes
        const allDogs = [...apiDogs, ...dbDogsData];

        return res.status(200).json(allDogs);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getDogs };
