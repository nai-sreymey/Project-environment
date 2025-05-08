import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Example user data (replace this with actual user data, e.g., from context or API)
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    image: "/images/mey.png", // Replace with actual profile image URL
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-green-500 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center ml-24">
        <img
          src="/pse.png"
          alt="PSE EcoShare Logo"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="text-lg font-bold text-blue-700">PSE EcoShare</div>
      </div>
      <nav className="flex space-x-16 text-lg items-center mr-24">
        <a href="/" className="text-white">Home</a>
        <a href="#" className="text-white">About</a>
        <a href="#" className="text-white flex items-center gap-1">
          Project <ChevronDown className="w-4 h-4" />
        </a>
        <a href="#" className="text-white">Events</a>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-white flex items-center gap-1"
          >
            User  
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg">
              <div className="p-4 flex items-center gap-3">
                <img
                  src={user.image}
                  alt="User Profile"
                  className="w-12 h-12 rounded-full "
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
  );
};

export default Header;
