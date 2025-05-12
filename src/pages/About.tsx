import React, { useState } from 'react';
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
    <div className={`rounded-2xl bg-white/80 backdrop-blur p-6 shadow-xl transition-transform hover:scale-105 duration-300 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-2">{children}</div>;
};

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState<string>('when');

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const sections = [
    {
      id: 'when',
      title: 'When',
      desc: 'We started our journey in 2022 with a simple but powerful dream. Our vision was to create a world where environmental sustainability and social impact are at the heart of every community. With a small team and a big idea, we took the first step towards building a better future for our planet. Over time, our passion for preserving nature grew stronger, and we started to partner with like-minded organizations to amplify our impact and reach more people in need of support.',
      img: '/images/trees.png',
    },
    {
      id: 'education',
      title: 'Education',
      desc: 'Education is at the heart of our mission. We believe that by educating communities about the importance of environmental protection and sustainability, we can empower individuals to take action and make a lasting difference. Our educational programs provide the knowledge and tools needed to understand the challenges of climate change, waste management, and biodiversity conservation. By working with schools, universities, and community groups, we aim to inspire the next generation of environmental leaders and advocates.',
      img: '/images/mey.png',
    },
    {
      id: 'partner',
      title: 'Partner',
      desc: 'We are proud to work with schools, NGOs, and other organizations that share our vision for a greener and more sustainable world. Through these partnerships, we are able to collaborate on various projects such as tree planting, waste cleanup, and environmental education. Together, we are building a global network of environmental advocates who are united in their efforts to protect and restore the Earth. These partnerships allow us to expand our reach, leverage resources, and create a greater impact.',
      img: '/images/trees.png',
    },
    {
      id: 'friend',
      title: 'Friend',
      desc: 'To us, everyone who joins or supports our cause is a friend. Whether it’s a community member participating in a cleanup, a volunteer helping us organize an event, or a donor contributing to our initiatives, we value each and every individual who believes in our mission. We consider our supporters an integral part of our journey, and together, we are making positive changes that will benefit both people and the planet. Our goal is to build a community where people from all walks of life can come together and work towards common goals.',
      img: '/images/trees.png',
    },
    {
      id: 'why',
      title: 'Why',
      desc: 'We do this because the Earth is our only home, and its future is at risk. With increasing pollution, deforestation, and climate change, we believe that urgent action is needed to protect the environment for future generations. Our mission is to raise awareness about these issues and inspire people to take action, whether through small changes in their daily lives or by supporting larger environmental initiatives. We want to create a world where sustainability is not just a buzzword, but a way of life for everyone.',
      img: '/images/trees.png',
    },
    {
      id: 'what',
      title: 'What',
      desc: 'We organize community cleanups, plant trees, and promote sustainable practices in everyday life. Our initiatives include reducing waste, increasing recycling efforts, and educating people about the benefits of renewable energy sources. We also host workshops and awareness campaigns to engage communities and encourage them to adopt greener practices. From organizing local cleanup drives to large-scale tree planting events, our work is focused on creating a tangible, positive impact on the environment and the communities we serve.',
      img: '/images/trees.png',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-green-200 to-green-300 text-center">
      {/* Top Header and Hero Section */}
      <Header />
      <HeroSection />

      {/* Sticky Menu Buttons */}
      <section className="bg-green-100 sticky top-20 z-40 shadow-sm py-4">
        <div className="flex flex-wrap justify-center gap-4 px-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-4 py-2 rounded-full shadow-md font-semibold transition duration-300 ${
                activeSection === section.id
                  ? 'bg-green-700 text-white'
                  : 'bg-white text-green-700 hover:bg-green-500 hover:text-white'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </section>

      {/* Section content */}
      <section className="max-w-5xl mx-auto px-4 space-y-16 py-10">
        {sections.map((section) => (
          <div id={section.id} key={section.id} className="flex flex-col md:flex-row items-center gap-8 scroll-mt-28">
            <img
              src={section.img}
              alt={section.title}
              className="w-full md:w-1/3 h-60 object-cover rounded-2xl shadow-lg"
            />
            <Card className="md:w-2/3 text-left">
              <h3 className="text-3xl font-bold text-green-800 mb-2">{section.title}</h3>
              <CardContent>
                <p className="text-gray-700 text-lg">{section.desc}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-green-700 py-6 text-white text-center mt-10">
        <p>2025 © EcoShare. Created by <span className="font-bold">Nai Sreymey & Phorn Sreyphea</span></p>
      </footer>
    </div>
  );
};

export default AboutUs;
