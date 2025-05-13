import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Upload, Users, FileText, Send } from "lucide-react";
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
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
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

  const canSubmit =
    title.trim() && shortDescription.trim() && fullDescription.trim() && category && media.length > 0;

  useEffect(() => {
    if (submitted) {
      setTimeout(() => navigate("/"), 5000);
    }
  }, [submitted, navigate]);

  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div
      className="min-h-screen bg-green-50 font-sans relative"
      style={{
        backgroundImage: 'url("/bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="text-center animate-pulse text-white">
            <h2 className="text-3xl font-bold mb-4">Submitting...</h2>
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      )}

      {submitted && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
          <div className="text-center text-gray-800 space-y-4">
            <h2 className="text-3xl font-bold text-green-700">Waiting for Teacher's Approval</h2>
            <p>Your post has been submitted and is under review.</p>
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-gray-500">Redirecting in a few seconds...</p>
          </div>
        </div>
      )}

      <Header />

      {/* Title Added Here */}
      <h1 className="text-4xl font-bold text-center text-green-700 my-12">
        Create Project
      </h1>

      <div className="max-w-4xl mx-auto my-12 bg-white/10 rounded-xl p-8 shadow-xl backdrop-blur-sm">
        {/* Member Avatars */}
        <div className="">
          {members.slice(0, 4).map((member, idx) => (
            <img
              key={idx}
              src={member.avatar}
              className="w-14 h-14 rounded-full border border-green-400 shadow"
              alt="avatar"
            />
          ))}
          {members.length > 4 && (
            <div className="w-14 h-14 rounded-full border flex items-center justify-center bg-green-100 font-bold text-green-600">
              +{members.length - 4}
            </div>
          )}
        </div>

        {/* Title Input */}
        <input
          type="text"
          maxLength={60}
          placeholder="Enter your project title..."
          className="w-full p-4 text-xl border border-green-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Short Description */}
        <textarea
          placeholder="Short description..."
          maxLength={150}
          className="w-full p-4 mb-4 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 resize-none overflow-hidden"
          value={shortDescription}
          onChange={(e) => {
            setShortDescription(e.target.value);
            autoGrow(e);
          }}
          rows={1}
        />

        {/* Full Description */}
        <textarea
          placeholder="Full project description..."
          className="w-full p-4 mb-6 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 resize-none overflow-hidden"
          value={fullDescription}
          onChange={(e) => {
            setFullDescription(e.target.value);
            autoGrow(e);
          }}
          rows={3}
        />

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex gap-2">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter member email"
              className="border border-green-300 p-2 rounded-md focus:outline-none"
            />
            <button
              onClick={handleAddMember}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              <Users size={16} /> Add Member
            </button>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            <option value="">Select Category</option>
            <option value="Energy">Energy</option>
            <option value="Food">Food</option>
            <option value="Biodiversity">Biodiversity</option>
            <option value="Water">Water</option>
            <option value="Others">Others</option>


          </select>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            <Upload size={16} /> Upload Media
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
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            <FileText size={16} /> Add Slide
          </button>

          <button
            disabled={!canSubmit}
            onClick={handleSubmit}
            className={`flex items-center gap-2 px-6 py-2 rounded-md text-white transition ${
              canSubmit ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <Send size={16} /> Submit
          </button>
        </div>

        {/* Media Preview */}
        {media.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {media.map((item, index) => (
              <div key={index} className="rounded-lg overflow-hidden border shadow-sm">
                {item.type === "image" ? (
                  <img src={item.url} className="w-full h-40 object-cover" alt="media" />
                ) : (
                  <video src={item.url} controls className="w-full h-40 object-cover" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Slide Links Preview */}
        {slideLinks.length > 0 && (
          <div className="text-left mt-6">
            <h3 className="text-xl font-semibold mb-2">Slide Links</h3>
            <ul className="list-disc list-inside text-blue-600">
              {slideLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-800"
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
