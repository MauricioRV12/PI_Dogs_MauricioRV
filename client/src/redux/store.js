import { createStore, applyMiddleware, compose } from "redux";
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk'


const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
compose; // esta linea es para conectar con la extension

const store = createStore(
    reducer, 
    composeEnhacer(applyMiddleware(thunkMiddleware)) // esta linea nos permite hacer peticiones al servidor
)

export default store;