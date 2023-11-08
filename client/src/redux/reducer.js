const initialState = {
    filterDogs: [],
    dogs: [],
    newDog: {},
    temperaments: [],
    dataSource: "API"
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "FILTER":
            return {
                ...state,
                dogs: action.payload,
            };          

        case "ORDER":
            const allDogsCopy = [...state.dogs]
            return {
                ...state,
                dogs: action.payload === "A" 
                ? allDogsCopy.sort((a,b)=>{
                    if(a.name > b.name) return -1;
                    if(b.name > a.name) return 1;
                    return 0;
                })
                : allDogsCopy.sort((a,b)=>{
                    if(a.name > b.name) return 1;
                    if(b.name > a.name) return -1;
                    return 0;
                })
            };

        case "ORDER_WEIGHT":
            const dogsWeightCopy = [...state.dogs];
            return {
                ...state,
                dogs: action.payload === "A"
                ? dogsWeightCopy.sort((a, b) => {
                    const weightA = parseInt(a.weight.metric.split(" - ")[0]);
                    const weightB = parseInt(b.weight.metric.split(" - ")[0]);
                    return weightA - weightB;
                })
                : dogsWeightCopy.sort((a, b) => {
                    const weightA = parseInt(a.weight.metric.split(" - ")[0]);
                    const weightB = parseInt(b.weight.metric.split(" - ")[0]);
                    return weightB - weightA;
                 })
            };

        case "ADD_DOG":
            return {
                ...state,
                newDog: action.payload
            };

        case "SET_DOGS":
            return {
                ...state,
                filterDogs: action.payload,
                dogs: action.payload
            };

        case "CHANGE_DATA_SOURCE":
            return {
                ...state,
                dataSource: action.payload,
            };

        default:
            return {...state}
    };
};

export default reducer;