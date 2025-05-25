import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHandsHelping,
  FaGraduationCap,
  FaAward,
  FaUsers,
} from "react-icons/fa";
import Header from "../components/Header";

// Project data
const projects = [
  {
    id: 1,
    image: "/images/biodiversity.png",
    title: "Protecting Biodiversity",
    short_description: "Conserving wildlife and ecosystems.",
    content:
      "Our mission is to protect endangered species and maintain Cambodia's rich biodiversity by working with local communities, NGOs, and government agencies.",
    createdBy: "Pisey",
    publishDate: "2025-05-10",
    Category: "Biodiversity",
  },
  {
    id: 2,
    image: "/images/water.png",
    title: "Clean Water for All",
    short_description: "Safe drinking water for villages.",
    content:
      "This project builds and maintains water purification systems in rural areas, ensuring clean water access for over 50,000 people.",
    createdBy: "Rith",
    publishDate: "2025-05-11",
    Category: "Water",
  },
  {
    id: 3,
    image: "/images/food.png",
    title: "Sustainable Food Program",
    short_description: "Supporting organic farming.",
    content:
      "We support local farmers with training, seeds, and sustainable farming techniques to promote food security and nutrition.",
    createdBy: "Dara",
    publishDate: "2025-05-12",
    Category: "Food",
  },
  {
    id: 4,
    image: "/images/energy.png",
    title: "Green Energy Solutions",
    short_description: "Solar power for schools and homes.",
    content:
      "The initiative installs solar panels in off-grid areas to provide eco-friendly energy for education and daily living.",
    createdBy: "Sreyleak",
    publishDate: "2025-05-13",
    Category: "Energy",
  },
];

// Stats data
const statsData = [
  { icon: <FaUsers />, label: "Children Supported", value: 6500 },
  { icon: <FaGraduationCap />, label: "Graduates Hired", value: 4000 },
  { icon: <FaHandsHelping />, label: "Staff Members", value: 650 },
  { icon: <FaAward />, label: "Human Rights Awards", value: 12 },
];

// Counter component with 3s animation
const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 3000; // Total animation duration in ms
    let step = 1;

    // Dynamically choose step size based on value
    if (value >= 5000) step = 50;
    else if (value >= 1000) step = 25;
    else if (value >= 500) step = 10;
    else if (value >= 100) step = 5;
    else step = 1;

    const steps = Math.ceil(value / step);
    const intervalTime = Math.floor(duration / steps);

    const interval = setInterval(() => {
      setCount((prev) => {
        const next = prev + step;
        if (next >= value) {
          clearInterval(interval);
          return value;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <span className="text-3xl font-bold text-green-700">
      {count.toLocaleString()}
    </span>
  );
};

// Card for each project
const CategoryCard: React.FC<{ item: typeof projects[0] }> = ({ item }) => (
  <div className="bg-white rounded-2xl shadow-lg p-5 w-full hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
    <img
      src={item.image}
      alt={item.title}
      className="w-full h-52 object-cover rounded-xl mb-4"
      loading="lazy"
    />
    <div className="flex-grow">
      <h3 className="font-extrabold text-xl text-green-700 mb-2">{item.title}</h3>
      <p className="text-gray-700 text-sm mb-2">
        <strong>Short Description:</strong> {item.short_description}
      </p>
      <p className="text-gray-700 text-sm mb-2">
        <strong>Content:</strong> {item.content}
      </p>
    </div>
    <div className="text-gray-800 text-xs mt-auto border-t border-green-200 pt-3">
      <p>
        <strong className="text-green-700">Created by:</strong> {item.createdBy}
      </p>
      <p>
        <strong className="text-green-700">Published on:</strong> {item.publishDate}
      </p>
      <p>
        <strong className="text-green-700">Category:</strong> {item.Category}
      </p>
    </div>
  </div>
);

// Main component
const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("jwt");

  const handleCreateProject = () => {
    navigate(isAuthenticated ? "/post" : "/login");
  };

  const handleShowMoreAbout = () => {
    navigate("/about");
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-72 md:h-96 overflow-hidden">
        <video
          className="absolute w-full h-full object-cover brightness-75"
          autoPlay
          loop
          muted
          playsInline
          src="https://www.w3schools.com/howto/rain.mp4"
        ></video>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
            🌍 Save the Earth, Shape the Future!
          </h1>
          <p className="text-green-200 text-lg md:text-2xl max-w-3xl font-semibold drop-shadow-md mb-8">
            Let’s act together for a sustainable world. Every small effort counts.
          </p>
          <button
            onClick={handleCreateProject}
            className="flex items-center space-x-3 px-8 py-4 bg-green-600 hover:bg-green-700 shadow-lg rounded-full text-white text-xl font-bold animate-pulse transition duration-300"
          >
            <span>🚀 Create Project</span>
            <span className="text-2xl">✨</span>
          </button>
        </div>
      </section>

      {/* Info + Video Section */}
      <section className="bg-green-100 px-6 md:px-24 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-green-50 p-16 rounded-xl shadow-md">
          {/* Text Content */}
          <div className="  text-gray-800 text-64 leading-relaxed space-y-4 h-96">
            <p>
              Pour un Sourire d’Enfant – For a Child’s Smile (PSE) – is a non-profit
              organization operating in Cambodia since 1995 to help children suffering
              acute hardship by reintegrating them into society and by creating a safe
              and appropriate environment for them to study and to learn a trade that is
              as highly qualified as possible.
            </p>
            <button
              onClick={handleShowMoreAbout}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300"
            >
              Show More
            </button>
            <div className="grid grid-cols-2 gap-6 text-green-900 mt-8">
              {statsData.map(({ icon, label, value }, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <div className="text-3xl md:text-4xl text-green-600">{icon}</div>
                  <div>
                    <Counter value={value} />
                    <p className="text-sm font-semibold">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 rounded-2xl shadow-lg overflow-hidden">
            {["pse1.png", "pse2.png", "pse3.png", "pse4.png"].map((img, idx) => (
              <img
                key={idx}
                src={`/images/${img}`}
                alt={`Environment ${idx + 1}`}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-green-50 py-16 px-6 md:px-20 lg:border-b lg:border-green-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-green-900">Projects</h2>
          <button
            onClick={() => navigate("/projects")}
            className="text-green-600 hover:text-green-800 font-semibold"
          >
            See All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {projects.length > 0 ? (
            projects.map((item) => <CategoryCard key={item.id} item={item} />)
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No categories found.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default CategoryList;
