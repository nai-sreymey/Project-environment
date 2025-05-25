import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHandsHelping,
  FaGraduationCap,
  FaAward,
  FaUsers,
} from "react-icons/fa";
import Header from "../components/Header";

// Stats data
const statsData = [
  { icon: <FaUsers />, label: "Children Supported", value: 6500 },
  { icon: <FaGraduationCap />, label: "Graduates Hired", value: 4000 },
  { icon: <FaHandsHelping />, label: "Staff Members", value: 650 },
  { icon: <FaAward />, label: "Human Rights Awards", value: 12 },
];

// Counter component
const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let incrementTime = 20;
    let step = Math.ceil(end / (1000 / incrementTime));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <div className="text-xl font-bold">{count} </div>;
};

// CategoryCard component
const CategoryCard: React.FC<{ item: any }> = ({ item }) => (
  <div className="bg-white rounded-2xl shadow-lg p-5 w-full hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
    <img
      src={item.image || "/images/default.png"}
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
        <strong className="text-green-700">Created by:</strong> {item.publish_by || "Unknown"}
      </p>
      <p>
        <strong className="text-green-700">Published on:</strong> {item.publish_date?.slice(0, 10)}
      </p>
      <p>
        <strong className="text-green-700">Category:</strong> {item.Category || "General"}
      </p>
    </div>
  </div>
);

const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("jwt");

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:1337/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => {
        setProjects(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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

      {/* About Section */}
      <section className="bg-green-50 px-6 md:px-20 py-12 lg:border-b lg:border-green-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
              About PSE Cambodia
            </h2>
            <p className="text-gray-800 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
              Pour un Sourire d’Enfant – For a Child’s Smile (PSE) - is a non-profit
              organization operating in Cambodia since 1995 to help children
              suffering acute hardship by reintegrating them into society and by
              creating a safe and appropriate environment for them to study and to
              learn a trade that is as highly qualified as possible. Recognized by the
              local authorities, PSE is working with full respect of the country, with
              the Cambodians, and thus supports sustainable development.
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

      {/* Projects Section - Show only 4 projects */}
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
            projects.slice(0, 4).map((item) => <CategoryCard key={item.id} item={item} />)
          ) : (
            <p className="text-gray-500 text-center col-span-full">No categories found.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default CategoryList;
