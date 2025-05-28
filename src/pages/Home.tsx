import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaUsers, FaGraduationCap, FaHandsHelping, FaAward } from "react-icons/fa";

interface Project {
  id: number;
  title: string;
  short_description: string;
  content: string;
  publish_date: string;
  createdAt: string;
  users_permissions_users: { username: string }[];
  category?: { category_name: string };
  attachments?: { url?: string }[];
}

const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let current = 0;
    const duration = 3000;
    const step = Math.max(1, Math.floor(value / 100));
    const steps = Math.ceil(value / step);
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        current = value;
        clearInterval(timer);
      }
      setCount(current);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [value]);

  return <p className="text-4xl font-bold text-green-700">{count.toLocaleString()}</p>;
};

const statsData = [
  { icon: <FaUsers />, label: "Children Supported", value: 6500 },
  { icon: <FaGraduationCap />, label: "Graduates Hired", value: 4000 },
  { icon: <FaHandsHelping />, label: "Staff Members", value: 650 },
  { icon: <FaAward />, label: "Human Rights Awards", value: 12 },
];

const getFullImageUrl = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `http://pse-eco-sharing-be.final25.psewmad.org${url}`;
};

const formatDate = (isoDate: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(isoDate).toLocaleDateString(undefined, options);
};

const MainPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("jwt");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    setLoading(true);
    setError(null);
    fetch("http://pse-eco-sharing-be.final25.psewmad.org/api/projects?populate=*")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => {
        setProjects((data.data as Project[]).reverse());
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleCreateProject = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate(isAuthenticated ? "/post" : "/login");
    }, 1000);
  };

  const handleShowMoreAbout = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/about");
    }, 1000);
  };

  const handleSeeAllProjects = () => {
    navigate("/projects");
  };

  return (
    <>
      <Header />
      <div className="bg-green-50 min-h-screen px-6 md:px-36">
        {isNavigating && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 flex items-center justify-center">
            <div className="loader"></div>
          </div>
        )}

        {/* Hero Section */}
        <section className="relative w-full h-72 md:h-96 overflow-hidden rounded-lg mb-16">
          <video
            className="absolute w-full h-full object-cover brightness-75"
            autoPlay
            loop
            muted
            playsInline
            src="https://www.w3schools.com/howto/rain.mp4"
          ></video>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-20">
            <h1 className="text-4xl md:text-6xl font-semibold text-white drop-shadow-lg mb-4">
              🌍 Love the environment like you love your life.
            </h1>
            <p className="text-green-300 text-lg md:text-3xl max-w-3xl font-semibold drop-shadow-md mb-8">
            Protect Earth, protect ourselves. Every action counts.            </p>
            <button
              onClick={handleCreateProject}
              className="flex items-center space-x-3 px-8 py-4 bg-green-600 hover:bg-green-700 shadow-lg rounded-full text-white text-xl font-semibold animate-pulse transition duration-300"
            >
              <span>🚀 Create Project</span>
              <span className="text-2xl">✨</span>
            </button>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 lg:border-b lg:border-green-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-green-900 mb-4">About PSE Cambodia</h2>
              <p className="text-gray-800 text-lg mb-8 max-w-lg leading-relaxed">
                Pour un Sourire d’Enfant – For a Child’s Smile (PSE) is a non-profit organization operating in Cambodia since 1995 to help children suffering acute hardship by reintegrating them into society. PSE provides a safe environment and quality education to break the cycle of poverty.
              </p>
              <button
                onClick={handleShowMoreAbout}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300"
              >
                Show More
              </button>

              <div className="grid grid-cols-2 gap-6 text-green-900 mt-10">
                {statsData.map(({ icon, label, value }, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="text-4xl text-green-600">{icon}</div>
                    <div>
                      <Counter value={value} />
                      <p className="text-sm font-semibold">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* IMAGE GRID */}
            <div className="grid grid-cols-2 gap-6 rounded-2xl shadow-lg overflow-hidden">
              {["pse1.png", "pse2.png", "pse3.png", "pse4.png"].map((img, idx) => (
                <img
                  key={idx}
                  src={`/images/${img}`}
                  alt={`PSE Image ${idx + 1}`}
                  className="w-full h-52 md:h-64 object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="flex items-center justify-between py-6 mt-10">
          <h2 className="text-4xl font-bold text-green-900">Projects</h2>
          <button
            onClick={handleSeeAllProjects}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300"
          >
            See All
          </button>
        </section>

        {/* Project Cards */}
        <main className="pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading && <p>Loading projects...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
          {!loading && !error && projects.length === 0 && <p>No projects found.</p>}

          {!loading &&
            !error &&
            projects.slice(0, 4).map((project) => {
              const imageUrl = getFullImageUrl(project.attachments?.[0]?.url);
              return (
                <Link to={`/detail/${project.id}`} key={project.id}>
                  <div className="bg-white rounded-2xl shadow-lg p-5 w-full hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
                    <img
                      src={imageUrl || "/images/default-placeholder.png"}
                      alt={project.title}
                      className="w-full h-52 object-cover rounded-xl mb-4"
                      loading="lazy"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-xl text-green-700 mb-2 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                        <strong>Short Description:</strong> {project.short_description}
                      </p>
                      <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                        <strong>Content:</strong> {project.content}
                      </p>
                    </div>
                    <div className="text-gray-800 text-xs mt-auto border-t border-green-200 pt-3">
                      <p>
                        <strong className="text-green-700">Created by:</strong>{" "}
                        {project.users_permissions_users?.[0]?.username || "Unknown"}
                      </p>
                      <p>
                        <strong className="text-green-700">Published on:</strong>{" "}
                        {formatDate(project.publish_date)}
                      </p>
                      <p>
                        <strong className="text-green-700">Category:</strong>{" "}
                        {project.category?.category_name || "N/A"}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </main>
      </div>
    </>
  );
};

export default MainPage;
