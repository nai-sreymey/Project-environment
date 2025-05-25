
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { motion } from "framer-motion";

interface Event {
  id: number;
  title: string;
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
  attachments?: { url?: string }[];
  category?: string;
}

const EventPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:1337/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();

        const mappedEvents: Event[] = data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          location: item.location,
          start_time: item.start_time,
          end_time: item.end_time,
          createdAt: item.createdAt,
          publishedAt: item.publishedAt,
          publish_date: item.publish_date,
          publish_by: item.publish_by,
          participants: item.participants,
          purpose: item.purpose,
          number_participants: item.number_participants,
          manager: item.manager,
          attachments: item.attachments,
          category: item.category,
        }));

        setEvents(mappedEvents);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Memoize filtered events to avoid unnecessary filtering on every render
  const filteredEvents = useMemo(
    () =>
      events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [events, searchTerm]
  );

  // Memoize visible events
  const visibleEvents = useMemo(
    () => filteredEvents.slice(0, visibleCount),
    [filteredEvents, visibleCount]
  );

  // Reset visible count when search term changes
  useEffect(() => {
    setVisibleCount(6);
  }, [searchTerm]);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredEvents.length));
  };

  // Fallback image by category
  const getFallbackImage = (category?: string) => {
    const catName = category?.toLowerCase() || "";
    if (catName.includes("tree")) return "/images/trees.png";
    if (catName.includes("flower")) return "/images/flower.jpg";
    return "/images/flowers.png";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-300 font-sans text-green-900">
      <Header />
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-16">
        <h1 className="text-5xl font-extrabold text-center mb-4 drop-shadow-lg">
          🌍 Environmental Events
        </h1>
        <p className="text-center text-lg text-green-800 max-w-2xl mx-auto mb-10">
          Join us in creating a sustainable world. Browse and participate in
          upcoming events near you.
        </p>

        <label htmlFor="search-events" className="sr-only">
          Search Events
        </label>
        <input
          id="search-events"
          type="text"
          placeholder="🔍 Search events by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xl mx-auto block mb-12 px-5 py-3 text-green-900 placeholder-green-600 rounded-xl border-2 border-green-500 shadow-md focus:outline-none focus:ring-4 focus:ring-green-600 transition"
        />

        {/* Loading spinner */}
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

        {/* Error message */}
        {error && (
          <p className="text-center text-xl font-semibold mt-10 text-red-600">
            {error}
          </p>
        )}

        {/* No events found */}
        {!loading && !error && visibleEvents.length === 0 && (
          <p className="text-center text-xl font-semibold mt-10">
            No events found.
          </p>
        )}

        <div className="grid grid-cols-1 gap-16">
          {!loading &&
            !error &&
            visibleEvents.map((event) => {
              const imageUrl =
                event.attachments?.[0]?.url || getFallbackImage(event.category);

              return (
                <div
                  key={event.id}
                  className="flex flex-col md:flex-row items-center md:items-stretch gap-10 bg-white bg-opacity-80 border border-green-400 rounded-3xl shadow-xl overflow-hidden transition hover:shadow-2xl"
                >
                  <div className="w-full md:w-2/3 h-80 md:h-auto relative">
                    <motion.img
                      src={imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-3 text-green-100 font-medium">
                      {new Date(event.start_time).toLocaleDateString()} |{" "}
                      {new Date(event.start_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(event.end_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  <div className="p-6 md:w-1/2 space-y-4">
                    <h2 className="text-2xl font-bold text-green-800">
                      {event.title}
                    </h2>
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {event.description.length > 200
                        ? event.description.slice(0, 200) + "..."
                        : event.description}
                    </p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        🎯 <strong>Purpose:</strong> {event.purpose || "N/A"}
                      </p>
                      <p>📍 Location: {event.location}</p>
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
                        📢 <strong>Published At:</strong>{" "}
                        {event.publishedAt
                          ? new Date(event.publishedAt).toLocaleString()
                          : "Not published"}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate(`/events/${event.id}`)}
                      className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow transition duration-300"
                      aria-label={`View details for event ${event.title}`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        {!loading && visibleCount < filteredEvents.length && (
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

export default Header;
