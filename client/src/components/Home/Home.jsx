// import './Home.css';
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { filterCards, orderByName, fetchDogs, orderByWeight } from '../../redux/actions';
// import Card from '../Card/Card';

// const Home = () => {
//   const dogsPerPage = 8;
//   const [currentPage, setCurrentPage] = useState(1);
//   //console.log(currentPage);

//   const dispatch = useDispatch();
//   const dogs = useSelector((state) => state.dogs);
//   console.log(dogs);
  
  
//   useEffect(() => {
//     dispatch(fetchDogs(1,8));
//   }, [dispatch]);
  
//   const handleFilter = (event) => {
//     const type = event.target.value;
//     dispatch(filterCards(type));
//   };

//   const handleOrderName = (event) => {
//     const nameOrder = event.target.value;
//     dispatch(orderByName(nameOrder));
//   };

//   /************************************************************************************************************* */

//   const handleOrder = (event) => {
//     const type = event.target.value;
//     dispatch(orderByWeight(type));
//   };
//   /*************************************************************************************************************** */

//   useEffect(() => {
//     dispatch(fetchDogs());
//   }, [dispatch]);

//   const paginatedDogs = dogs.slice(
//     (currentPage - 1) * dogsPerPage,
//     currentPage * dogsPerPage
//   );
//   //console.log(paginatedDogs);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <div>
//       <div>
//         <select onChange={handleFilter} className='Order'>
//           <option>Dog Temperaments</option>

          

//         </select>

//         <select onChange={handleOrderName} className='Order'>
//           <option>Order</option>
//           <option value="A">Z-A</option>
//           <option value="B">A-Z</option>
//         </select>
      
//         <select onChange={handleOrder} className='Order'>
//           <option value="weight">Weight</option>
//           <option value="less">Less (-)</option>
//           <option value="more">More (+)</option>
//         </select>
//       </div>


//       <div>
//         {paginatedDogs.map((dog) => (
//           <Card key={dog.id} dog={dog} />
//         ))}
//       </div>

//       {/* Controles de paginación */}
//       <div className="Ca">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous page
//         </button>
//         <span className='page'>
//           Page {currentPage} 
//         </span>
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage * dogsPerPage >= dogs.length}
//         >
//           Next page
//         </button>
//         {/* Controles de paginación */}
//       </div>
//     </div>
//   );
// };

// export default Home;



import './Home.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterCards, orderByName, fetchDogs, orderByWeight } from '../../redux/actions';
import Card from '../Card/Card';
import axios from 'axios';

const Home = () => {
  const dogsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [temperaments, setTemperaments] = useState([]);

  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
    
    useEffect(() => {
        dispatch(fetchDogs());
    }, [dispatch]);
    
    useEffect(() => {
        axios.get('http://localhost:3001/temperaments')
        .then(response => {
            setTemperaments(response.data);
            console.log(temperaments);
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

  const paginatedDogs = dogs.slice(
    (currentPage - 1) * dogsPerPage,
    currentPage * dogsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div>

        <select onChange={handleFilter} className='Order'>
          <option value="">Dogs Temperaments</option>
          {temperaments.map((temperament, index) => (
            <option key={index} value={temperament}>
              {temperament}
            </option>
          ))}
        </select>

        <select onChange={handleOrderName} className='Order'>
          <option>Order</option>
          <option value="A">Z-A</option>
          <option value="B">A-Z</option>
        </select>

        <select onChange={handleOrder} className='Order'>
          <option>Weight</option>
          <option value="A">Less (-)</option>
          <option value="B">More (+)</option>
        </select>
      </div>

      <div>
        {paginatedDogs.map((dog) => (
            // console.log(dog),
          <Card key={dog.id} dog={dog} />
        ))}
      </div>

      {/* <div>
        {paginatedDogs
        .filter((dog) => dog && dog.id)
        .map((dog) => (
        <Card key={dog.id} dog={dog} />
        ))}
      </div> */}


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
