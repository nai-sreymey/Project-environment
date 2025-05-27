
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { motion } from "framer-motion";

interface Event {
  id: number;
  Title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  createdAt: string;
  publishedAt: string;
  publish_date: string | null;
  publish_by: string | null;
  participants: string | null;
  purpose: string | null;
  number_participants: string | null;
  manager: string | null;
  attachments?: {
    url?: string;
    formats?: {
      thumbnail?: { url: string };
      url: string;

      large?: {
        url: string;
      };
    };
  }[];
  category?: string;
}

const BASE_URL = "http://localhost:1337";

const imageUrl = (
  attachments?: { url?: string; formats?: { large?: { url: string } } }[],
  category?: string
): string => {
  if (attachments && attachments.length > 0) {
    const largeFormatUrl = attachments[0].formats?.large?.url;
    if (largeFormatUrl) return BASE_URL + largeFormatUrl;
    if (attachments[0].url) return BASE_URL + attachments[0].url;
  }

  switch (category?.toLowerCase()) {
    case "environment":
      return "/images/environment-default.jpg";
    case "water":
      return "/images/water-default.jpg";
    case "food":
      return "/images/food-default.jpg";
    default:
      return "/images/default-event.jpg";
  }
};
const getFullImageUrl = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `http://localhost:1337${url}`;
};

const EventPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
console.log(events)
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "http://localhost:1337/api/events?populate=attachments"
        );
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();

  



        setEvents(data.data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = useMemo(
    () =>
      events.filter((event) =>
        event.Title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [events, searchTerm]
  );

  const visibleEvents = useMemo(
    () => filteredEvents.slice(0, visibleCount),
    [filteredEvents, visibleCount]
  );

  useEffect(() => {
    setVisibleCount(3);
  }, [searchTerm]);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredEvents.length));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b bg-green-50  font-inter text-green-900">
      <Header />
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-16">
        <h1 className="text-5xl font-bold text-center mb-4 drop-shadow-lg">
          🌍 Environmental Events
        </h1>
        <p className="text-center text-lg text-green-800 max-w-2xl mx-auto mb-10">
          Join us in creating a sustainable world. Browse and participate in
          upcoming events near you.
        </p>

        <input
          type="text"
          placeholder="🔍 Search events by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xl mx-auto block mb-12 px-5 py-3 text-green-900 placeholder-green-600 rounded-xl border-2 border-green-500 shadow-md focus:outline-none focus:ring-4 focus:ring-green-600 transition"
        />

        {loading && (
          <p className="text-center text-xl font-semibold mt-10 flex justify-center items-center gap-3">
            <svg
              className="animate-spin h-6 w-6 text-green-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Loading events...
          </p>
        )}

        {error && (
          <p className="text-center text-xl font-semibold mt-10 text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && visibleEvents.length === 0 && (
          <p className="text-center text-xl font-semibold mt-10 text-gray-700">
            No events match "<strong>{searchTerm}</strong>". Try a different
            title.
          </p>
        )}

        <div className="grid grid-cols-1 gap-16">
          {!loading &&
            !error &&
            visibleEvents.map((event) => {
              const imageUrl = getFullImageUrl(event.attachments?.[0]?.url);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row items-center md:items-stretch gap-10 bg-white bg-opacity-80 border border-green-400 rounded-3xl shadow-xl overflow-hidden transition hover:shadow-2xl"
                >
                  <div className="w-full md:w-2/3 aspect-video md:aspect-auto relative">
                    <img
                      src={imageUrl}
                      alt={event.Title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                    {event.category && (
                      <div className="absolute top-3 right-3 bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                        {event.category}
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-3 text-green-100 font-medium">
                      {new Date(event.start_time).toLocaleDateString()} |{" "}
                      {new Date(event.start_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })} {" "}-{" "}
                      {new Date(event.end_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  <div className="p-6 md:w-1/2 space-y-4">
                    <h2 className="text-2xl font-bold text-green-800">
                      {event.Title}
                    </h2>
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {event.description.length > 200
                        ? event.description.slice(0, 200) + "..."
                        : event.description}
                    </p>
                    <div className="text-sm text-gray-600 space-y-1 ">
                      <p>
                        🎯 <strong>Purpose:</strong> {event.purpose || "N/A"}
                      </p>
                      <p>📍<strong> Location: </strong>{event.location}</p>
                      <p>
                        👤 <strong>Manager:</strong> {event.manager || "N/A"}
                      </p>
                      <p>
                        👥 <strong>Participants:</strong>{" "}
                        {event.participants || "N/A"}
                      </p>
                      <p>
                        🧑‍🤝‍🧑 <strong>Number Participants:</strong>{" "}
                        {event.number_participants || "N/A"}
                      </p>
                      <p>
                        🗓️ <strong>Publish Date:</strong>{" "}
                        {event.publish_date
                          ? new Date(event.publish_date).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <p>
                        📝 <strong>Published By:</strong>{" "}
                        {event.publish_by || "N/A"}
                      </p>
                      <p>
                        🕒 <strong>Created At:</strong>{" "}
                        {new Date(event.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/event/${event.id} `)}
                      className="bg-green-600 text-white rounded-xl py-3 px-8 font-bold hover:bg-green-700 transition"
                      key={event.id}   >
                      View Details
                    </button>
                  </div>
                </motion.div>
              );
            })}
        </div>

        {!loading && !error && visibleCount < filteredEvents.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleShowMore}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition"
            >
              Show More
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default EventPage;
