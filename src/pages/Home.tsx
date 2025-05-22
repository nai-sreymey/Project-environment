import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";

const CategoryList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("jwt");

  const handleCreateProject = () => {
    setLoading(true);
    setTimeout(() => {
      if (isAuthenticated) {
        navigate("/post");
      } else {
        navigate("/login");
      }
    }, 700);
  };

  return (
    <>
      <Header />
      <HeroSection />

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {/* Info + Video Section */}
      <section className="bg-green-100 px-6 md:px-24 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-green-50 p-16 rounded-xl shadow-md">
          {/* Text Content */}
          <div className="  text-gray-800 text-64 leading-relaxed space-y-4 h-96">
            <p>
              Pour un Sourire d’Enfant – For a Child’s Smile (PSE) – is a non-profit
              organization operating in Cambodia since 1995 to help children suffering
              acute hardship by reintegrating them into society and by creating a safe
              and appropriate environment for them to study and to learn a trade that is
              as highly qualified as possible.
            </p>
            <p>
              PSE is operating six main programs that meet children needs: nutrition,
              healthcare, protection and accommodation, general education, vocational
              training, and family support.
            </p>
            <p>
              Currently, PSE is taking care of 6,500 children. 4,000 graduates from the
              PSE Vocational Training program have successfully integrated into the job
              market with real qualified positions.
            </p>
            <p>
              PSE employs around 650 Cambodian people and 300 volunteers globally.
              In 2000, PSE was awarded the French Human Rights Prize by the French Republic.
            </p>
          </div>

          {/* YouTube Video */}
          <div className="w-full h-64 md:h-auto">
          <iframe
  className="w-full h-full rounded-xl min-h-[300px]"
  src="https://www.youtube.com/embed/G9t__9Tmwv4"
  title="PSE EcoShare Video"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryList;
