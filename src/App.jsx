import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageSkills from './pages/admin/ManageSkills';
import ManageExperience from './pages/admin/ManageExperience';
import ManageCertifications from './pages/admin/ManageCertifications';
import ManageAchievements from './pages/admin/ManageAchievements';
import ManageProfile from './pages/admin/ManageProfile';

function App() {
  return (
    <Router>
      <div className="bg-background w-full overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/projects" element={<ManageProjects />} />
          <Route path="/admin/skills" element={<ManageSkills />} />
          <Route path="/admin/experience" element={<ManageExperience />} />
          <Route path="/admin/certifications" element={<ManageCertifications />} />
          <Route path="/admin/achievements" element={<ManageAchievements />} />
          <Route path="/admin/profile" element={<ManageProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
