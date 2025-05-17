import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white/50 flex items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-green-600 border-dashed rounded-full animate-spin" />
        </div>
      )}

      <header className="bg-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigateTo("/")}
          >
            <img src="/images/pselogo.png" alt="Logo" className="h-12 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Home", path: "/" },
              { label: "About", path: "/about" },
              { label: "Category", path: "/category" },
              { label: "Event", path: "/event" },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => navigateTo(item.path)}
                className={`text-base font-semibold px-5 py-2 rounded-lg transition-all duration-300 ease-in-out
                  ${
                    isActive(item.path)
                      ? "bg-green-600 text-white shadow-md"
                      : "text-gray-800 hover:text-green-700 hover:bg-green-100"
                  }
                `}
              >
                {item.label.toUpperCase()}
              </button>
            ))}

            {/* User Dropdown */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-3 text-base font-semibold text-gray-800 hover:text-green-700 transition"
                >
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-green-600 shadow"
                  />
                  <span className="uppercase tracking-wide">{user.name}</span>
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-2xl rounded-xl w-60 z-30 overflow-hidden">
                    <div className="p-5 border-b border-gray-100">
                      <p className="text-lg font-bold text-gray-900 truncate">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => navigateTo("/profile")}
                      className="w-full text-left px-6 py-3 text-base text-green-700 font-semibold hover:bg-green-50 transition"
                    >
                      👤 View Profile
                    </button>
                    <button
                      onClick={() => {
                        localStorage.clear();
                        navigateTo("/");
                      }}
                      className="w-full text-left px-6 py-3 text-base text-red-600 font-semibold hover:bg-red-50 transition"
                    >
                      🔓 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigateTo("/login")}
                className="text-base font-semibold text-gray-800 hover:text-green-700 hover:bg-green-100 px-5 py-2 rounded-lg transition"
              >
                LOGIN
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="text-gray-700 hover:text-green-700 transition"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-xl rounded-b-xl">
            {[
              { label: "Home", path: "/" },
              { label: "About", path: "/about" },
              { label: "Category", path: "/category" },
              { label: "Event", path: "/event" },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => navigateTo(item.path)}
                className={`block w-full text-left px-6 py-3 text-base font-semibold uppercase transition
                  ${
                    isActive(item.path)
                      ? "bg-green-600 text-white shadow-inner"
                      : "text-gray-800 hover:bg-green-100 hover:text-green-700"
                  }
                `}
              >
                {item.label}
              </button>
            ))}

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigateTo("/profile")}
                  className="block w-full text-left px-6 py-3 text-base font-semibold text-green-700 hover:bg-green-100 transition"
                >
                  👤 View Profile
                </button>
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigateTo("/");
                  }}
                  className="block w-full text-left px-6 py-3 text-base font-semibold text-red-600 hover:bg-red-100 transition"
                >
                  🔓 Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigateTo("/login")}
                className="block w-full text-left px-6 py-3 text-base font-semibold text-gray-800 hover:bg-green-100 hover:text-green-700 transition"
              >
                LOGIN
              </button>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
