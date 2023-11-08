import './Home.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterCards, orderByName, fetchDogs, orderByWeight, changeDataSource } from '../../redux/actions';
import Card from '../Card/Card';
import axios from 'axios';
import Filters from '../Filters/Filters';

const Home = () => {
  const dogsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [temperaments, setTemperaments] = useState([]);
  const [selectedDataSource, setSelectedDataSource] = useState("API"); // Inicializado en "API" por defecto

  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(fetchDogs());
  }, [dispatch]);

  useEffect(() => {
    axios.get('http://localhost:3001/temperaments')
      .then(response => {
        setTemperaments(response.data);
      })
      .catch(error => {
        console.error('Error fetching temperaments:', error);
      });
  }, []);

  const handleFilter = (event) => {
    const temp = event.target.value;
    dispatch(filterCards(temp));
  };

  const handleOrderName = (event) => {
    const nameOrder = event.target.value;
    dispatch(orderByName(nameOrder));
  };

  const handleOrder = (event) => {
    const type = event.target.value;
    dispatch(orderByWeight(type));
  };

  const handleDataSourceChange = (event) => {
    const source = event.target.value;
    setSelectedDataSource(source);
    dispatch(changeDataSource(source));
  };
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  const paginatedDogs = dogs.slice(
    (currentPage - 1) * dogsPerPage,
    currentPage * dogsPerPage
  );

  return (
    <div>
      <Filters
        selectedDataSource={selectedDataSource}
        handleDataSourceChange={handleDataSourceChange}
        handleFilter={handleFilter}
        handleOrderName={handleOrderName}
        handleOrder={handleOrder}
        temperaments={temperaments}
      />

      <div>
        {paginatedDogs.map((dog) => {
          if (dog && dog.id) {
            return <Card key={dog.id} dog={dog} />;
          } else {
            return null;
          }
        })}
      </div>

      <div className="Ca">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous page
        </button>
        <span className='page'>
          Page {currentPage}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * dogsPerPage >= dogs.length}
        >
          Next page
        </button>
      </div>
    </div>
  );
};

export default Home;