import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen relative">
      {/* Decorative SVG shapes background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Top left decorative element */}
        <svg
          className="absolute top-0 left-0 w-64 h-64 text-rose-300 opacity-20"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M20,20 Q40,5 50,30 T80,30 Q95,50 70,60 T60,90 Q40,95 30,70 T5,60 Q0,40 20,20 Z" />
        </svg>
        
        {/* Bottom right decorative element */}
        <svg
          className="absolute bottom-0 right-0 w-80 h-80 text-rose-200 opacity-25"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <circle cx="50" cy="50" r="45" />
          <path d="M30,30 Q50,10 70,30 T90,70 Q70,90 50,70 T30,30 Z" fill="white" opacity="0.3" />
        </svg>
        
        {/* Center floating element */}
        <svg
          className="absolute top-1/3 left-1/4 w-32 h-32 text-rose-400 opacity-15 animate-pulse"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <polygon points="50,5 85,50 50,95 15,50" />
        </svg>
        
        {/* Mid-right decorative element */}
        <svg
          className="absolute top-2/3 right-10 w-40 h-40 text-rose-300 opacity-20"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M20,20 Q40,5 60,20 T80,50 Q95,70 80,80 T50,95 Q30,90 20,70 T5,50 Q0,30 20,20 Z" />
        </svg>
        
        {/* Bottom left decorative element */}
        <svg
          className="absolute bottom-20 left-10 w-48 h-48 text-rose-200 opacity-20"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <circle cx="50" cy="50" r="40" />
          <circle cx="40" cy="40" r="20" fill="white" opacity="0.3" />
        </svg>
      </div>
      
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;