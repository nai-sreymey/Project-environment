import React, { useState, useEffect } from 'react';
import Card from './Card';

const allPlantData = [
  { title: "Tree of Life", image: "/images/trees.png", description: "Symbol of nature's beauty and balance.", category: "Biodiversity" },
  { title: "Jungle Fern", image: "/images/trees.png", description: "Helps air and maintain biodiversity.", category: "Biodiversity" },
  { title: "Rainforest Flower", image: "/images/trees.png", description: "Rare flower found in tropical forests.", category: "Biodiversity" },
  { title: "Water Lily", image: "/images/waterlily.png", description: "Improves water quality.", category: "Water" },
  { title: "Water Reed", image: "/images/waterreed.png", description: "Used in water purification.", category: "Water" },
  { title: "Desert Plant", image: "/images/desertplant.png", description: "Adapted for dry conditions.", category: "Others" },
  { title: "Cactus", image: "/images/cactus.png", description: "Stores water in desert climates.", category: "Others" },
  { title: "Tropical Orchid", image: "/images/orchid.png", description: "Colorful flowers in tropical environments.", category: "Food" },
  { title: "Tropical Palm", image: "/images/palm.png", description: "Common in tropical areas.", category: "Food" },
  { title: "Water Fern", image: "/images/waterfern.png", description: "Grows well in waterlogged soils.", category: "Water" },
  { title: "Mangrove", image: "/images/mangrove.png", description: "Common in coastal wetlands.", category: "Water" },
  { title: "Forest Pine", image: "/images/pine.png", description: "Grows in temperate forests.", category: "Others" },
  { title: "Redwood", image: "/images/redwood.png", description: "Tall trees of temperate forests.", category: "Others" },
  { title: "Solar Tree", image: "/images/solar_tree.png", description: "Generates solar power from its leaves.", category: "Energy" },
  { title: "Wind Flower", image: "/images/windflower.png", description: "Harnesses wind energy for sustainable power.", category: "Energy" }
];

const categories = ['All', 'Biodiversity', 'Water', 'Food', 'Energy', 'Others'];

const PlantSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(false);

  const filteredPlants = selectedCategory === 'All'
    ? allPlantData
    : allPlantData.filter(plant => plant.category === selectedCategory);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  return (
    <section className="p-8 bg-gradient-to-br from-green-100 to-green-100 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Category Selector */}
        <div className="flex justify-center mb-10">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-6 py-3 rounded-lg bg-white shadow-md text-green-700 font-semibold hover:bg-green-50 transition"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Section Header */}
        <div className="flex justify-between items-center mb-6 px-4 md:px-0">
          <h3 className="text-2xl font-semibold text-green-700">{selectedCategory} Plants</h3>
          <a href="#" className="text-green-600 hover:underline text-sm">See All</a>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlants.map((plant, index) => (
              <Card id={''} key={index} {...plant} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PlantSection;
