import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";

import Home from './components/Home';
import Login from './components/Login';
import Employee from './components/Employee';
import SearchResults from './components/SearchResults';

import { AuthProvider } from './hooks/AuthContext';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/enterprise" element={<Home />} />
            <Route path="/employee/:name" element={<Employee />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
