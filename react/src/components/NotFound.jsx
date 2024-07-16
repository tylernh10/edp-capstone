import { Link } from 'react-router-dom';

import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import City from "./City";
import './Employee.css'

const NotFound = () => {
    return (
        <div className="home-container">
            <Navigation />
            <div className="center-container">
                <h2>404 - Page Not Found</h2>
                <button className='btn-primary'><Link className="button-link" to="/">Home</Link></button>
            </div>
            <City />
        </div>
    )
}

export default NotFound;