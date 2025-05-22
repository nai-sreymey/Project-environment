import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { motion } from "framer-motion";

const categories = [
  "Water", "Food", "Energy", "Biodiversity", "Club", "Waste", "Air Quality",
] as const;

type Category = typeof categories[number];

const sampleTitles: Record<Category, string[]> = {
  Water: ["Clean Water Drive", "River Cleanup", "Water Conservation Workshop"],
  Food: ["Community Garden Project", "Sustainable Food Fair", "Organic Farming Seminar"],
  Energy: ["Solar Power Installation", "Energy Saving Tips", "Green Energy Expo"],
  Biodiversity: ["Wildlife Protection Campaign", "Tree Planting Day", "Bird Watching Event"],
  Club: ["Eco Club Meetup", "Youth Green Club", "Volunteer Gathering"],
  Waste: ["Plastic-Free Challenge", "Recycling Workshop", "Zero Waste Week"],
  "Air Quality": ["Air Pollution Awareness", "Bike to Work Day", "Tree Shade Campaign"],
};

interface Event {
  title: string;
  content: string;
  date: string;
  time: string;
  location: string;
  createdBy: string;
  publishedOn: string;
  image: string;
  category: Category;
}

const allEvents: Event[] = Array.from({ length: 50 }).map((_, i) => {
  const category = categories[i % categories.length];
  const titlesForCat = sampleTitles[category];
  const title = titlesForCat[i % titlesForCat.length];
  const content = `This event aims to raise awareness and encourage action in the ${category.toLowerCase()} sector. Everyone is welcome to join and contribute to a greener future. Together, we can make a difference by engaging with our community and supporting environmental goals.`;
  const dateNum = 20 + (i % 10);
  const publishedNum = 15 + (i % 10);

  return {
    title,
    content,
    date: `May ${dateNum}, 2025`,
    time: "9:00 AM - 12:00 PM",
    location: "Phnom Penh Center",
    createdBy: "Nai Sreymey",
    publishedOn: `May ${publishedNum}, 2025`,
    image: "/images/trees.png",
    category,
  };
});

const EventPage: React.FC = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = allEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleEvents = filteredEvents.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredEvents.length));
  };

  useEffect(() => {
    setVisibleCount(6);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-300 font-sans text-green-900">
      <Header />
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-16">
        <h1 className="text-5xl font-extrabold text-center mb-4 drop-shadow-lg">
          🌍 Environmental Events
        </h1>
        <p className="text-center text-lg text-green-800 max-w-2xl mx-auto mb-10">
          Join us in creating a sustainable world. Browse and participate in upcoming events near you.
        </p>

        <input
          type="text"
          placeholder="🔍 Search events by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xl mx-auto block mb-12 px-5 py-3 text-green-900 placeholder-green-600 rounded-xl border-2 border-green-500 shadow-md focus:outline-none focus:ring-4 focus:ring-green-600 transition"
        />

        {visibleEvents.length === 0 && (
          <p className="text-center text-xl font-semibold mt-10">No events found.</p>
        )}

        <div className="grid grid-cols-1 gap-16">
          {visibleEvents.map((event, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center md:items-stretch gap-10 bg-white bg-opacity-80 border border-green-400 rounded-3xl shadow-xl overflow-hidden transition hover:shadow-2xl"
            >
              <div className="w-full md:w-2/3 h-80 md:h-auto relative">
                <motion.img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-3 text-green-100 font-medium">
                  {event.date} | {event.time}
                </div>
              </div>

              <div className="p-6 md:w-1/2 space-y-4">
                <h2 className="text-2xl font-bold text-green-800">{event.title}</h2>
                <p className="text-gray-800 text-sm leading-relaxed">
                  {event.content.length > 200
                    ? event.content.slice(0, 200) + "..."
                    : event.content}
                </p>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>📍 Location: {event.location}</p>
                  <p>✍️ By: {event.createdBy}</p>
                  <p>📢 Published: {event.publishedOn}</p>
                </div>

                <button
                  onClick={() => navigate(`/events/${i}`)}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow transition duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < filteredEvents.length && (
          <button
            onClick={handleShowMore}
            className="mt-16 block mx-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transition"
          >
            Show More Events
          </button>
        )}
      </main>
    </div>
  );
};

export default EventPage;
