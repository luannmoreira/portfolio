import './App.css';
import {useEffect} from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Habilidades from './components/Habilidades'
import Experiencia from './components/Experiencia';
import Certs from './components/Certs';
import Footer from './components/Footer';
import Contact from './components/Contact'
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
    useEffect(() => {
      document.title = 'Luann Curioso';
      AOS.init();
    }, []);
  return (
    <div className="w-100 px-6 lg:px-20 xl:px-36 bg-dark-500">
      <Navbar />
      <Hero />
      <About />
      <Habilidades />
      <Experiencia />
      <Certs />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
