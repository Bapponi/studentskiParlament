import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Kontakti';
import News from './pages/news/News';
import Members from './pages/members/Members';
import Materials from './pages/materials/Materials';
import Links from './pages/links/Links';
import Contact from './pages/contact/Contact';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/news" element={<News/>} />
            <Route path="/members" element={<Members/>} />
            <Route path="/materials" element={<Materials/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/links" element={<Links/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
