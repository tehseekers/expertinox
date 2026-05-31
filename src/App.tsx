import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: '#0A0F1E' }}>
      <Navbar />
      <HomePage />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
