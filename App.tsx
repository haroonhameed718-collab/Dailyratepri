/**
 * App
 * ---
 * Root component. Renders the persistent Navbar, Footer, background
 * decor, and routes to the correct page based on the URL hash.
 * Includes the /admin route for the Admin Dashboard.
 */

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundDecor from './components/BackgroundDecor';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Disclaimer from './pages/Disclaimer';
import ContactUs from './pages/ContactUs';
import AdminDashboard from './pages/AdminDashboard';
import EMICalculator from './pages/EMICalculator';
import SIPCalculator from './pages/SIPCalculator';
import CompoundInterestCalculator from './pages/CompoundInterestCalculator';
import CurrencyConverter from './pages/CurrencyConverter';
import DiscountCalculator from './pages/DiscountCalculator';
import AboutUs from './pages/AboutUs';
import { useHashRoute } from './hooks/useHashRoute';

export default function App() {
  const route = useHashRoute();

  const renderPage = () => {
    switch (route) {
      case '/':
        return <Home />;
      case '/emi':
        return <EMICalculator />;
      case '/sip':
        return <SIPCalculator />;
      case '/compound-interest':
        return <CompoundInterestCalculator />;
      case '/currency-converter':
        return <CurrencyConverter />;
      case '/discount':
        return <DiscountCalculator />;
      case '/about-us':
        return <AboutUs />;
      case '/privacy-policy':
        return <PrivacyPolicy />;
      case '/terms-of-service':
        return <TermsOfService />;
      case '/disclaimer':
        return <Disclaimer />;
      case '/contact-us':
        return <ContactUs />;
      case '/admin':
        return <AdminDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <BackgroundDecor />
      <Navbar />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
}
