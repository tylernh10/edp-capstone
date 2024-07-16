import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from './components/Home';
import Login from './components/Login';
import Employee from './components/Employee';
import SearchResults from './components/SearchResults';
import Predictor from "./components/Predictor";

import RequireAuth from './components/RequireAuth'
import { AuthProvider, useAuth } from './hooks/AuthContext';
import './App.css'

function App() {
  const auth = useAuth();
  
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path={`/employee/:id`} element={<RequireAuth><Employee /></RequireAuth>} />
            <Route path="/search" element={<RequireAuth><SearchResults /></RequireAuth>} />
            <Route path="/predictor" element={<RequireAuth><Predictor /></RequireAuth>} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App;