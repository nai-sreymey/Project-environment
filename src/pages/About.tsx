import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';

export const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`rounded-xl bg-white p-4 shadow-md ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-2">{children}</div>;
};

const AboutUs = () => {
  return (
    <div className="bg-green-100 min-h-screen text-center">
      <Header />
      <HeroSection
        title="About Us"
      />

      <section className="py-8">
        <h2 className="text-3xl font-bold text-black">Welcome to about us</h2>
        <p className="text-green-700 text-lg mt-2">
        </p>

        <div className="flex justify-center gap-6 text-lg font-bold text-black mt-10">
          <span className="px-4 py-2 rounded shadow">When</span>
          <span className="px-4 py-2 rounded shadow">Education</span>
          <span className="px-4 py-2 rounded shadow">Partner</span>
          <span className="px-4 py-2 rounded shadow">Friend</span>
          <span className="px-4 py-2 rounded shadow">Why</span>
          <span className="px-4 py-2 rounded shadow">What</span>
        </div>

        <div className="max-w-4xl mx-auto mt-10 space-y-10 px-4">
          <Card className="flex items-center gap-6">
            <img
              src="/images/mey.png"
              alt="Eco Club"
              className="w-40 h-40 object-cover rounded-xl"
            />
            <CardContent>
              <h3 className="text-2xl font-bold text-green-800 flex items-center">
                🌿 Eco Club
              </h3>
              <p className="mt-2 text-gray-700">
                The Eco Club at PSE was created in 2022 to teach students how
                to protect the environment. It helps students learn about saving
                water, recycling, planting trees, and reducing waste. The club
                was started to make PSE and Cambodia cleaner and greener.
              </p>
            </CardContent>
          </Card>

          <Card className="flex items-center gap-6">
            <img
              src="/images/mey.png"
              alt="Partner PSE"
              className="w-40 h-40 object-cover rounded-xl"
            />
            <CardContent>
              <h3 className="text-2xl font-bold text-green-800 flex items-center">
                Partner PSE
              </h3>
              <p className="mt-2 text-gray-700">
                The Eco Club at PSE was created in 2022 to teach students how
                to protect the environment. It helps students learn about saving
                water, recycling, planting trees, and reducing waste. The club
                was started to make PSE and Cambodia cleaner and greener.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
