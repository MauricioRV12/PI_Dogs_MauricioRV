// import './Home.css';
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { filterCards, orderByName, fetchDogs, orderByWeight } from '../../redux/actions';
// import Card from '../Card/Card';
// import axios from 'axios';

// const Home = () => {
//   const dogsPerPage = 8;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [temperaments, setTemperaments] = useState([]);

//   const dispatch = useDispatch();
//   const dogs = useSelector((state) => state.dogs);
    
//     useEffect(() => {
//         dispatch(fetchDogs());
//     }, [dispatch]);

//     useEffect(() => {
//         axios.get('http://localhost:3001/temperaments')
//           .then(response => {
//           setTemperaments(response.data);
//           //console.log(response.data);
//         })
//           .catch(error => {
//           console.error('Error fetching temperaments:', error);
//         });
//      }, []);

//   const handleFilter = (event) => {
//     const temp = event.target.value;
//     dispatch(filterCards(temp));
//   };

//   const handleOrderName = (event) => {
//     const nameOrder = event.target.value;
//     dispatch(orderByName(nameOrder));
//   };

//   const handleOrder = (event) => {
//     const type = event.target.value;
//     dispatch(orderByWeight(type));
//   };

//   const paginatedDogs = dogs.slice(
//     (currentPage - 1) * dogsPerPage,
//     currentPage * dogsPerPage
//   );

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <div>
//       <div>

//       <select onChange={handleFilter} className='Order'>
//            <option value="">Temperaments</option>
//            {temperaments.map((temperament, index) => (
//             <option key={index} value={temperament}>
//               {temperament}
//             </option>
//           ))}
//         </select>

//         <select onChange={handleOrderName} className='Order'>
//           <option>Order</option>
//           <option value="A">Z-A</option>
//           <option value="B">A-Z</option>
//         </select>

//         <select onChange={handleOrder} className='Order'>
//           <option>Weight</option>
//           <option value="A">Less (-)</option>
//           <option value="B">More (+)</option>
//         </select>
//       </div>

//       <div>
//         {paginatedDogs.map((dog) => {
//             if (dog && dog.id) {
//                 return <Card key={dog.id} dog={dog} />;
//               } else {
//                   return null; // Evitar renderizar perros sin id definido
//                 }
//               })}
//             </div>
      
//             <div className="Ca">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
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
//       </div>
//     </div>
//   );
// };

// export default Home;




// import './Home.css';
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { filterCards, orderByName, fetchDogs, orderByWeight, changeDataSource } from '../../redux/actions';
// import Card from '../Card/Card';
// import axios from 'axios';

// const Home = () => {
//   const dogsPerPage = 8;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [temperaments, setTemperaments] = useState([]);
//   const [selectedDataSource, setSelectedDataSource] = useState("API"); // Inicializado en "API" por defecto

//   const dispatch = useDispatch();
//   const dogs = useSelector((state) => state.dogs);
    
//   useEffect(() => {
//       dispatch(fetchDogs());
//   }, [dispatch]);

//   useEffect(() => {
//       axios.get('http://localhost:3001/temperaments')
//         .then(response => {
//         setTemperaments(response.data);
//       })
//         .catch(error => {
//         console.error('Error fetching temperaments:', error);
//       });
//   }, []);

//   const handleFilter = (event) => {
//     const temp = event.target.value;
//     dispatch(filterCards(temp));
//   };

//   const handleOrderName = (event) => {
//     const nameOrder = event.target.value;
//     dispatch(orderByName(nameOrder));
//   };

//   const handleOrder = (event) => {
//     const type = event.target.value;
//     dispatch(orderByWeight(type));
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleDataSourceChange = (event) => {
//     const source = event.target.value;
//     setSelectedDataSource(source);
//     dispatch(changeDataSource(source));
//   };
  
//   const paginatedDogs = dogs.slice(
//     (currentPage - 1) * dogsPerPage,
//     currentPage * dogsPerPage
//   );

//   return (
//     <div>
//       <div>
//         <select
//           value={selectedDataSource}
//           onChange={handleDataSourceChange}
//           className="Order"
//         >
//           <option value="API">API</option>
//           <option value="DB">DB</option>
//         </select>

//         <select onChange={handleFilter} className='Order'>
//           <option value="">Temperaments</option>
//           {temperaments.map((temperament, index) => (
//             <option key={index} value={temperament}>
//               {temperament}
//             </option>
//           ))}
//         </select>

//         <select onChange={handleOrderName} className='Order'>
//           <option>Order</option>
//           <option value="A">Z-A</option>
//           <option value="B">A-Z</option>
//         </select>

//         <select onChange={handleOrder} className='Order'>
//           <option>Weight</option>
//           <option value="A">Less (-)</option>
//           <option value="B">More (+)</option>
//         </select>
//       </div>

//       <div>
//         {paginatedDogs.map((dog) => {
//             if (dog && dog.id) {
//                 return <Card key={dog.id} dog={dog} />;
//               } else {
//                   return null;
//                 }
//               })}
//             </div>
      
//             <div className="Ca">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 Previous page
//               </button>
//               <span className='page'>
//                 Page {currentPage} 
//               </span>
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage * dogsPerPage >= dogs.length}
//               >
//                 Next page
//               </button>
//             </div>
//           </div>
//         );
//       };
      
//       export default Home;



import './Home.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterCards, orderByName, fetchDogs, orderByWeight, changeDataSource } from '../../redux/actions';
import Card from '../Card/Card';
import axios from 'axios';
import Filters from '../Filters/Filters'; // Importa el componente de filtros

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
