import React from 'react';

const HeroSection = ({
  title = "Welcome to",
  subtitle = "🌱 PSE EcoShare Platform! 🌿",
}: {
  title?: string;
  subtitle?: string;
}) => {
  return (
    <section
      className="text-center bg-cover bg-center bg-no-repeat h-[700px] flex flex-col justify-center items-center"
      style={{ backgroundImage: "url('/hero.png')" }}
    >
      <h1 className="text-6xl font-extrabold text-black drop-shadow mb-12 mt-14">
        {title}
      </h1>
      <p className="text-4xl text-green-700 font-semibold drop-shadow mb-16">
        {subtitle}
      </p>
    </section>
  );
};

export default HeroSection;
