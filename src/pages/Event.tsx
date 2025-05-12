import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../components/Header";

export const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`mt-2 text-left ${className}`}>{children}</div>;
};

const EventPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="bg-green-100 min-h-screen text-center font-sans flex flex-col">
      <Header />

      <section className="py-10 px-4 flex-grow">
        <h2 className="text-4xl font-extrabold text-black">
          Event PSE environment
        </h2>
        <p className="text-green-800 text-lg mt-3">
          🌱 Join us to help nature, make friends, and learn new things. Grow,
          share, and make a positive impact! 🌍
        </p>

        <div className="max-w-5xl mx-auto mt-12 space-y-10">
          {/* Tree Planting Event */}
          <Card className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src="/images/trees.png"
              alt="Tree Planting Event"
              className="w-40 h-40 object-cover rounded-xl"
            />
            <CardContent>
              <h3 className="text-2xl font-bold text-green-800">
                🌳 Tree Planting Event
              </h3>
              <p className="mt-2 text-gray-700">
                Trees are vital for our environment. We plant them on unused
                land to help improve air quality and provide beauty. Let's
                contribute to a greener world!
              </p>
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p><strong>Date:</strong> May 20, 2025</p>
                <p><strong>Time:</strong> 8:00 AM - 11:30 AM</p>
                <p><strong>Location:</strong> Phnom Penh Community Park</p>
              </div>
            </CardContent>
          </Card>

          {/* Plastic-Free Challenge */}
          <Card className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src="/images/trees.png"
              alt="Plastic-Free Challenge"
              className="w-40 h-40 object-cover rounded-xl"
            />
            <CardContent>
              <h3 className="text-2xl font-bold text-green-800">
                🚫 Plastic-Free Challenge
              </h3>
              <p className="mt-2 text-gray-700">
                Can you go one week without plastic? Join our challenge, ditch
                plastic straws, bottles, and bags. Eco-friendly prizes await the
                winners!
              </p>
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p><strong>Date:</strong> May 22–28, 2025</p>
                <p><strong>Time:</strong> All Day</p>
                <p><strong>Location:</strong> Online & Local Markets</p>
              </div>
            </CardContent>
          </Card>

          {/* Green Art Contest */}
          <Card className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src="/images/trees.png"
              alt="Green Art Contest"
              className="w-40 h-40 object-cover rounded-xl"
            />
            <CardContent>
              <h3 className="text-2xl font-bold text-green-800">
                🎨 Green Art Contest
              </h3>
              <p className="mt-2 text-gray-700">
                Express your creativity to save the Earth! Submit art using
                recycled materials. Show how you care for nature through your
                talent!
              </p>
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p><strong>Date:</strong> May 25, 2025</p>
                <p><strong>Time:</strong> 1:00 PM - 4:00 PM</p>
                <p><strong>Location:</strong> PSE Art Center Hall</p>
              </div>
            </CardContent>
          </Card>

          {/* Eco Hero Awards */}
          <Card className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src="/images/trees.png"
              alt="Eco Hero Awards"
              className="w-40 h-40 object-cover rounded-xl"
            />
            <CardContent>
              <h3 className="text-2xl font-bold text-green-800">
                🏆 Eco Hero Awards
              </h3>
              <p className="mt-2 text-gray-700">
                We celebrate those who actively protect our planet! Whether it's
                cleaning up, planting trees, or recycling—be our Eco Hero and
                earn a certificate of recognition!
              </p>
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p><strong>Date:</strong> May 30, 2025</p>
                <p><strong>Time:</strong> 3:00 PM - 6:00 PM</p>
                <p><strong>Location:</strong> PSE Auditorium</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Back Button */}
      <div className="mt-auto mb-6">
        <button
          onClick={handleBackClick}
          className="px-6 py-3 bg-gray-400 text-white rounded-full hover:bg-gray-600"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default EventPage;
