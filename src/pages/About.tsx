import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

const sections = [
  {
    id: 'glance',
    title: 'PSE At A Glance',
    desc: `We started our journey in 2022 with a simple but powerful dream. Our vision was to create a world where environmental sustainability and social impact are at the heart of every community. With a small team and a big idea, we took the first step towards building a better future for our planet. Over time, our passion for preserving nature grew stronger, and we started to partner with like-minded organizations to amplify our impact and reach more people in need of support.`,
    img: '/images/trees.png',
  },
  {
    id: 'education',
    title: 'Education',
    desc: `Education is at the heart of our mission. We believe that by educating communities about the importance of environmental protection and sustainability, we can empower individuals to take action and make a lasting difference. Our educational programs provide the knowledge and tools needed to understand the challenges of climate change, waste management, and biodiversity conservation.`,
    img: '/images/mey.png',
  },
  {
    id: 'action',
    title: 'Action',
    desc: `We work with schools, NGOs, and other organizations to collaborate on projects like tree planting, waste cleanup, and environmental education. Together, we build a global network united to protect and restore the Earth.`,
    img: '/images/trees.png',
  },
  {
    id: 'join',
    title: 'Join Us',
    desc: `Everyone who supports our cause is a friend. Volunteers, donors, community members — together, we make positive change benefiting people and the planet.`,
    img: '/images/trees.png',
  },
  {
    id: 'partnership',
    title: 'Partnership',
    desc: `The Earth is our only home. Facing pollution, deforestation, and climate change, we raise awareness and inspire action for a sustainable future.`,
    img: '/images/trees.png',
  },
  {
    id: 'event',
    title: 'Event',
    desc: `We organize cleanups, plant trees, promote sustainable practices, and host workshops to engage communities in green living.`,
    img: '/images/trees.png',
  },
];

const AboutUs = () => {
  const [activeId, setActiveId] = useState(sections[0].id);

  // Highlight active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      let current = sections[0].id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 150) current = section.id;
        }
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-green-100 text-gray-900 font-sans">
      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-12">
        {/* Sidebar navigation */}
        <nav className="md:w-1/4 sticky top-24 self-start">
          <ul className="space-y-4">
            {sections.map(({ id, title }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`
                    w-full text-left px-5 py-3 rounded-lg font-semibold transition
                    duration-300 ease-in-out transform
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                    ${
                      activeId === id
                        ? 'bg-green-700 text-white shadow-xl scale-105'
                        : 'text-green-800 hover:bg-green-200 hover:text-green-900 hover:shadow-lg hover:scale-105'
                    }
                  `}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content sections */}
        <main className="md:w-3/4 space-y-20">
          {sections.map(({ id, title, desc, img }) => (
            <section id={id} key={id} className="flex flex-col md:flex-row items-center gap-8">
              <img
                src={img}
                alt={title}
                className="rounded-xl shadow-md w-full md:w-1/2 h-64 object-cover"
                loading="lazy"
                draggable={false}
              />
              <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-3xl font-semibold text-green-800 mb-4">{title}</h2>
                <p className="text-gray-700 leading-relaxed">{desc}</p>
              </div>
            </section>
          ))}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-green-700 text-white text-center py-6 mt-20">
        <p className="text-sm sm:text-base">
          © 2025 EcoShare. Created by <strong>Nai Sreymey & Phorn Sreyphea</strong>
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
