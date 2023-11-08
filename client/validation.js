export default (data)=>{
    const errors = {};

    if (!data.name) {
        errors.e1 = 'El nombre no puede estar vacío';
    }
    if (data.name.length > 35) {
        errors.e2 = 'No puede tener más de 35 caracteres';
    }
    if (/\d/.test(data.name)) {
        errors.e3 = 'El nombre no debe contener números'
    }
    if (!data.height){
        errors.e4 ='La altura no puede estar vacío';
    }
    if (!data.weight){
        errors.e5 ='El peso no puede estar vacío';
    }
    if (!data.life_span){
        errors.e6 ='La esperanza de vida no puede estar vacío';
    }
    if (/[^a-zA-Z0-9]/.test(data.name)) {
        errors.e7 = 'No debe contener caracteres especiales';
    }
    if (!/^\d+$/.test(data.height) || !/^\d+$/.test(data.weight) || !/^\d+$/.test(data.life_span)) {
        errors.e8 = 'Debe ser un número';
    }
    
    return errors;
};


// import axios from 'axios';

// export default async (data) => {
//   const errors = {};

//   if (!data.name) {
//     errors.e1 = 'El nombre no puede estar vacío';
//   }
//   if (data.name.length > 35) {
//     errors.e2 = 'No puede tener más de 35 caracteres';
//   }
//   if (/\d/.test(data.name)) {
//     errors.e3 = 'El nombre no debe contener números';
//   }
//   if (!data.height) {
//     errors.e4 = 'La altura no puede estar vacío';
//   }
//   if (!data.weight) {
//     errors.e5 = 'El peso no puede estar vacío';
//   }
//   if (!data.life_span) {
//     errors.e6 = 'La esperanza de vida no puede estar vacío';
//   }
//   if (/[^a-zA-Z0-9]/.test(data.name)) {
//     errors.e7 = 'No debe contener caracteres especiales';
//   }
//   if (!/^\d+$/.test(data.height) || !/^\d+$/.test(data.weight) || !/^\d+$/.test(data.life_span)) {
//     errors.e8 = 'Debe ser un número';
//   }

// //   // Realiza una solicitud a la API externa para verificar si el nombre ya existe
// //   try {
// //     const apiUrl = `https://api.thedogapi.com/v1/breeds/search?q=${data.name}`;
// //     const response = await axios.get(apiUrl);
// //     if (response.data && response.data.length > 0) {
// //       errors.e9 = 'El nombre ya existe en la API externa';
// //     }
// //   } catch (error) {
// //     console.error('Error en la solicitud a la API externa:', error);
// //   }

// //   // Realiza una solicitud a la base de datos local para verificar si el nombre ya existe
// //   try {
// //     const dbUrl = 'http://localhost:3001/dogsdb';
// //     const response = await axios.get(dbUrl);
// //     if (Array.isArray(response.data) && response.data.some((dog) => dog.name === data.name)) {
// //       errors.e10 = 'El nombre ya existe en la base de datos local';
// //     }
// //   } catch (error) {
// //     console.error('Error en la solicitud a la base de datos local:', error);
// //   }

//   return errors;
// };
