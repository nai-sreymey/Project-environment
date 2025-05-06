import React from 'react';

interface CardProps {
  title: string;
  image: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, image, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full sm:w-[250px] md:w-[300px] hover:shadow-lg transition overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="text-gray-600 mt-2 break-words">{description}</p>
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Detail</button>
    </div>
  );
};

export default Card;
