import './Form.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDog } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import validation from "../../../validation";
import axios from 'axios';

const Form = () => {
    const [errors, setErrors] = useState({});
    const [addNewDog, setAddNewDog] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
    });

    const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setAddNewDog({
            ...addNewDog,
            [event.target.name]: event.target.value,
        });

        setErrors(validation({ ...addNewDog, [event.target.name]: event.target.value }));
    };

    const checkNameInApi = async (name) => {
        const response = await axios.get('http://localhost:3001/dogs');
        const namesInApi = response.data.map(dog => dog.name.toLowerCase());
    
        // Convierte el nombre ingresado a minúsculas para hacer la comparación sin distinción entre mayúsculas y minúsculas
        const lowercaseName = name.toLowerCase();
    
        // Verifica si el nombre ya existe en la API
        if (namesInApi.includes(lowercaseName)) {
            return true; // El nombre ya existe
        } else {
            return false; // El nombre no existe
        }
    };    
    
    const checkNameInDb = async (name) => {
        const response = await axios.get('http://localhost:3001/dogsdb');
        const namesInDb = response.data.map(dog => dog.name.toLowerCase());
    
        // Convierte el nombre ingresado a minúsculas para hacer la comparación sin distinción entre mayúsculas y minúsculas
        const lowercaseName = name.toLowerCase();
    
        // Verifica si el nombre ya existe en la base de datos local
        if (namesInDb.includes(lowercaseName)) {
            return true; // El nombre ya existe
        } else {
            return false; // El nombre no existe
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verificar si hay errores en el formulario
        if (Object.keys(errors).length === 0) {
            const nameExistsInApi = await checkNameInApi(addNewDog.name);
            const nameExistsInDb = await checkNameInDb(addNewDog.name);

            if (nameExistsInApi || nameExistsInDb) {
                setSuccessMessage("El nombre del perro ya existe en la API o la base de datos local.");
            } else {
                dispatch(addDog(addNewDog));
                setSuccessMessage("La nueva raza de perro fue creada correctamente");
            }
        } else {
            setSuccessMessage("Falta información o hay campos inválidos");
        }
    };

    return (
        <div>
            {successMessage && <p>{successMessage}</p>}

            <form onSubmit={handleSubmit} className="form-container">
            <label>Name: </label>
            <input type="text" onChange={handleChange} name="name"/>
            {errors.e1 ? (<p>{errors.e1}</p>) 
                : errors.e2 ? (<p>{errors.e2}</p>) 
                : (<p>{errors.e3}</p>)}
            {errors.e7 ? <p>{errors.e7}</p> : null}
            
            <label>Height: </label>
            <input type="text" onChange={handleChange} name="height" />
            <br />
            {errors.e4 ? <p>{errors.e4}</p> : null}
            {errors.e8 ? <p>{errors.e8}</p> : null}

            <label>Weight: </label>
            <input type="text" onChange={handleChange} name="weight"/>
            <br/>{errors.e5}
            {errors.e8 ? <p>{errors.e8}</p> : null}
            <br/>
            <label>Life Span: </label>
            <input type="text" onChange={handleChange} name="life_span"/>
            <br/>{errors.e6}
            {errors.e8 ? <p>{errors.e8}</p> : null}
            <br/>
            
            <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default Form;