import { useState } from "react";
import { To, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Simulate user being null if not logged in
  const [user, setUser] = useState<null | {
    name: string;
    email: string;
    image: string;
  }>(null);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path: To) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
      setIsMobileMenuOpen(false);
    }, 700);
  };

  const handleLoginClick = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate login and set user info
      setUser({
        name: "John Doe",
        email: "johndoe@example.com",
        image: "/images/mey.png",
      });
      setLoading(false);
    }, 700);
  };

  const handleProfileClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/profile");
      setLoading(false);
      setIsUserDropdownOpen(false);
      setIsMobileMenuOpen(false);
    }, 700);
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-green-600 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      <header className="bg-green-500 text-white py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center">
          <button onClick={() => handleNavigation("/")}>
            <img
              src="/images/pselogo.png"
              alt="PSE EcoShare Logo"
              className="h-12"
            />
          </button>
        </div>

        <div className="lg:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <nav className="hidden lg:flex space-x-16 text-lg items-center">
          <button onClick={() => handleNavigation("/")} className="hover:bg-green-700 transition px-4 py-2 rounded-lg">
            Home
          </button>
          <button onClick={() => handleNavigation("/about")} className="hover:bg-green-700 transition px-4 py-2 rounded-lg">
            About
          </button>
          <button onClick={() => handleNavigation("/category")} className="hover:bg-green-700 transition px-4 py-2 rounded-lg">
            Project
          </button>
          <button onClick={() => handleNavigation("/event")} className="hover:bg-green-700 transition px-4 py-2 rounded-lg">
            Events
          </button>

          {/* User/Login */}
          {!user ? (
            <button onClick={handleLoginClick} className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-200">
              Login
            </button>
          ) : (
            <div className="relative">
              <button onClick={toggleUserDropdown} className="flex items-center gap-2">
                <img src={user.image} alt="User" className="w-8 h-8 rounded-full" />
                <span>{user.name}</span>
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg z-10">
                  <div className="p-4 flex items-center gap-3">
                    <img src={user.image} alt="User" className="w-12 h-12 rounded-full" />
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                      <button onClick={handleProfileClick} className="mt-2 text-blue-500 hover:underline">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-0 right-0 w-72 bg-gray-800 text-white p-6 z-40">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-semibold">Menu</span>
            <button onClick={toggleMobileMenu}><X className="w-6 h-6" /></button>
          </div>
          <div className="flex flex-col space-y-2">
            <button onClick={() => handleNavigation("/")} className="hover:bg-green-600 px-4 py-2 rounded-lg">
              Home
            </button>
            <button onClick={() => handleNavigation("/about")} className="hover:bg-green-600 px-4 py-2 rounded-lg">
              About
            </button>
            <button onClick={() => handleNavigation("/category")} className="hover:bg-green-600 px-4 py-2 rounded-lg">
              Project
            </button>
            <button onClick={() => handleNavigation("/event")} className="hover:bg-green-600 px-4 py-2 rounded-lg">
              Events
            </button>
            <div className="border-t border-gray-600 pt-4 mt-4">
              {!user ? (
                <button onClick={handleLoginClick} className="text-blue-400 hover:underline">
                  Login
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <img src={user.image} alt="User" className="w-10 h-10 rounded-full" />
                  <div>
                  {user && <div className="font-bold">{user.name}</div>}
                  <div className="text-sm text-gray-300">{user.email}</div>
                    <button onClick={handleProfileClick} className="mt-1 text-blue-400 hover:underline">
                      View Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
