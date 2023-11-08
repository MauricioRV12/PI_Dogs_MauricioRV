const { Dogs, Temperaments } = require('../db');

let lastId = 264;

const postDogs = async (req, res) => {
    const { name, height, weight, life_span, temperament } = req.body;
    lastId++;

    try {
        if (!name || !height || !weight || !life_span) {
            return res.status(400).send('Faltan Datos');
        }

        // Verifica si el nombre ya existe en la base de datos
        const existingDog = await Dogs.findOne({
            where: {
                name,
            },
        });

        if (existingDog) {
            return res.status(400).send('El nombre ya existe en la base de datos');
        }

        const newDog = await Dogs.create({
            id: lastId,
            image: "https://imagenes.elpais.com/resizer/8cKCo0e7VxYJrQIG0LsLE7CGxnQ=/1200x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/KL5WRGABBFGJHC5NX5DZ47AES4.jpg",
            name,
            height,
            weight,
            life_span,
        });

        if (temperament && temperament.length > 0) {
            const tempRecords = await Temperaments.findAll({ where: { id: temperament } });
            if (tempRecords.length > 0) {
                await newDog.addTemperaments(tempRecords);
            }
        }

        return res.status(200).json(newDog);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { postDogs };
