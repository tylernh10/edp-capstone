import { Link } from "react-router-dom";
import './Navigation.css';
import { useAuth } from "../hooks/AuthContext";

const Navigation = () => {
    const auth = useAuth();
    
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
            <Link to="/employee" onClick={auth?.logout} style={{ margin: 0}}>
                <div className="nav-link-text">Logout</div>
            </Link>
        </div>
    );
};

export default Navigation;