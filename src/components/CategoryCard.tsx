import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "../data/categories";

const CategoryCard: React.FC<{ item: Category }> = ({ item }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/category"); // You can pass item.id if needed: `/category/${item.id}`
    }, 700); // 2 seconds delay
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

export default CategoryCard;
