import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDog } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import validation from "../../../validation";

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

    const handleSubmit = (event) => {
        event.preventDefault();

        // Verificar si hay errores en el formulario
        if (Object.keys(errors).length === 0) {
            dispatch(addDog(addNewDog));
            setSuccessMessage("La nueva raza de perro fue creada correctamente");
        } else {
            setSuccessMessage("Falta información o hay campos inválidos");
        }
    };

    return (
        <div>
            {successMessage && <p>{successMessage}</p>}

            <form onSubmit={handleSubmit}>
            <label>Name: </label>
            <input type="text" onChange={handleChange} name="name"/>
            {errors.e1 ? (<p>{errors.e1}</p>) 
                : errors.e2 ? (<p>{errors.e2}</p>) 
                : (<p>{errors.e3}</p>)}
            
            <label>Height: </label>
            <input type="text" onChange={handleChange} name="height"/>
            <br/>{errors.e4}
            <br/>
            <label>Weight: </label>
            <input type="text" onChange={handleChange} name="weight"/>
            <br/>{errors.e5}
            <br/>
            <label>Life Span: </label>
            <input type="text" onChange={handleChange} name="life_span"/>
            <br/>{errors.e6}
            <br/>
            
            <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default Form;

// name
// height
// weight
// life_span