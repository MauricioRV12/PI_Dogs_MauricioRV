import './Detail.css'
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

const Detail = () => {
    const {name} = useParams();
    const apiUrl = `https://api.thedogapi.com/v1/breeds/${name}?api_key=${apiKey}`;
   // console.log(id);

    const [dog, setDog] = useState({});
    //console.log(dog);

    useEffect(() => {
        axios(apiUrl)
          .then(({ data }) => {
            console.log(data);
            if (data.name) {
              setDog(data);
            } else {
              window.alert('No hay razas de perro con ese ID');
            }
          })
          .catch(error => {
            console.error('Error en la solicitud HTTP:', error);
          });
      }, [name]);
      


    return (
        <div className="det">
            <img src={`https://cdn2.thedogapi.com/images/${dog?.reference_image_id}.jpg`} alt={dog.name}/>
            <div className="nam">
            <h3>Id: {dog.id}</h3>
            <h3>Name: {dog.name}</h3>
            <h3>Height: {dog.height && dog.height.metric}</h3>
            <h3>Weight: {dog.weight && dog.weight.metric}</h3>
            <h3>Temperament: {dog?.temperament && dog?.temperament}</h3>
            <h3>Life Span: {dog.life_span}</h3>
            </div>
        </div>
    )
};

export default Detail;