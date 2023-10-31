// import './SearchBar.css';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const SearchBar = () => {
//     const [name, setName] = useState('');
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const apiUrl = `http://localhost:3001/dogs/name?name=${name}`;

//   const handleChange = (event) => {
//     setName(event.target.value);
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (name.trim() === '') {
//       setError('Please enter a valid Dog name.');
//     } else {
//       setError(null);

//       try {
//         await axios.get(apiUrl);
//         navigate(`/detail/${name}`);
//       } catch (error) {
//         setError('The Dog does not exist.');
//       }
//     }
//   }

//   return (
//     <div className='Bar'>
//       {error && <div className="error-message">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <input type='text' placeholder='What are you looking for?' value={name} onChange={handleChange} />
//         <button type="submit">Search</button>
//       </form>
//     </div>
//   )
// };

// export default SearchBar;

import './SearchBar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name.trim() === '') {
      setError('Please enter a valid Dog name.');
    } else {
      setError(null);

      try {
        const response = await axios.get(`http://localhost:3001/dogs/name?name=${name}`);
        const matchingDogs = response.data;

        if (matchingDogs.length === 1) {
          // Si hay una sola coincidencia, navegar a la página de detalle
          navigate(`/detail/${matchingDogs[0].id}`);
        } else if (matchingDogs.length > 0) {
          // Si hay varias coincidencias, mostrar resultados
          setSearchResults(matchingDogs);
        } else {
          setError('No dogs found.');
        }
      } catch (error) {
        setError('No dogs found with that name or coincidences.');
      }
    }
  };

  return (
    <div className='Bar'>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='What are you looking for?' value={name} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <a href={`/detail/${result.id}`}>{result.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;


