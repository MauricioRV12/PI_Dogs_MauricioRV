import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`;

export const filterCards = (temperament) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/tempdogs/temperament?temperament=${temperament}`);
      console.log(data);

      dispatch({
        type: "FILTER",
        payload: data,
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

export const fetchDogs = ( limit = 265, filterDogs) => {
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

export const changeDataSource = (source) => {
  return (dispatch) => {
    if (source === 'API') {
      axios.get(apiUrl)
      .then((response) => {
        dispatch({ type: 'SET_DOGS', payload: response.data });
      })
        .catch((error) => {
          console.error('Error fetching data from API:', error);
        });
      } else if (source === 'DB') {
        axios.get('http://localhost:3001/dogsdb')
        .then((response) => {
          console.log(response);
          dispatch({ type: 'SET_DOGS', payload: response.data });
        })
        .catch((error) => {
          console.error('Error fetching data from DB:', error);
        });
    }
    dispatch({ type: 'SET_DATA_SOURCE', payload: source });
  };
};

