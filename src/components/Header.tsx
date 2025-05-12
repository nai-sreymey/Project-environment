import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { To, useNavigate } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    image: "/images/mey.png",
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigation = (path: To) => {
    setLoading(true); // Show spinner
    setTimeout(() => {
      navigate(path); // Navigate after delay
      setLoading(false); // Optional: in case you return to this component
    }, 700); // 2 seconds delay
  };

  return (
    <>
      {/* Full-screen Spinner */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-green-600 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      <header className="bg-green-500 text-white py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center ml-24">
          <button onClick={() => handleNavigation("/")}>
            <img
              src="/images/pselogo.png"
              alt="PSE EcoShare Logo"
              className="h-12"
            />
          </button>
        </div>

        <nav className="flex space-x-16 text-lg items-center mr-24">
          <button onClick={() => handleNavigation("/")} className="text-white">Home</button>

          <button onClick={() => handleNavigation("/about")} className="text-white">About</button>

          <button
            onClick={() => handleNavigation("/category")}
            className="text-white flex items-center gap-1"
          >
            Project <ChevronDown className="w-4 h-4" />
          </button>

          <button onClick={() => handleNavigation("/event")} className="text-white">Events</button>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white flex items-center gap-1"
            >
              User
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg z-10">
                <div className="p-4 flex items-center gap-3">
                  <img
                    src={user.image}
                    alt="User Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-bold">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
