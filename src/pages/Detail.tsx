import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Detail: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle back button click
  const handleBackClick = () => {
    navigate('/'); // Navigate to the category page (or adjust path if needed)
  };

  return (
    <section className="bg-green-50 text-black p-10 min-h-screen flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-10">Biodiversity</h1>

      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <img
          src="/images/trees.png"
          alt="Forest 1"
          className="w-full md:w-[500px] rounded-xl shadow-lg"
        />
        <img
          src="/images/trees.png"
          alt="Forest 2"
          className="w-full md:w-[500px] rounded-xl shadow-lg"
        />
      </div>

      <p className="text-center max-w-5xl mb-10 text-xl font-medium leading-relaxed">
        Biodiversity refers to the variety of life on Earth—plants, animals, fungi, and microorganisms—
        and the ecosystems they form. It is essential for the balance of nature, human survival, and the
        health of the planet.
      </p>

      <div className="text-left max-w-5xl mb-10 text-lg">
        <h2 className="text-2xl font-bold mb-4">Key Facts & Statistics</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>🌱 Earth is home to an estimated 8.7 million species.</li>
          <li>🐘 Over 1 million species are currently threatened with extinction.</li>
          <li>🍽️ 75% of global food crops rely on animal pollination.</li>
          <li>🌳 Forests support over 80% of terrestrial species.</li>
        </ul>
      </div>

      <div className="text-left max-w-5xl text-lg">
        <h2 className="text-2xl font-bold mb-4">🔍 Causes of Biodiversity Loss</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Habitat destruction (e.g., deforestation, urbanization)</li>
          <li>Climate change altering natural environments</li>
          <li>Pollution in air, water, and soil</li>
          <li>Invasive species outcompeting native ones</li>
          <li>Overexploitation of wildlife and natural resources</li>
        </ul>
      </div>

      <div className="flex gap-6 mt-12">
        {/* Back button */}
        <button
          onClick={handleBackClick} // Add onClick handler to navigate back
          className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-full"
        >
          Back
        </button>

        <button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-full">
          Slide
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-full">
          Video
        </button>
      </div>
    </section>
  );
};

export default Detail;
