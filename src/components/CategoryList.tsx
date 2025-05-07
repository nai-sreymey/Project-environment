import { useState } from "react";
import { categories } from "../data/categories";
import CategoryCard from "./CategoryCard";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const CategoryList = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  // Show only first 8 categories unless showAll is true
  const visibleCategories = showAll ? categories : categories.slice(0, 8);

  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("userToken"); // Example check (you might use a more complex method)

  // Handle navigation to the "CreatePost" page
  const handleCreateProject = () => {
    if (isAuthenticated) {
      navigate('/post'); // Navigate to the "CreatePost" page if logged in
    } else {
      navigate('/post'); // Navigate to the "Login" page if not logged in
    }
  };

  return (
    <main className="px-6 md:px-24 py-8">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-xl shadow-md">
        <button
          onClick={handleCreateProject} // Trigger navigation on button click
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
        >
          Create Project +
        </button>

        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Section Title */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Plants</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-blue-500 hover:underline mr-4 md:mr-12"
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
  );
};

export default CategoryList;
