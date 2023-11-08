// const axios = require('axios');
// const { Dogs } = require('../db');
// require('dotenv').config({ path: 'apiKey.env' });
// const apiKey = process.env.API_KEY;

// const getDogsByName = async (req, res) => {
//     const { name } = req.query;

//     try {

//         const apiUrl = `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${apiKey}`;

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

// module.exports = { getDogsByName };

const { Sequelize, Op } = require('sequelize');
const axios = require('axios');
const { Dogs } = require('../db');
require('dotenv').config({ path: 'apiKey.env' });
const apiKey = process.env.API_KEY;

const getDogsByName = async (req, res) => {
    const { name } = req.query;
  
    try {
      const apiUrl = `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${apiKey}`;
  
      const response = await axios.get(apiUrl);
      const apiDogs = response.data;
  
      const dbDogs = await Dogs.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`, // Búsqueda insensible a mayúsculas/minúsculas
          },
        },
      });
  
      const combinedResults = [];
  
      apiDogs.forEach((apiDog) => {
        combinedResults.push({
          id: apiDog.id,
          image: `https://cdn2.thedogapi.com/images/${apiDog?.reference_image_id}.jpg` || null,
          name: apiDog.name,
          height: {
            Imperial: apiDog.height.imperial,
            Metric: apiDog.height.metric,
          },
          weight: {
            Imperial: apiDog.weight.imperial,
            Metric: apiDog.weight.metric,
          },
          life_span: apiDog.life_span,
          temperament: apiDog.temperament || null,
          source: 'API',
        });
      });
  
      dbDogs.forEach((dbDog) => {
        combinedResults.push({
          id: dbDog.id,
          image: dbDog.image,
          name: dbDog.name,
          height: dbDog.height,
          weight: dbDog.weight,
          life_span: dbDog.life_span,
          source: 'DB',
        });
      });
  
      if (combinedResults.length > 0) {
        res.status(200).json(combinedResults);
      } else {
        res.status(404).send('No se encontraron perros con similitud en el nombre');
      }
    } catch (error) {
        console.error('Error al buscar perros por nombre:', error);
        res.status(500).send('Error al buscar perros por nombre');
    }
  };
  
  module.exports = { getDogsByName };
  
  