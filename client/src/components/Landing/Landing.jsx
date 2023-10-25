import './Landing.css';
import { NavLink } from "react-router-dom";

const Landing = () => {

    return (
        <div className='land'>
            <h1>Dogs</h1>
            <NavLink to='/home'>
            <button>Ingresar</button>
            </NavLink>
        </div>
    )
};

export default Landing;