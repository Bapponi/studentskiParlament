import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import News from './pages/news/News';
import Members from './pages/members/Members';
import Materials from './pages/materials/Materials';
import Links from './pages/links/Links';
import AdminPanel from './pages/admin-panel/AdminPanel';
import Login from './pages/login/Login';
import OneNews from './pages/news/OneNews';
import { AuthProvider } from './AuthContext';
import NewPassword from './pages/login/NewPassword';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar/>
          <main>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/news" element={<News/>} />
              <Route path="/news/:id" element={<OneNews/>} />
              <Route path="/one-news" element={<OneNews/>} />
              <Route path="/members" element={<Members/>} />
              <Route path="/materials" element={<Materials/>} />
              <Route path="/links" element={<Links/>} />
              <Route path="/user-panel" element={<AdminPanel/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/new-password" element={<NewPassword/>} />
            </Routes>
          </main>
          <Footer/>
        </div>
      </Router>
    </AuthProvider>
    
  );
}

export default App;
