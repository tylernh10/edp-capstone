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

import { AuthProvider } from './hooks/AuthContext';
import './App.css'
import RequireAuth from './components/RequireAuth'

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/employee" element={<RequireAuth><Employee /></RequireAuth>} />
            <Route path="/search" element={<RequireAuth><SearchResults /></RequireAuth>} />
            <Route path="/predictor" element={<RequireAuth><Predictor /></RequireAuth>} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
