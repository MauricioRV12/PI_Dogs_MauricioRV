import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Nav = () => {

    const location = useLocation(); // condicional para visualizacion de la barra 
    const isFormPage = location.pathname === '/';

    if (isFormPage) {
        return null;
    };

    return (
        <div>
            <SearchBar/>

            <div>
                <NavLink to='/home' className='Nav'>
                    <button>Home</button>
                </NavLink>
                <NavLink to='/form' className='Nav'>
                    <button>Create Dog</button>
                </NavLink>
            </div>

        </div>
    )
};

export default Nav;