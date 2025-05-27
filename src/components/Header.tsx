
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FiBook } from "react-icons/fi";


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
          ${isActive(path)
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
                  className={`absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-xl overflow-hidden z-40 transition-opacity duration-300 ease-in-out ${isUserDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
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
                    onClick={() => navigateTo("/byme")}
                    className="w-full text-left px-6 py-3 text-sm font-semibold text-green-700 hover:bg-green-50 transition flex items-center gap-2"
                    role="menuitem"
                    tabIndex={isUserDropdownOpen ? 0 : -1}
                  >
                    <FiBook size={18} /> My Projects
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
          ${isActive(path)
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