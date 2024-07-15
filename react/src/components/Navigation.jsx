import { Link } from "react-router-dom";
import './Navigation.css';

const Navigation = () => {
    return (
        <div className="navigation-links">
            <Link to="/">
                <div className="nav-link-text">Search</div>
            </Link>
            <Link to="/predictor">
                <div className="nav-link-text">Salary Predictor</div>
            </Link>
            <Link to="/employee" style={{ marginLeft: 'auto' }}>
                <div className="nav-link-text">Profile</div>
            </Link>
        </div>
    );
};

export default Navigation;