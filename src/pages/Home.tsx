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

  return (
    <p className="text-3xl md:text-4xl font-extrabold text-green-700 drop-shadow-md transition-all duration-500">
      {count.toLocaleString()}
    </p>
  );
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
      <div className="bg-green-50 min-h-screen px-6 md:px-36 pb-20">
        {isNavigating && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-green-500 h-20 w-20"></div>
          </div>
        )}

        {/* Hero Section */}
        <section className="relative w-full h-72 md:h-96 overflow-hidden rounded-lg mb-20 shadow-lg">
          <video
            className="absolute w-full h-full object-cover brightness-60"
            autoPlay
            loop
            muted
            playsInline
            src="https://www.w3schools.com/howto/rain.mp4"
          ></video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-20 text-white select-none">
            <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-5 animate-fadeInUp">
              🌍 Love the environment like you love your life.
            </h1>
            <p className="text-green-300 text-lg md:text-3xl max-w-3xl font-semibold drop-shadow-md mb-10 animate-fadeInUp delay-200">
              Protect Earth, protect ourselves. Every action counts.
            </p>
            <button
              onClick={handleCreateProject}
              className="flex items-center space-x-4 px-10 py-4 bg-green-600 hover:bg-green-700 shadow-xl rounded-full text-white text-xl font-bold animate-pulse transition duration-300 ease-in-out transform hover:scale-105"
              aria-label="Create Project"
            >
              <span>🚀 Create Project</span>
              <span className="text-3xl">✨</span>
            </button>
          </div>
        </section>

        {/* About Section */}
        <section className="py-14 lg:border-b lg:border-green-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-5xl font-extrabold text-green-900 mb-6 tracking-tight">About PSE Cambodia</h2>
              <p className="text-gray-900 text-xl mb-8 max-w-lg leading-relaxed tracking-wide">
                Pour un Sourire d’Enfant – For a Child’s Smile (PSE) is a non-profit organization operating in Cambodia since 1995 to help children suffering acute hardship by reintegrating them into society. PSE provides a safe environment and quality education to break the cycle of poverty.
              </p>
              <button
                onClick={handleShowMoreAbout}
                className="bg-green-700 hover:bg-green-800 text-white font-bold px-8 py-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400"
              >
                Show More
              </button>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-8 text-green-900 mt-12">
                {statsData.map(({ icon, label, value }, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-4 bg-white rounded-xl p-4 md:p-5 shadow-md hover:shadow-xl transition-shadow duration-400 ease-in-out"
                  >
                    <div className="text-3xl md:text-4xl text-green-600 animate-pulse">{icon}</div>
                    <div>
                      <Counter value={value} />
                      <p className="text-sm md:text-base font-semibold tracking-wide">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* IMAGE GRID */}
            <div className="grid grid-cols-2 gap-6 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500 ease-in-out">
              {["pse1.png", "pse2.png", "pse3.png", "pse4.png"].map((img, idx) => (
                <img
                  key={idx}
                  src={`/images/${img}`}
                  alt={`PSE Image ${idx + 1}`}
                  className="w-full h-60 md:h-72 object-cover rounded-lg hover:brightness-110 transition duration-300"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="flex items-center justify-between py-6 mt-16">
          <h2 className="text-4xl font-extrabold text-green-900 tracking-tight">Projects</h2>
          <button
            onClick={handleSeeAllProjects}
            className="bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            See All
          </button>
        </section>

        {/* Project Cards */}
        <main className="pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading && (
            <p className="col-span-full text-center text-green-700 font-semibold text-lg animate-pulse">
              Loading projects...
            </p>
          )}
          {error && (
            <p className="col-span-full text-center text-red-600 font-semibold text-lg">{`Error: ${error}`}</p>
          )}
          {!loading && !error && projects.length === 0 && (
            <p className="col-span-full text-center text-gray-700 font-semibold text-lg">No projects found.</p>
          )}

          {projects.map(({ id, title, short_description, content, publish_date, createdAt, users_permissions_users, category, attachments }) => {
            const firstUser = users_permissions_users[0];
            const imageUrl = attachments && attachments[0]?.url ? getFullImageUrl(attachments[0].url) : "/images/placeholder-image.jpg";

            return (
              <div
                key={id}
                className="flex flex-col justify-between shadow-lg hover:shadow-2xl bg-white rounded-xl p-5 cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
              >
                <div>
                  <img
                    src={imageUrl}
                    alt={title}
                    loading="lazy"
                    className="w-full h-48 rounded-xl object-cover mb-3"
                  />
                  <p className="text-green-900 font-bold text-xs mb-1">
                    {category?.category_name || "Uncategorized"}
                  </p>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">{title}</h3>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-3">{short_description || content}</p>
                </div>
                <div className="text-green-800 font-semibold text-xs flex justify-between items-center">
                  <p>
                    Posted by:{" "}
                    <span className="text-green-900 font-bold">{firstUser?.username || "Unknown"}</span>
                  </p>
                  <p>{formatDate(publish_date || createdAt)}</p>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </>
  );
};

export default MainPage;
