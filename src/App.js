import './App.css';
import {useEffect} from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Habilidades from './components/Habilidades'
import Experiencia from './components/Experiencia';
import Certs from './components/Certs';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
    useEffect(() => {
      document.title = 'Luann Curioso';
      AOS.init();
    }, []);
  return (
    <div className="px-6 lg:px-20 xl:px-36 bg-dark-500">
      <Navbar />
      <Hero />
      <Habilidades />
      <Experiencia />
      <Certs />
      <Footer />
    </div>
  );
}

export default App;
