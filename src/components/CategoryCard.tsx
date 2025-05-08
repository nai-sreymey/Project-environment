import React from "react";
import { Category } from "../data/categories";

const CategoryCard: React.FC<{ item: Category }> = ({ item }) => (
  <a href="category">
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 max-w-xs">
    <img src={item.image} alt={item.title} className="rounded-md h-36 w-full object-cover" />
    <h3 className="text-lg font-bold mt-2">
      {item.emoji} {item.title}
    </h3>
    <p className="text-sm text-gray-600">{item.description}</p>
  </div>
  </a>
);

export default CategoryCard;
