import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`;

// export const filterCards = () => {
//     return async (dispatch) => {
//       try {
//         const { data } = await axios.get('http://localhost:3001/temperaments');
//         const dogOfType = data.temperament.map((dogData) => dogData.temperament);
  
//         dispatch({
//           type: "FILTER",
//           payload: dogOfType,
//         });
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//   };

export const filterCards = (temp) => {
    return async (dispatch) => {
      try {
        const response = await axios.get('http://localhost:3001/temperaments');
        if (response.data) {
          const dogOfType = response.data.map((dogData) => dogData.temperament);
    
          dispatch({
            type: "FILTER",
            payload: dogOfType,
          });
        } else {
          console.error('Response data is undefined.');
        }
      } catch (error) {
        console.error(error.message);
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

export const fetchDogs = ( limit = 264) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`${apiUrl}&limit=${limit}`);
        console.log(data);
        dispatch(setDogs(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  }
  