// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import { motion } from "framer-motion";

// const categories = [
//   "Water", "Food", "Energy", "Biodiversity", "Club", "Waste", "Air Quality",
// ] as const;

// type Category = typeof categories[number];

// const sampleTitles: Record<Category, string[]> = {
//   Water: ["Clean Water Drive", "River Cleanup", "Water Conservation Workshop"],
//   Food: ["Community Garden Project", "Sustainable Food Fair", "Organic Farming Seminar"],
//   Energy: ["Solar Power Installation", "Energy Saving Tips", "Green Energy Expo"],
//   Biodiversity: ["Wildlife Protection Campaign", "Tree Planting Day", "Bird Watching Event"],
//   Club: ["Eco Club Meetup", "Youth Green Club", "Volunteer Gathering"],
//   Waste: ["Plastic-Free Challenge", "Recycling Workshop", "Zero Waste Week"],
//   "Air Quality": ["Air Pollution Awareness", "Bike to Work Day", "Tree Shade Campaign"],
// };

// interface Event {
//   title: string;
//   content: string;
//   date: string;
//   time: string;
//   location: string;
//   createdBy: string;
//   publishedOn: string;
//   image: string;
//   category: Category;
// }

// const allEvents: Event[] = Array.from({ length: 50 }).map((_, i) => {
//   const category = categories[i % categories.length];
//   const titlesForCat = sampleTitles[category];
//   const title = titlesForCat[i % titlesForCat.length];
//   const content = `This event aims to raise awareness and encourage action in the ${category.toLowerCase()} sector. Everyone is welcome to join and contribute to a greener future. Together, we can make a difference by engaging with our community and supporting environmental goals.`;
//   const dateNum = 20 + (i % 10);
//   const publishedNum = 15 + (i % 10);

//   return {
//     title,
//     content,
//     date: `May ${dateNum}, 2025`,
//     time: "9:00 AM - 12:00 PM",
//     location: "Phnom Penh Center",
//     createdBy: "Nai Sreymey",
//     publishedOn: `May ${publishedNum}, 2025`,
//     image: "/images/trees.png",
//     category,
//   };
// });

// const EventPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [visibleCount, setVisibleCount] = useState(6);
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredEvents = allEvents.filter((event) =>
//     event.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const visibleEvents = filteredEvents.slice(0, visibleCount);

//   const handleShowMore = () => {
//     setVisibleCount((prev) => Math.min(prev + 6, filteredEvents.length));
//   };

//   useEffect(() => {
//     setVisibleCount(6);
//   }, [searchTerm]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-300 font-sans text-green-900">
//       <Header />
//       <main className="max-w-7xl mx-auto px-6 pt-16 pb-16">
//         <h1 className="text-5xl font-extrabold text-center mb-4 drop-shadow-lg">
//           🌍 Environmental Events
//         </h1>
//         <p className="text-center text-lg text-green-800 max-w-2xl mx-auto mb-10">
//           Join us in creating a sustainable world. Browse and participate in upcoming events near you.
//         </p>

//         <input
//           type="text"
//           placeholder="🔍 Search events by title..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full max-w-xl mx-auto block mb-12 px-5 py-3 text-green-900 placeholder-green-600 rounded-xl border-2 border-green-500 shadow-md focus:outline-none focus:ring-4 focus:ring-green-600 transition"
//         />

//         {visibleEvents.length === 0 && (
//           <p className="text-center text-xl font-semibold mt-10">No events found.</p>
//         )}

//         <div className="grid grid-cols-1 gap-16">
//           {visibleEvents.map((event, i) => (
//             <div
//               key={i}
//               className="flex flex-col md:flex-row items-center md:items-stretch gap-10 bg-white bg-opacity-80 border border-green-400 rounded-3xl shadow-xl overflow-hidden transition hover:shadow-2xl"
//             >
//               <div className="w-full md:w-2/3 h-80 md:h-auto relative">
//                 <motion.img
//                   src={event.image}
//                   alt={event.title}
//                   className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                   loading="lazy"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-3 text-green-100 font-medium">
//                   {event.date} | {event.time}
//                 </div>
//               </div>

//               <div className="p-6 md:w-1/2 space-y-4">
//                 <h2 className="text-2xl font-bold text-green-800">{event.title}</h2>
//                 <p className="text-gray-800 text-sm leading-relaxed">
//                   {event.content.length > 200
//                     ? event.content.slice(0, 200) + "..."
//                     : event.content}
//                 </p>

//                 <div className="text-sm text-gray-600 space-y-1">
//                   <p>📍 Location: {event.location}</p>
//                   <p>✍️ By: {event.createdBy}</p>
//                   <p>📢 Published: {event.publishedOn}</p>
//                 </div>

//                 <button
//                   onClick={() => navigate(`/events/${i}`)}
//                   className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow transition duration-300"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {visibleCount < filteredEvents.length && (
//           <button
//             onClick={handleShowMore}
//             className="mt-16 block mx-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transition"
//           >
//             Show More Events
//           </button>
//         )}
//       </main>
//     </div>
//   );
// };

// export default EventPage;



import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = !!localStorage.getItem("jwt");
  const user = {
    name: localStorage.getItem("username") || "Guest",
    email: localStorage.getItem("userEmail") || "guest@example.com",
    image: "/images/profile.png",
  };

  const navigateTo = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
      setIsMobileMenuOpen(false);
      setIsUserDropdownOpen(false);
    }, 600);
  };

  const isActive = (path: string) => location.pathname === path;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    }
    if (isUserDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  return (
    <>
      {loading && (
        <div
          className="fixed inset-0 bg-white/50 flex items-center justify-center z-[999]"
          role="alert"
          aria-live="assertive"
        >
          <div className="w-10 h-10 border-4 border-green-600 border-dashed rounded-full animate-spin" />
          <span className="sr-only">Loading...</span>
        </div>
      )}

      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-32 py-4 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigateTo("/")}
            aria-label="Go to Home"
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigateTo("/");
              }
            }}
          >
            <img
              src="/images/pselogo.png"
              alt="Logo"
              className="h-12 w-auto"
              draggable={false}
            />
          </div>

          {/* Navigation */}
          <nav
            className="hidden md:flex items-center gap-x-4 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-inner"
            aria-label="Primary Navigation"
          >
            {["Home", "About", "Projects", "Event"].map((label) => {
              const path =
                label.toLowerCase() === "home" ? "/" : `/${label.toLowerCase()}`;
              return (
                <button
                  key={path}
                  onClick={() => navigateTo(path)}
                  className={`text-sm font-semibold px-4 py-2 rounded-full transition
                    duration-300 ease-in-out transform
                    ${
                      isActive(path)
                        ? "bg-green-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-green-100 hover:text-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
                    }`}
                  aria-current={isActive(path) ? "page" : undefined}
                  aria-label={`Go to ${label}`}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Right side: User and Mobile Menu */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop User Dropdown */}
            {isLoggedIn ? (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-3 text-sm font-medium text-gray-800 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                  aria-haspopup="true"
                  aria-expanded={isUserDropdownOpen}
                  aria-label="User menu"
                >
                  <img
                    src={user.image}
                    alt={`${user.name}'s profile`}
                    className="w-10 h-10 rounded-full border-2 border-green-600 shadow-sm object-cover"
                    draggable={false}
                  />
                  <span className="uppercase tracking-wide select-none hidden sm:inline">
                    {user.name}
                  </span>
                </button>
                <div
                  className={`absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-xl overflow-hidden z-40 transition-opacity duration-300 ease-in-out ${
                    isUserDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                  role="menu"
                  aria-label="User dropdown menu"
                >
                  <div className="px-5 py-4 border-b">
                    <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => navigateTo("/profile")}
                    className="w-full text-left px-6 py-3 text-sm font-semibold text-green-700 hover:bg-green-50 transition"
                    role="menuitem"
                    tabIndex={isUserDropdownOpen ? 0 : -1}
                  >
                    👤 View Profile
                  </button>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      navigateTo("/");
                    }}
                    className="w-full text-left px-6 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                    role="menuitem"
                    tabIndex={isUserDropdownOpen ? 0 : -1}
                  >
                    🔓 Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigateTo("/login")}
                className="hidden md:block text-sm font-semibold px-6 py-2 rounded-full border border-gray-300 hover:border-green-600 hover:bg-green-100 text-gray-800 hover:text-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Login"
              >
                LOGIN
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav
            className="md:hidden bg-white shadow-xl border-t rounded-b-xl py-3"
            aria-label="Mobile Navigation"
          >
            {["Home", "About", "Projects", "Event"].map((label) => {
              const path =
                label.toLowerCase() === "home" ? "/" : `/${label.toLowerCase()}`;
              return (
                <button
                  key={path}
                  onClick={() => navigateTo(path)}
                  className={`block w-full text-left px-6 py-3 text-sm font-semibold uppercase transition
                    ${
                      isActive(path)
                        ? "bg-green-600 text-white"
                        : "text-gray-800 hover:bg-green-100 hover:text-green-700"
                    }`}
                  aria-current={isActive(path) ? "page" : undefined}
                  aria-label={`Go to ${label}`}
                >
                  {label}
                </button>
              );
            })}

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigateTo("/profile")}
                  className="block w-full text-left px-6 py-3 text-sm font-semibold text-green-700 hover:bg-green-100 transition"
                >
                  👤 View Profile
                </button>
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigateTo("/");
                  }}
                  className="block w-full text-left px-6 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 transition"
                >
                  🔓 Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigateTo("/login")}
                className="block w-full text-left px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-green-100 hover:text-green-700 transition"
              >
                LOGIN
              </button>
            )}
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
