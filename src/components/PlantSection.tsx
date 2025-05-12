import React, { useState } from 'react';
import Card from './Card';

// Sample data with different categories
const allPlantData = [
  {
    title: "Tree of Life",
    image: "/images/trees.png",
    description: "Symbol of nature's beauty and balance.",
    category: "Biodiversity"
  },
  {
    title: "Jungle Fern",
    image: "/images/trees.png",
    description: "Helps air and maintain biodiversity.",
    category: "Biodiversity"
  },
  {
    title: "Rainforest Flower",
    image: "/images/trees.png",
    description: "Rare flower found in tropical forests.",
    category: "Biodiversity"
  },
  {
    title: "Water Lily",
    image: "/images/waterlily.png",
    description: "Improves water quality.",
    category: "Water Filter"
  },
  {
    title: "Water Reed",
    image: "/images/waterreed.png",
    description: "Used in water purification.",
    category: "Water Filter"
  },
  {
    title: "Desert Plant",
    image: "/images/desertplant.png",
    description: "Adapted for dry conditions.",
    category: "Desert"
  },
  {
    title: "Cactus",
    image: "/images/cactus.png",
    description: "Stores water in desert climates.",
    category: "Desert"
  },
  {
    title: "Tropical Orchid",
    image: "/images/orchid.png",
    description: "Colorful flowers in tropical environments.",
    category: "Tropical"
  },
  {
    title: "Tropical Palm",
    image: "/images/palm.png",
    description: "Common in tropical areas.",
    category: "Tropical"
  },
  {
    title: "Water Fern",
    image: "/images/waterfern.png",
    description: "Grows well in waterlogged soils.",
    category: "Wetland"
  },
  {
    title: "Mangrove",
    image: "/images/mangrove.png",
    description: "Common in coastal wetlands.",
    category: "Wetland"
  },
  {
    title: "Forest Pine",
    image: "/images/pine.png",
    description: "Grows in temperate forests.",
    category: "Forest"
  },
  {
    title: "Redwood",
    image: "/images/redwood.png",
    description: "Tall trees of temperate forests.",
    category: "Forest"
  },
];

const categories = [
  'All', 'Biodiversity', 'Water Filter', 'Desert', 'Tropical', 'Wetland', 'Forest'
];

const PlantSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter plants based on selected category
  const filteredPlants = selectedCategory === 'All'
    ? allPlantData
    : allPlantData.filter(plant => plant.category === selectedCategory);

  return (
    <section className="p-6 bg-green-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Select Category</h2>

      {/* Dropdown for category selection */}
      <div className="flex justify-center mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-200"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto">
        <h3 className="text-xl font-semibold">{selectedCategory}</h3>
        <a href="#" className="text-green-600 hover:underline">See All</a>
      </div>

      {/* Display filtered plants */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto">
        {filteredPlants.map((plant, index) => (
          <Card id={''} key={index} {...plant} />
        ))}
      </div>
    </section>
  );
};

export default PlantSection;
