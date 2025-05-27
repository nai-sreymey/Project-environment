

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";

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

function CategoryList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [navigating, setNavigating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("jwt");

  useEffect(() => {
    fetchProjects(categoryFilter);
    setVisibleCount(8);
  }, [categoryFilter]);

  const fetchProjects = (category?: string) => {
    setLoading(true);
    setError(null);

    let url = "http://localhost:1337/api/projects?populate=*";
    if (category && category !== "") {
      url += `&filters[category][category_name][$eq]=${category.toLowerCase()}`;
    }

    fetch(url)
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
    setNavigating(true);
    setTimeout(() => {
      navigate(isAuthenticated ? "/post" : "/login");
    }, 700);
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const getFallbackImage = (category?: { category_name: string }) => {
    const catName = category?.category_name?.toLowerCase() || "";
    if (catName.includes("tree")) return "/images/trees.png";
    if (catName.includes("flower")) return "/images/flower.jpg";
    return "/images/flowers.png";
  };

  const formatDate = (isoDate: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(isoDate).toLocaleDateString(undefined, options);
  };

  const truncateText = (text: string, wordLimit: number): string => {
    const words = text.split(" ");
    return words.slice(0, wordLimit).join(" ") + (words.length > wordLimit ? "..." : "");
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
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-white p-4 rounded-xl shadow-md">
          <button
            onClick={handleCreateProject}
            className={`${isAuthenticated
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-500 hover:bg-green-500"
              } text-white font-semibold px-4 py-2 rounded-lg shadow-md`}
          >
            Create Project +
          </button>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
          >
            <option value="">All Categories</option>
            <option value="food">Food</option>
            <option value="water">Water</option>
            <option value="biodiversity">Biodiversity</option>
            <option value="energy">Energy</option>
            <option value="others">Others</option>
          </select>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-800">🌿 Projects</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {error && (
            <p className="text-red-600 text-center col-span-full">Error: {error}</p>
          )}
          {!loading && visibleProjects.length === 0 && (
            <p className="text-gray-500 text-center col-span-full">
              No projects found.
            </p>
          )}

          {visibleProjects.map((project) => {
            const imageUrl =
              project.attachments?.[0]?.url || getFallbackImage(project.category);

            return (
              <Link to={`/detail/${project.id}`} key={project.id}>
                <div className="bg-white rounded-2xl shadow-lg p-5 w-full hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
                  <img
                    src={imageUrl}
                    alt={project.title}
                    className="w-full h-52 object-cover rounded-xl mb-4"
                    loading="lazy"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-xl text-green-700 mb-2 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                      <strong>Short Description:</strong>{" "}
                      {truncateText(project.short_description, 20)}
                    </p>
                    <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                      <strong>Content:</strong> {truncateText(project.content, 20)}
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
        </div>

        {visibleProjects.length < filteredProjects.length && (
          <div className="text-center mt-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-md"
            >
              Load More
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default CategoryList;


