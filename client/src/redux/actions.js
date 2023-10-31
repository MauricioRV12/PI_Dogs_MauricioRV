import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`;

export const filterCards = () => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(apiUrl);
        console.log(data);
        const dogOfType = data.map((dogData) => dogData.temperament);
        const filtDogs = dogOfType.filter((temp)=>temp.temperament)
        console.log(dogOfType);
  
        dispatch({
          type: "FILTER",
          payload: dogOfType,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };


export const orderByName = (name) => {
    return {
        type: "ORDER",
        payload: name
    }
};

export const orderByWeight = (weight) => {
    return {
        type: "ORDER_WEIGHT",
        payload: weight
    }
};

export const addDog = (newDog) => {
    return async (dispatch) => {
      try {
        const response = await axios.post('http://localhost:3001/dogs', newDog);
          if(response.status === 200){
            dispatch({
              type: "ADD_DOG",
              payload: newDog
          });
        }
      } catch (error) {
          console.error('Error adding new Dog:', error)
      }
    }
};

export const setDogs = (dogs) => {
    return {
        type: "SET_DOGS",
        payload: dogs
    }
};

export const fetchDogs = ( limit = 264, filterDogs) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`${apiUrl}&limit=${limit}`);
        //console.log(data);
        dispatch(setDogs(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  };

  /************************** */

export const changeDataSource = (source) => {
  return (dispatch) => {
    if (source === 'API') {
      // Realizar una solicitud HTTP a la API para obtener datos
      axios.get(apiUrl)
        .then((response) => {
          // Disparar una acción para actualizar el estado de Redux con los datos de la API
          dispatch({ type: 'SET_DOGS', payload: response.data });
        })
        .catch((error) => {
          // Manejar errores si la solicitud falla
          console.error('Error fetching data from API:', error);
        });
    } else if (source === 'DB') {
      // Realizar una solicitud HTTP a tu servidor para obtener datos de la base de datos
      axios.get('http://localhost:3001/dogsdb')
        .then((response) => {
          // Disparar una acción para actualizar el estado de Redux con los datos de la base de datos
          dispatch({ type: 'SET_DOGS', payload: response.data });
        })
        .catch((error) => {
          // Manejar errores si la solicitud falla
          console.error('Error fetching data from DB:', error);
        });
    }

    // Disparar una acción para actualizar el estado de Redux con la fuente de datos seleccionada
    dispatch({ type: 'SET_DATA_SOURCE', payload: source });
  };
};

