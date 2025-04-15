import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Insurance from './pages/Insurance';
import Dashboard from './pages/Dashboard';
import Partners from './pages/Partners';
import AutoInsurance from './pages/AutoInsursance';
import BusinessInsurance from './pages/BussinessInsurance';
import HomeInsurance from './pages/HomeInsurance';
import TenantsInsurance from './pages/TenantsInsurance';
import CondoInsurance from './pages/CondoInsurance';
import TravelInsurance from './pages/TravelInsurance';
import LifeInsurance from './pages/LifeInsurance';
import InsuranceSelection from './pages/Quote';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/insurance/auto" element={<AutoInsurance />} />
        <Route path="/insurance/business" element={<BusinessInsurance />} />
        <Route path="/insurance/home" element={<HomeInsurance />} />
        <Route path="/insurance/tenants" element={<TenantsInsurance />} />
        <Route path="/insurance/condo" element={<CondoInsurance />} />
        <Route path="/insurance/travel" element={<TravelInsurance />} />
        <Route path="/insurance/life" element={<LifeInsurance />} />
        <Route path="/InsuranceSelection" element={<InsuranceSelection/>}/>

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;