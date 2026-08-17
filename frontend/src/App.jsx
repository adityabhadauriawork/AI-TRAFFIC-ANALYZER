import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Trusted from "./components/Trusted";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Demo from "./components/Demo";
import Analytics from "./components/Analytics";
import Footer from "./components/Footer";

import AnimatedBackground from "./components/Background";

import Dashboard from "./pages/Dashboard";

function Home() {
  return (
    <>
      <AnimatedBackground />

      <Navbar />

      <Hero />

      <Trusted />

      <Features />

      <HowItWorks />

      <Demo />

      <Analytics />

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;