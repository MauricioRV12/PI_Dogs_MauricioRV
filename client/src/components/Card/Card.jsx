import './Card.css'
import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ dog, id = dog.id }) => {

  return (
    <div className="div">

      <div className='name'>
      <h2>{dog.name}</h2>
      </div>

      <br/>
      <div >
      <Link to={`/detail/${id}`}>
      <img src={dog.image.url || dog.image} alt={dog.name} className='image' />
      </Link>
      </div>

      <div className='cont'>
      <p>Temperament: <br/> {dog.temperament}</p>
      <p>Weight: {typeof dog.weight === 'object' ? dog.weight.metric : dog.weight} {'kg'}</p>
      </div>

    </div>
  );
};

export default Card;

