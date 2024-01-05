import './App.css';
import Login from './pages/Login/Login';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Projects from './pages/Project/Projects';
import Corporate from './pages/Corporate/Corporate';
import PackageData from './components/PackageData/PackageData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/corporate' element={<Corporate />} />
        <Route path='/package-data' element={<PackageData />} />
      </Routes>

    </Router>


  );
}

export default App;
