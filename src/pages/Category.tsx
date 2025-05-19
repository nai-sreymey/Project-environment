import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PlantSection from '../components/Category';

const Category = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <Header />
      <HeroSection />
      <PlantSection />
    </div>
  );
};

export default Category;
