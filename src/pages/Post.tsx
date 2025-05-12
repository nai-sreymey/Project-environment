import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

interface MediaItem {
  url: string;
  type: "image" | "video";
}

interface Member {
  email: string;
  avatar: string;
}

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [slideLinks, setSlideLinks] = useState<string[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newMedia: MediaItem[] = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "video"
    }));
    setMedia((prev) => [...prev, ...newMedia]);
  };

  const handleAddMember = () => {
    if (!newEmail.trim()) return;
    const avatarUrl = "/images/mey.png";
    setMembers((prev) => [...prev, { email: newEmail.trim(), avatar: avatarUrl }]);
    setNewEmail("");
  };

  const handleAddSlideLink = () => {
    const link = prompt("Please enter the slide link (e.g., Google Slides)");
    if (link && link.trim() !== "") {
      setSlideLinks((prev) => [...prev, link.trim()]);
    }
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        navigate("/");
      }, 5000);
    }, 1500);
  };

  const canSubmit = description.trim() !== "" && category !== "" && media.length > 0;

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, [submitted, navigate]);

  return (
    <div className="min-h-screen bg-green-100 font-sans text-lg relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center text-white z-50">
          <div className="text-center animate-pulse">
            <h2 className="text-3xl font-semibold">Submitting...</h2>
            <div className="mt-4 spinner"></div>
          </div>
        </div>
      )}

      {submitted && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center text-gray-800 z-50 transition-opacity duration-500">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-semibold text-green-700">Waiting for Teacher's Approval</h2>
            <p className="text-lg">Your post has been submitted and is currently under review.</p>
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-gray-500">Redirecting in a few seconds...</p>
          </div>
        </div>
      )}

      <Header />

      <div className="max-w-3xl mx-auto py-10 px-4 text-center">
        {/* Members */}
        <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
          {members.slice(0, 4).map((member, index) => (
            <img
              key={index}
              src={member.avatar}
              alt="member"
              className="w-16 h-16 rounded-full border"
            />
          ))}
          {members.length > 4 && (
            <div className="w-16 h-16 rounded-full border flex items-center justify-center bg-white">
              +{members.length - 4}
            </div>
          )}
        </div>

        {/* Add Member */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <input
            type="email"
            placeholder="Enter member email"
            className="border border-green-300 rounded px-3 py-2"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button
            onClick={handleAddMember}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            + Add Member
          </button>
        </div>

        {/* Project Title */}
        <h2 className="text-2xl font-semibold">Project Title</h2>
        <h1 className="text-3xl font-bold italic mb-6">
          “Urban Wildlife Garden for Biodiversity”
        </h1>

        {/* Short Description */}
        <p className="mb-6 text-xl font-medium">
          <span className="font-semibold">Short Description:</span> Creating a native-plant wildlife garden in the city to attract pollinators, birds, and insects, supporting local biodiversity and community awareness.
        </p>

        {/* Full Description */}
        <div className="mb-8 border rounded-md border-green-400 bg-white shadow p-8 text-left">
          <label className="block mb-4 text-xl font-bold text-green-700">
            Full Project Description
          </label>
          <textarea
            className="w-full p-4 border border-green-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            placeholder="Write your project description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ minHeight: "160px" }}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <select
            className="bg-green-400 text-white px-6 py-3 text-lg rounded hover:bg-green-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option>Environment</option>
            <option>Wildlife</option>
            <option>Community</option>
          </select>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-green-400 text-white px-6 py-3 text-lg rounded hover:bg-green-500"
          >
            Photo and Video
          </button>

          <input
            type="file"
            accept="image/*,video/*"
            multiple
            hidden
            ref={fileInputRef}
            onChange={handleMediaChange}
          />

          <button
            onClick={handleAddSlideLink}
            className="bg-green-400 text-white px-6 py-3 text-lg rounded hover:bg-green-500"
          >
            Slide
          </button>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`px-6 py-3 text-lg rounded ${
              canSubmit
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>

        {/* Media Preview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item, index) => (
            <div key={index} className="border rounded overflow-hidden">
              {item.type === "image" ? (
                <img src={item.url} alt="media" className="w-full h-40 object-cover" />
              ) : (
                <video src={item.url} controls className="w-full h-40 object-cover" />
              )}
            </div>
          ))}
        </div>

        {/* Slide Links Preview */}
        {slideLinks.length > 0 && (
          <div className="mt-10 text-left">
            <h3 className="text-xl font-semibold mb-2">Slide Links</h3>
            <ul className="list-disc pl-6">
              {slideLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Slide {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
