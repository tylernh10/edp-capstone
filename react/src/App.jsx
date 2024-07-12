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

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
