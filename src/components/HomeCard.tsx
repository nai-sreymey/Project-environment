import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Search } from "lucide-react";

// Category type and list
interface Category {
  title: string;
  emoji: string;
  description: string;
  image: string;
}

const categories: Category[] = [
  {
    title: "Trees",
    emoji: "🌳",
    description: "Strong, tall, and helpful",
    image: "/images/trees.png",
  },
  {
    title: "Flowers",
    emoji: "🌸",
    description: "Colorful and meaningful",
    image: "/images/flowers.png",
  },
  {
    title: "Vegetables",
    emoji: "🥬",
    description: "Good for healthy",
    image: "/images/vegetables.png",
  },
  {
    title: "Aloe Vera",
    emoji: "🌿",
    description: "Medicinal and soothing",
    image: "/images/aloe-vera.png",
  },
  {
    title: "Fruits",
    emoji: "🍎",
    description: "Tasty and nutritious",
    image: "/images/fruits.png",
  },
  {
    title: "Compost",
    emoji: "♻️",
    description: "Recycle to enrich the soil",
    image: "/images/compost.png",
  },
  {
    title: "Birds",
    emoji: "🐦",
    description: "Sing and keep balance in nature",
    image: "/images/birds.png",
  },
  {
    title: "Insects",
    emoji: "🦋",
    description: "Tiny helpers in ecosystems",
    image: "/images/insects.png",
  },
];

const HomeCard: React.FC<{ item: Category }> = ({ item }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/category/${item.title}`);
    }, 700);
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-green-600 border-dashed rounded-full animate-spin"></div>
        </div>
      )}
      <div
        onClick={handleClick}
        className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 max-w-xs"
      >
        <img
          src={item.image}
          alt={item.title}
          className="rounded-md h-36 w-full object-cover"
        />
        <h3 className="text-lg font-bold mt-2">
          {item.emoji} {item.title}
        </h3>
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>
    </>
  );
};

const HomeCardPage = () => {
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("jwt");

  const visibleCategories = showAll ? categories : categories.slice(0, 8);

  const handleCreateProject = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(isAuthenticated ? "/post" : "/login");
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

        {/* Category Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {visibleCategories.map((item) => (
            <CategoryCard key={item.title + item.image} item={item} />
          ))}
        </div> */}
      </main>
    </>
  );
};

export default HomeCard;
