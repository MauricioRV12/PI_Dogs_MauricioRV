import './App.css';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Form from './components/Form/Form';
import Detail from './components/Detail/Detail';

const App = () => {
  const [dogs, setDogs] = useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:3001/dogs')
      .then((response) => {
        const data = response.data;
        setDogs(data); 
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  return(
    <div>
      <Nav/>

      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home dogs={dogs}/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/detail/:name' element={<Detail/>}/>
      </Routes>
    </div>
  )
};

export default App;