import { Link } from "react-router-dom";
import './Navigation.css';

const Navigation = () => {
    return (
        <div className="navigation-links">
            <Link to="/enterprise">
                <div className="nav-link-text">Home</div>
            </Link>
            <Link to="/predictor">
                <div className="nav-link-text">Predictor</div>
            </Link>
            <Link to="/employee" style={{ marginLeft: 'auto' }}>
                <div className="nav-link-text">Profile</div>
            </Link>
        </div>
    );
};

export default Navigation;