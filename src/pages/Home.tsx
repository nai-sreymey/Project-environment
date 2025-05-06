import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import CategoryList from "../components/CategoryList";

const Home = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <Header />
      <HeroSection />
      <CategoryList />
    </div>
  );
};

export default Home;
