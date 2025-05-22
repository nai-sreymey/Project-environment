import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { motion } from "framer-motion";

// Card UI
export const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 border border-gray-200 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`mt-2 text-left w-full ${className}`}>{children}</div>;
};

// Events Data
const uniqueEvents = Array.from(
  new Map(
    [
      {
        title: "🌳 Tree Planting Event",
        description:
          "Trees are vital for our environment. We plant them on unused land to help improve air quality and provide beauty.",
        date: "May 20, 2025",
        time: "8:00 AM - 11:30 AM",
        location: "Phnom Penh Community Park",
        image: "/images/trees.png",
        createdBy: "Nai Sreymey",
      },
      {
        title: "🚫 Plastic-Free Challenge",
        description:
          "Can you go one week without plastic? Join our challenge and win eco-friendly prizes!",
        date: "May 22–28, 2025",
        time: "All Day",
        location: "Online & Local Markets",
        image: "/images/trees.png",
        createdBy: "Nai Sreymey",
      },
      {
        title: "🎨 Green Art Contest",
        description:
          "Express creativity using recycled materials. Show how you care for nature!",
        date: "May 25, 2025",
        time: "1:00 PM - 4:00 PM",
        location: "PSE Art Center Hall",
        image: "/images/trees.png",
        createdBy: "Nai Sreymey",
      },
      {
        title: "🏆 Eco Hero Awards",
        description:
          "We celebrate those who actively protect our planet—become our Eco Hero!",
        date: "May 30, 2025",
        time: "3:00 PM - 6:00 PM",
        location: "PSE Auditorium",
        image: "/images/trees.png",
        createdBy: "Nai Sreymey",
      },
      {
        title: "♻️ Recycling Workshop",
        description:
          "Learn how to recycle properly and reduce waste in your daily life.",
        date: "June 2, 2025",
        time: "10:00 AM - 1:00 PM",
        location: "PSE Workshop Room",
        image: "/images/trees.png",
        createdBy: "Nai Sreymey",
      },
      {
        title: "🧼 Community Clean-up Day",
        description:
          "Join hands to clean the streets and parks. Let’s keep our community clean and green!",
        date: "June 5, 2025",
        time: "7:00 AM - 12:00 PM",
        location: "City Street Area",
        image: "/images/trees.png",
        createdBy: "Nai Sreymey",
      },
    ].map((e) => [e.title + e.date, e])
  ).values()
);



const EventPage = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(3);
  const [search, setSearch] = useState("");
  const [reactionMap, setReactionMap] = useState<Record<string, string>>({});

  const handleBackClick = () => navigate(-1);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, filteredEvents.length));
  };

  const setReaction = (eventId: string, emoji: string) => {
    setReactionMap((prev) => ({
      ...prev,
      [eventId]: prev[eventId] === emoji ? "" : emoji,
    }));
  };

  const filteredEvents = uniqueEvents.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-green-50 min-h-screen text-center font-sans flex flex-col">
      <Header />

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={handleBackClick}
          className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-800 transition duration-200"
        >
          ← Back
        </button>
      </div>

      {/* Content Section */}
      <section className="container mx-auto py-14 px-4 md:px-10 flex-grow">
        <h2 className="text-4xl font-extrabold text-green-900">
          🌿 PSE Environmental Events
        </h2>
        <p className="text-green-700 text-lg mt-3 max-w-2xl mx-auto">
          Join us to help nature, make friends, and learn new things. Grow,
          share, and make a positive impact! 🌍
        </p>

        {/* Search Bar */}
        <div className="mt-8 mb-6">
          <input
            type="text"
            placeholder="🔍 Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-5 py-3 rounded-full border border-green-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Event Cards */}
        <div className="grid gap-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.slice(0, visibleCount).map((event, index) => {
            const id = event.title + event.date;
            const selectedEmoji = reactionMap[id] || "";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <CardContent>
                    <h3 className="text-2xl font-bold text-green-900">
                      {event.title}
                    </h3>
                    <hr className="my-2 border-green-200" />
                    <p className="text-gray-600">{event.description}</p>
                    <p className="mt-3 text-sm text-gray-500">
                      📅 {event.date} | 🕒 {event.time}
                    </p>
                    <p className="text-sm text-gray-500">📍 {event.location}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      👤 {event.createdBy}
                    </p>
                    <span className="inline-block mt-3 px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Environmental
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Show More Button */}
        {visibleCount < filteredEvents.length && (
          <div className="mt-14 flex justify-center">
            <button
              onClick={handleShowMore}
              className="px-8 py-4 text-lg bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-800 transition-all duration-300"
            >
              Show More Events
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-6 text-center text-sm mt-auto">
        © 2025 PSE Environmental Events. All rights reserved.
      </footer>
    </div>
  );
};

export default EventPage;
