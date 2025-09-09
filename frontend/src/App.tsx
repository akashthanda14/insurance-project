import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Insurance from './pages/Insurance';
import QuoteForm from './components/QuoteForm';
import ApplicantDetailsForm from './components/ApplicantDetailsForm';
import {PremiumOptions} from './components/PremiumOptions';
import PolicyPurchase from './components/PolicyPurchase';
import PremiumOptions2 from './components/PremiumOptions2';
import ScrollToTop from "./components/ScrollToTop";
import InvestmentProducts from './components/Investment';
import { Contact } from 'lucide-react';
import ContactForm from './components/ContactUs';
import HealthDentalInfo from './components/HealthDentalInfo';
import LifeInsuranceInfo from './components/LifeInsuranceInfo';
import TravelInsuranceInfo from './components/TravelInsuranceInfo';
import { InsuranceOptions } from './components/SelectInsurance';
import RRSPCalculator from './components/RRSPCalculator';
import { TFSACalculator } from './components/TFSACalculator';
import FSHACalculator from './components/FSHACalculator';
import RESPCalculator from './components/RESPCalculator';
import SavingsRetirementCalculators from './components/SavingsRetirementCalculators';
import LifeTermInsuranceQuote from './components/LifeTermInsuranceQuote';
import ComingSoonWrapper from './components/ComingSoonWrapper';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally position Navbar absolute on home page */}
      <div className={isHomePage ? 'absolute top-0 left-0 right-0 z-50' : 'relative'}>
        <Navbar />
      </div>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/PremiumOptions" element={ <PremiumOptions />}/>
          <Route path="/PremiumOptions2" element={ <PremiumOptions2 />}/>
          <Route path="Investment" element={<InvestmentProducts/>}/>
          <Route path="/PolicyPurchase" element={<PolicyPurchase/>} />
          <Route path="contact" element={<ContactForm/>}/>
          <Route path="/healthDentalinfo" element={<HealthDentalInfo/>} />
          <Route path="/lifeinfo" element={<LifeInsuranceInfo/>} />
          <Route path="/travelinsuranceinfo" element={<TravelInsuranceInfo/>} />
          <Route path="/Quoteform" element={<QuoteForm/>}/>
          <Route path="/Applicantform" element={<ApplicantDetailsForm/>}/>
          <Route path="/InsuranceOptions" element={<InsuranceOptions/>}/>
          <Route path="/RRSPCalculator" element={<RRSPCalculator/>}/>
          <Route path="/TFSACalculator" element={<TFSACalculator/>}/>
          <Route path="/FSHACalculator" element={<FSHACalculator/>}/>
          <Route path="/RESPCalculator" element={<RESPCalculator/>}/>
          <Route path="/SavingsRetirementCalculators" element={<SavingsRetirementCalculators/>}/>
          <Route path="/LifeTermInsuranceQuote" element={<LifeTermInsuranceQuote/>}/>
          <Route path="/coming-soon" element={<ComingSoonWrapper />}/>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
       <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
