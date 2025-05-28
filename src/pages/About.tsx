import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';

interface Section {
  id: string;
  title: string;
  desc: string;
  img: string;
}

const sections: Section[] = [
  {
    id: 'glance',
    title: 'PSE At A Glance',
    desc: `
    Pour un Sourire d’Enfant – For a Child’s Smile(PSE) - is a non-profit organization operating in Cambodia since 1995 to help children suffering acute hardship by reintegrating them into society and by creating a safe and appropriate environment for them to study and to learn a trade that is as highly qualified as possible. Recognized by the local authorities, PSE is working with full respect of the country, with the Cambodians, and thus supports sustainable development.
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
    img: '/images/about1.png',
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
    img: '/images/about2.png',
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
    img: '/images/about1.png',
  },
  {
    id: 'join',
    title: 'Join Us',
    desc: `
The Eco-Club is an active youth group passionate about making a positive impact on the school and community. Members develop and lead weekend projects such as tree planting, gardening, waste management, food, and energy conservation. Eco-Club members are trained as leaders to run projects.

Supportive members: Every student can join as a supportive member, participating in weekend activities to learn and help implement projects.

Join us if you want to deepen your environmental knowledge, become an Eco-Club member, or support occasionally. You are always welcome!
    `,
    img: '/images/about3.png',
  },
  {
    id: 'partnership',
    title: 'Partnership',
    desc: `
PSE cannot protect the environment alone. We actively seek partnerships with government bodies (including the Ministry of Environment, Cambodia Agriculture Research and Development Institute - CARDI, Ministry of Agriculture, Forestry and Fisheries), NGOs, public schools, private companies, and especially PSE family committees.

Partnerships allow beneficiaries to learn and explore different sectors. They gain broader perspectives and understand the various roles and missions of institutions working towards the shared goal of a sustainable future.
    `,
    img: '/images/about4.png',
  },
  {
    id: 'event',
    title: 'Event',
    desc: `
<strong>1.</strong> PSE Environment Day  
<strong>2.</strong> Student Study Trip  
<strong>3.</strong> Annual Eco-Club Study Trip
    `,
    img: '/images/about5.png',
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

const AboutUs: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update activeId immediately for better UX
      setActiveId(id);
    }
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 150, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-900 font-inter">
      <Style />
      <Header />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row gap-12">
        {/* Sidebar for md+ */}
        <nav className="hidden md:block md:w-64 md:fixed md:top-24 md:left-0 md:h-[calc(100vh-6rem)] md:overflow-auto md:px-4" aria-label="About Us Navigation">
          <ul className="space-y-4">
            {sections.map(({ id, title }) => (
              <li key={id}>
                <button
                  type="button"
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
                  aria-current={activeId === id ? 'page' : undefined}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Horizontal scroll nav on small screens */}
        <div className="md:hidden flex items-center gap-2 px-2" role="navigation" aria-label="About Us Navigation">
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="bg-green-200 hover:bg-green-300 rounded-full p-2 shadow-md flex items-center justify-center transition-transform duration-200 hover:scale-110"
          >
            <LeftArrowIcon />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto scroll-smooth hide-scrollbar flex-1"
            style={{ WebkitOverflowScrolling: 'touch', minWidth: 0 }}
          >
            {sections.map(({ id, title }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={`
                  whitespace-nowrap px-6 py-2 rounded-lg font-semibold
                  ${
                    activeId === id
                      ? 'bg-green-700 text-white shadow-lg scale-105'
                      : 'bg-green-200 text-green-900 hover:bg-green-300 hover:shadow-md hover:scale-105'
                  }
                  transition transform duration-300 ease-in-out
                  flex-shrink-0
                `}
                aria-current={activeId === id ? 'page' : undefined}
              >
                {title}
              </button>
            ))}
          </div>

          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="bg-green-200 hover:bg-green-300 rounded-full p-2 shadow-md flex items-center justify-center transition-transform duration-200 hover:scale-110"
          >
            <RightArrowIcon />
          </button>
        </div>

        {/* Content Sections */}
        <main className="md:ml-72 flex flex-col gap-20 w-full max-w-4xl">
          {sections.map(({ id, title, desc, img }) => (
            <section key={id} id={id} className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-green-900 mb-4">{title}</h2>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <img
                  src={img}
                  alt={`Illustration for ${title}`}
                  className="w-full md:w-1/2 max-h-80 object-contain rounded-lg shadow-lg"
                  loading="lazy"
                />
                <article
                  className="prose max-w-none md:w-1/2 text-green-900"
                  dangerouslySetInnerHTML={{ __html: desc.replace(/\n/g, '<br/>') }}
                />
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default AboutUs;
