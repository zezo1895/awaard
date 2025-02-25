import React from 'react';
import Hero from './components/hero';
import "./index.css";
import About from './components/about';
import Navbar from './components/Navbar';
import Features from './components/Features';
import Story from './components/story';
import Contact from './components/contact';
import Footer from './components/footer';


const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Navbar/>
      <Hero />
      <About/>
      <Features/>
      <Story/>
      <Contact/>
      <Footer/>
    </main>
  );
}

export default App;