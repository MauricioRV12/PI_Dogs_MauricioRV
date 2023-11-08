// const axios = require('axios');
// const { Dogs } = require('../db');
// require('dotenv').config({ path: 'apiKey.env' });
// const apiKey = process.env.API_KEY;

// const getTempByName = async (req, res) => {
//     const { temperament } = req.query;

//     try {

//         const apiUrl = `https://api.thedogapi.com/v1/breeds/search?q=${temperament}&api_key=${apiKey}`;

//         const response = await axios.get(apiUrl);
//         const dogsData = response.data;

//         if (dogsData.length > 0) {
//             const dogsResults = [];

//             for (const dog of dogsData) {
//                 const dogInfo = {
//                     id: dog.id,
//                     image: `https://cdn2.thedogapi.com/images/${dog?.reference_image_id}.jpg` || null,
//                     name: dog.name,
//                     height: {
//                         Imperial: dog.height.imperial,
//                         Metric: dog.height.metric
//                     },
//                     weight: {
//                         Imperial: dog.weight.imperial,
//                         Metric: dog.weight.metric
//                     },
//                     life_span: dog.life_span,
//                     temperament: dog.temperament || null,
//                 };

//                 dogsResults.push(dogInfo);

//                 await Dogs.findOne({ where: { id: dog.id } });
            
//             }

//             return res.status(200).json(dogsResults);
//         } else {
//             return res.status(404).send("No se encontraron perros con similitud en el nombre");
//         }
//     } catch (error) {
//         return res.status(500).send('Error al buscar perros por nombre');
//     }
// };

// module.exports = { getTempByName };




const axios = require('axios');
const { Dogs } = require('../db');
require('dotenv').config({ path: 'apiKey.env' });
const apiKey = process.env.API_KEY;

const getDogsByTemperament = async (req, res) => {
    const { temperament } = req.query;

    try {
        const apiUrl = `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`;
        const response = await axios.get(apiUrl);
        const dogsData = response.data;
        console.log(dogsData);
    
        const dogsWithTemperament = dogsData.filter(dog => {
            if (dog.temperament && typeof dog.temperament === 'string') {
                const temperaments = dog.temperament.split(', ').map(temp => temp.trim());
        
                return temperaments.includes(temperament);
            }
            return false;
        });
        
        

        if (dogsWithTemperament.length > 0) {
            const dogsResults = dogsWithTemperament.map(dog => {
                return {
                    id: dog.id,
                    image: `https://cdn2.thedogapi.com/images/${dog?.reference_image_id}.jpg` || null,
                    name: dog.name,
                    height: {
                        imperial: dog.height.imperial,
                        metric: dog.height.metric
                    },
                    weight: {
                        imperial: dog.weight.imperial,
                        metric: dog.weight.metric
                    },
                    life_span: dog.life_span,
                    temperament: dog.temperament || null,
                };
            });

            return res.status(200).json(dogsResults);
        } else {
            return res.status(404).send("No se encontraron perros con el temperamento especificado");
        }
    } catch (error) {
        console.error('Error al buscar perros por temperamento:', error);
        return res.status(500).send('Error al buscar perros por temperamento');
    }
};

module.exports = { getDogsByTemperament };

