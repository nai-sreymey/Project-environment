import React from 'react';
import Card from './Card';

const plantData = [
  {
    title: "Tree of Life",
    image: "/images/trees.png",
    description: "Symbol of nature's beauty and balance."
  },
  {
    title: "Jungle Fern",
    image: "/images/trees.png",
    description: "Helps air and maintain biodiversity."
  },
  {
    title: "Rainforest Flower",
    image: "/images/trees.png",
    description: "Rare flower foun in tropical forests."
  },
];

const PlantSection: React.FC = () => {
  return (
    <section className="p-6 bg-green-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Select Category</h2>

      <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto">
        <h3 className="text-xl font-semibold">Biodiversity</h3>
        <a href="#" className="text-green-600 hover:underline">See All</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto">
        {plantData.map((plant, index) => (
          <Card id={''} key={index} {...plant} />
        ))}
      </div>
    </section>
  );
};

export default PlantSection;
