import { useState } from "react";
import { categories } from "../data/categories";
import CategoryCard from "./CategoryCard";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const visibleCategories = showAll ? categories : categories.slice(0, 8);
  const isAuthenticated = !!localStorage.getItem("jwt"); // Check JWT for login

  const handleCreateProject = () => {
    setLoading(true);
    setTimeout(() => {
      if (isAuthenticated) {
        navigate("/post"); // Go to post if logged in
      } else {
        navigate("/login"); // Go to login if not logged in
      }
    }, 700);
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      <main className="px-6 md:px-24 py-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-gray-100 p-4 rounded-xl shadow-md">
          <button
            onClick={handleCreateProject}
            className={`${
              isAuthenticated ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 hover:bg-gray-500"
            } text-white font-semibold px-4 py-2 rounded-lg shadow-md mb-4 sm:mb-0`}
          >
            Create Project +
          </button>

          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search..."
              className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 w-full sm:w-72"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Section Title */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Biodiversity</h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-blue-500 hover:underline"
          >
            {showAll ? "Show Less" : "See All"}
          </button>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {visibleCategories.map((item) => (
            <CategoryCard key={item.title + item.image} item={item} />
          ))}
        </div>
      </main>
    </>
  );
};

export default CategoryList;
