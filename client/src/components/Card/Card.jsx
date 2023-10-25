import './Card.css'
import React from 'react';
import { Link } from 'react-router-dom';

function Card({ dog, id = dog.id }) {
    //console.log(country);

  return (
    <div className="div">

      <div className='name'>
      <h2>{dog.name}</h2>
      </div>

      <br/>
      <div className='image'>
      <Link to={`/detail/${id}`}>
      <img src={`https://cdn2.thedogapi.com/images/${dog?.reference_image_id}.jpg`} alt={dog.name} />
      </Link>

      </div>
      <div className='cont'>
      <p>{dog.temperament}</p>
      <p>Weight: {dog.weight.metric}</p>
      </div>

    </div>
  );
};

export default Card;

