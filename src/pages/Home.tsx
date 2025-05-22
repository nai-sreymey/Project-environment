import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";

interface Project {
  id: number;
  title: string;
  short_description: string;
  category?: string;
  attachments: {
    url?: string;
  }[];
}

function CategoryList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [navigating, setNavigating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("jwt");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    setLoading(true);
    fetch("http://localhost:1337/api/projects?populate=*")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => {
        setProjects((data.data || []).reverse());
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleCreateProject = () => {
    setNavigating(true);
    setTimeout(() => {
      if (isAuthenticated) {
        navigate("/post");
      } else {
        navigate("/login");
      }
    }, 700);
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const getFallbackImage = (category?: string) => {
    if (category?.toLowerCase().includes("tree")) {
      return "/images/trees.png";
    } else if (category?.toLowerCase().includes("flower")) {
      return "/images/flower.jpg";
    }
    return "/images/flowers.png";
  };

  return (
    <>
      <Header />
      <HeroSection />

      {(loading || navigating) && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-green-600 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      <main className="px-6 md:px-24 py-10 bg-green-100 min-h-screen">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-md">
          {/* Create Project Button */}
          <button
            onClick={handleCreateProject}
            className={`${
              isAuthenticated
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 hover:bg-gray-500"
            } text-white font-semibold px-4 py-2 rounded-lg shadow-md mb-4 sm:mb-0`}
          >
            Create Project +
          </button>

          {/* Search Input */}
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 w-full sm:w-72"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-green-800">🌿 All Project Post</h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {error && (
            <p className="text-red-600 text-center col-span-full">Error: {error}</p>
          )}
          {!loading && filteredProjects.length === 0 && (
            <p className="text-gray-500 text-center col-span-full">
              No projects found.
            </p>
          )}
          {filteredProjects.map((project) => {
            const imageUrl =
              Array.isArray(project.attachments) &&
              project.attachments[0]?.url
                ? project.attachments[0].url
                : getFallbackImage(project.category);

            return (
              <div
                key={project.id}
                className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 w-full h-80 flex flex-col"
              >
                <div className="w-full h-40 overflow-hidden rounded-md">
                  <img
                    src={imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold mt-2 text-green-700 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 flex-grow">
                  {project.short_description}
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default CategoryList;
