import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from './components/Home';
import Login from './components/Login';
import Employee from './components/Employee';
import SearchResults from './components/SearchResults';

import { AuthProvider } from './hooks/AuthContext';
import './App.css'

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/enterprise" element={<Home />} />
            <Route path="/employee/:name" element={<Employee />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
