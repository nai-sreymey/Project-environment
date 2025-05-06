import { ChevronDown } from "lucide-react";

const Header = () => {
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
        <a href="#" className="text-white">User</a>
      </nav>
    </header>
  );
};

export default Header;
``