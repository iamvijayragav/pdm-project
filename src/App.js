import './App.css';
import Login from './pages/Login/Login';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Project from './pages/Project/Projects';
import Corporate from './pages/Corporate/Corporate';
import PackageData from './components/PackageData/PackageData';

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/project' element={<Project />} />
        <Route path='/corporate' element={<Corporate />} />
        <Route path='/package-data' element={<PackageData />} />
      </Routes>

      </Router>
      </div>


  );
}

export default App;
