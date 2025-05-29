import Dashboard from './components/Dashboard';
import HistoricalData from './components/HistoricalData';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/auth/Register';
import LoginForm from './components/auth/Login';
import Profile from './components/auth/Profile';
import Home from './components/Home';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/register" element={<RegisterForm />} />
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/historical" element={<HistoricalData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 