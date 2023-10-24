const { Router } = require('express');
const { getDogs } = require('../controllers/getDogs');
const { getDogsById } = require('../controllers/getDogsById');
const { getDogsByName } = require('../controllers/getDogsByName');
const { getTemperaments } = require('../controllers/getTemperaments');
const { postDogs } = require('../controllers/postDogs');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/dogs', getDogs);

router.get('/dogs/name', getDogsByName);

router.get('/dogs/:id', getDogsById);

router.get('/temperaments', getTemperaments);

router.post('/dogs', postDogs);


module.exports = router;
