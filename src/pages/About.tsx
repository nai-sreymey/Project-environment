// import React, { useState } from 'react';
// import Header from '../components/Header';
// import HeroSection from '../components/HeroSection';

// export const Card = ({
//   children,
//   className = '',
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className={`rounded-2xl bg-white/80 backdrop-blur p-6 shadow-xl transition-transform hover:scale-105 duration-300 ${className}`}>
//       {children}
//     </div>
//   );
// };

// export const CardContent = ({ children }: { children: React.ReactNode }) => {
//   return <div className="mt-2">{children}</div>;
// };

// const AboutUs = () => {
//   const [activeSection, setActiveSection] = useState<string>('PSE At A GLANCE');

//   const scrollToSection = (section: string) => {
//     setActiveSection(section);
//     document.getElementById(section)?.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start',
//     });
//   };

//   const sections = [
//     {
//       id: 'PSE At A GLANCE',
//       title: 'PSE At A GLANCE',
//       desc: 'We started our journey in 2022 with a simple but powerful dream. Our vision was to create a world where environmental sustainability and social impact are at the heart of every community. With a small team and a big idea, we took the first step towards building a better future for our planet. Over time, our passion for preserving nature grew stronger, and we started to partner with like-minded organizations to amplify our impact and reach more people in need of support.',
//       img: '/images/trees.png',
//     },
//     {
//       id: 'EDUCATION',
//       title: 'EDUCATION',
//       desc: 'Education is at the heart of our mission. We believe that by educating communities about the importance of environmental protection and sustainability, we can empower individuals to take action and make a lasting difference. Our educational programs provide the knowledge and tools needed to understand the challenges of climate change, waste management, and biodiversity conservation. By working with schools, universities, and community groups, we aim to inspire the next generation of environmental leaders and advocates.',
//       img: '/images/mey.png',
//     },
//     {
//       id: 'ACTION',
//       title: 'ACTION',
//       desc: 'We are proud to work with schools, NGOs, and other organizations that share our vision for a greener and more sustainable world. Through these partnerships, we are able to collaborate on various projects such as tree planting, waste cleanup, and environmental education. Together, we are building a global network of environmental advocates who are united in their efforts to protect and restore the Earth. These partnerships allow us to expand our reach, leverage resources, and create a greater impact.',
//       img: '/images/trees.png',
//     },
//     {
//       id: 'JOIN US',
//       title: 'JOIN US',
//       desc: 'To us, everyone who joins or supports our cause is a friend. Whether it’s a community member participating in a cleanup, a volunteer helping us organize an event, or a donor contributing to our initiatives, we value each and every individual who believes in our mission. We consider our supporters an integral part of our journey, and together, we are making positive changes that will benefit both people and the planet. Our goal is to build a community where people from all walks of life can come together and work towards common goals.',
//       img: '/images/trees.png',
//     },
//     {
//       id: 'PARTNERSHIP',
//       title: 'PARTNERSHIP',
//       desc: 'We do this because the Earth is our only home, and its future is at risk. With increasing pollution, deforestation, and climate change, we believe that urgent action is needed to protect the environment for future generations. Our mission is to raise awareness about these issues and inspire people to take action, whether through small changes in their daily lives or by supporting larger environmental initiatives. We want to create a world where sustainability is not just a buzzword, but a way of life for everyone.',
//       img: '/images/trees.png',
//     },
//     {
//       id: 'EVENT',
//       title: 'EVENT',
//       desc: 'We organize community cleanups, plant trees, and promote sustainable practices in everyday life. Our initiatives include reducing waste, increasing recycling efforts, and educating people about the benefits of renewable energy sources. We also host workshops and awareness campaigns to engage communities and encourage them to adopt greener practices. From organizing local cleanup drives to large-scale tree planting events, our work is focused on creating a tangible, positive impact on the environment and the communities we serve.',
//       img: '/images/trees.png',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-100 via-green-200 to-green-300 text-center">
//       {/* Top Header and Hero Section */}
//       <Header />
//       <HeroSection />

//       {/* Sticky Menu Buttons */}
//       <section className="bg-green-100 sticky top-20 z-40 shadow-sm py-4">
//         <div className="flex flex-wrap justify-center gap-4 px-4">
//           {sections.map((section) => (
//             <button
//               key={section.id}
//               onClick={() => scrollToSection(section.id)}
//               className={`px-4 py-2 rounded-full shadow-md font-semibold transition duration-300 ${
//                 activeSection === section.id
//                   ? 'bg-green-700 text-white'
//                   : 'bg-white text-green-700 hover:bg-green-500 hover:text-white'
//               }`}
//             >
//               {section.title}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Section content */}
//       <section className="max-w-5xl mx-auto px-4 space-y-16 py-10">
//         {sections.map((section) => (
//           <div id={section.id} key={section.id} className="flex flex-col md:flex-row items-center gap-8 scroll-mt-28">
//             <img
//               src={section.img}
//               alt={section.title}
//               className="w-full md:w-1/3 h-60 object-cover rounded-2xl shadow-lg"
//             />
//             <Card className="md:w-2/3 text-left">
//               <h3 className="text-3xl font-bold text-green-800 mb-2">{section.title}</h3>
//               <CardContent>
//                 <p className="text-gray-700 text-lg">{section.desc}</p>
//               </CardContent>
//             </Card>
//           </div>
//         ))}
//       </section>

//       {/* Footer */}
//       <footer className="bg-green-700 py-6 text-white text-center mt-10">
//         <p>2025 © EcoShare. Created by <span className="font-bold">Nai Sreymey & Phorn Sreyphea</span></p>
//       </footer>
//     </div>
//   );
// };

// export default AboutUs;




import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';

const sections = [
  {
    id: 'glance',
    title: 'PSE At A Glance',
    desc: `
PSE operates six main programs that meet children's needs, allowing a key-integrated approach for its success: nutrition, healthcare, protection and accommodation, general education, vocational training, and family support. Currently, PSE cares for 6,500 children in its various programs. 4,000 graduates from PSE's Vocational Training program have successfully integrated into the job market with real qualified positions. They live with dignity and support their families.

PSE employs around 650 Cambodian people (teachers, trainers, doctors, social assistants…) and 4 staff in France. Additionally, 300 volunteers from different countries actively work to promote the organization and support fundraising, donations, and sponsorships.

In 2000, PSE was awarded the French Human Rights Prize by the French Republic.

About the PSE Environment Project

This project fully engages PSE in environmental protection by developing environmental education in Cambodia. The project aims to make PSE an "eco-school" with four main objectives:
<strong>1.</strong> Provide environmental awareness to all students and staff
<strong>2.</strong> Implement eco-facilities and conduct environmental activities
<strong>3.</strong> Develop partnerships and community outreach
<strong>4.</strong> Integrate environmental rules into PSE policy
`,
    img: '/images/trees.png',
  },
  {
    id: 'education',
    title: 'Education',
    desc: `
Students are the core of the environment project. They receive environmental education through weekly classes on various topics such as climate change, biodiversity, air and water pollution, waste management, energy saving, vegetarian meals, compost production, gardening, and recycling.

We aim to facilitate students to become active environmentalists and responsible citizens who lead positive impacts on society, respect nature, and promote sustainable development. Theory-based lessons provide opportunities to discuss scientific information and understand environmental concepts. Students develop projects and engage in practical sessions to experiment, explore, and learn through their five senses.

The objectives of environmental education are:
- Raise environmental awareness among students and staff with scientific information and discussions about causes, consequences, impacts, effects, and solutions.
- Facilitate student participation in activities that align with the curriculum and PSE's needs.
- Encourage and motivate students to respect the environment and contribute to sustainable development.
`,
    img: '/images/mey.png',
  },
  {
    id: 'action',
    title: 'Action',
    desc: `
Based on the needs of staff and students, PSE has defined four main themes for the project: waste management, energy saving, green spaces, and food quality.

In 2022 and 2023, waste management initiatives included: a new bins system and sorting, a zero-plastic policy, banning single-use plastic items in purchasing, implementing compost production, recycling waste, and battery waste management. Training on proper bin usage was provided to all PSE students and staff. Additionally, waste management policy has been established and is being implemented.

A vegetarian meal is introduced monthly to raise awareness about food and the environment.

In 2024, energy saving efforts included installing 100% LED lighting at PSE and establishing an Energy Saving Competition.

In 2025, work is ongoing to renovate green spaces at PSE, including improving landscapes, gardens (plant reproduction, tree planting, and vegetable production).
`,
    img: '/images/trees.png',
  },
  {
    id: 'join',
    title: 'Join Us',
    desc: `
The Eco-Club is an active youth group passionate about making a positive impact on the school and community. Members develop and lead weekend projects such as tree planting, gardening, waste management, food, and energy conservation. Eco-Club members are trained as leaders to run projects.

Supportive members: Every student can join as a supportive member, participating in weekend activities to learn and help implement projects.

Join us if you want to deepen your environmental knowledge, become an Eco-Club member, or support occasionally. You are always welcome!
`,
    img: '/images/trees.png',
  },
  {
    id: 'partnership',
    title: 'Partnership',
    desc: `
PSE cannot protect the environment alone. We actively seek partnerships with government bodies (including the Ministry of Environment, Cambodia Agriculture Research and Development Institute - CARDI, Ministry of Agriculture, Forestry and Fisheries), NGOs, public schools, private companies, and especially PSE family committees.

Partnerships allow beneficiaries to learn and explore different sectors. They gain broader perspectives and understand the various roles and missions of institutions working towards the shared goal of a sustainable future.
`,
    img: '/images/trees.png',
  },
  {
    id: 'event',
    title: 'Event',
    desc: `
<strong>1.</strong> PSE Environment Day  
<strong>2.</strong> Student Study Trip  
<strong>3.</strong> Annual Eco-Club Study Trip
    `,
    img: '/images/trees.png',
  },
];

const style = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

const LeftArrowIcon = () => (
  <svg
    className="w-6 h-6 text-green-800"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const RightArrowIcon = () => (
  <svg
    className="w-6 h-6 text-green-800"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const Style = () => <style>{style}</style>;

const AboutUs = () => {
  const [activeId, setActiveId] = useState(sections[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -150, behavior: 'smooth' });
  };
  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 150, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-900 font-sans">
      <Style />

      <Header />

      <div className="max-w-7xl mx-auto px-12 py-10 flex flex-col md:flex-row gap-12">
        {/* Sidebar nav for md+ (sticky/fixed and scrollable) */}
        <nav className="hidden md:block md:w-64 md:fixed md:top-24 md:left-0 md:h-[calc(100vh-6rem)] md:overflow-auto md:px-4">
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

        {/* Horizontal scroll nav with arrows on small screens */}
        <div className="md:hidden flex items-center gap-2 px-2">
          {/* Left arrow */}
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="bg-green-200 hover:bg-green-300 rounded-full p-2 shadow-md flex items-center justify-center transition-transform duration-200 hover:scale-110"
          >
            <LeftArrowIcon />
          </button>

          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto scroll-smooth hide-scrollbar flex-1"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {sections.map(({ id, title }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`
                  whitespace-nowrap px-6 py-2 rounded-lg font-semibold
                  ${
                    activeId === id
                      ? 'bg-green-700 text-white shadow-lg scale-105'
                      : 'bg-green-200 text-green-900 hover:bg-green-300 hover:shadow-md hover:scale-105'
                  }
                  transition transform duration-300 ease-in-out
                `}
              >
                {title}
              </button>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="bg-green-200 hover:bg-green-300 rounded-full p-2 shadow-md flex items-center justify-center transition-transform duration-200 hover:scale-110"
          >
            <RightArrowIcon />
          </button>
        </div>

        {/* Main content area */}
        <main className="flex-1 md:ml-[16rem] space-y-24">
          {sections.map(({ id, title, desc, img }) => (
            <section key={id} id={id} className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-5 text-green-900">{title}</h2>
              {/* Use dangerouslySetInnerHTML to render desc with HTML tags (for bold numbers) */}
              <p
                className="whitespace-pre-line mb-6 text-gray-800"
                dangerouslySetInnerHTML={{ __html: desc }}
              />
              <img
                src={img}
                alt={title}
                className="w-full rounded-lg shadow-md object-cover"
                style={{ maxHeight: '500px', height: 'auto' }}
              />
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default AboutUs;