import { useState } from 'react'
import './App.css'
import HeroSection from './component/Hero'
import AboutSection from './component/About'
import FeaturesSection from './component/WhyChooseUs'
import WorkingHours from './component/Reservation'
import FoodShowcase from './component/GrandSection'
import Navbar from './component/Navbar'
import Footer from './component/Footer'

function App() {

  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <WorkingHours />
      <FoodShowcase />
      <Footer />
    </>
  )
}

export default App
