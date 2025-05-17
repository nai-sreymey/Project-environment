import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Upload, Users, FileText } from "lucide-react";
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState("");
  const [short_description, setshort_description] = useState("");
  const [content, setcontent] = useState("");
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [slideLinks, setSlideLinks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit =
    title.trim() &&
    short_description.trim() &&
    content.trim() &&
    category &&
    media.length > 0;

  // Validate email format
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newMedia: MediaItem[] = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "video"
    }));
    setMedia((prev) => [...prev, ...newMedia]);
  };

  const handleAddMember = () => {
    if (!newEmail.trim()) return alert("Email is required.");
    if (!isValidEmail(newEmail)) return alert("Invalid email address.");

    setMembers((prev) => [
      ...prev,
      { email: newEmail.trim(), avatar: "/images/mey.png" }
    ]);
    setNewEmail("");
  };

  const handleAddSlideLink = () => {
    const link = prompt("Enter Slide Link (e.g. Google Slides)");
    if (link && link.trim()) {
      setSlideLinks((prev) => [...prev, link.trim()]);
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setIsLoading(true);

    const payload = {
      data: {
        title,
        short_description,
        content,
        category,
        slideLinks,
        media,
        members,
      }
    };

    try {
      const res = await fetch("http://localhost:1337/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.error?.message || "Failed to create project");
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        navigate("/");
      }, 5000);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="text-white text-xl animate-pulse">Submitting...</div>
        </div>
      )}

      {submitted && (
        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-50">
          <h2 className="text-3xl font-bold text-green-600">Waiting for Teacher's Approval</h2>
          <p className="mt-2 text-gray-700">Your post has been submitted.</p>
          <div className="mt-4 w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm mt-2 text-gray-500">Redirecting in a few seconds...</p>
        </div>
      )}

      <Header />

      <h1 className="text-4xl font-bold text-center text-green-700 my-12">Create Project</h1>

      <div className="max-w-4xl mx-auto p-8 bg-white/20 rounded-xl shadow-lg backdrop-blur-md">
        {/* Members */}
        <div className="flex space-x-2 mb-6">
          {members.slice(0, 4).map((m, i) => (
            <img
              key={i}
              src={m.avatar}
              className="w-12 h-12 rounded-full border border-green-400 shadow"
              alt="avatar"
            />
          ))}
          {members.length > 4 && (
            <div className="w-12 h-12 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold">
              +{members.length - 4}
            </div>
          )}
        </div>

        {/* Form */}
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={60}
          className="w-full mb-4 p-4 border border-green-300 rounded-md text-lg"
        />

        <textarea
          placeholder="Short Description"
          value={short_description}
          onChange={(e) => {
            setshort_description(e.target.value);
            autoGrow(e);
          }}
          rows={1}
          maxLength={150}
          className="w-full mb-4 p-4 border border-green-300 rounded-md resize-none overflow-hidden"
        />

        <textarea
          placeholder="Full Description"
          value={content}
          onChange={(e) => {
            setcontent(e.target.value);
            autoGrow(e);
          }}
          rows={3}
          className="w-full mb-4 p-4 border border-green-300 rounded-md resize-none overflow-hidden"
        />

        {/* Inputs */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Member email"
            className="p-2 border border-green-300 rounded-md"
          />
          <button
            onClick={handleAddMember}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
          >
            <Users size={16} /> Add Member
          </button>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            <option value="">Select Category</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="food">Food</option>
            <option value="technology">Technology</option>
            <option value="environment">Environment</option>
          </select>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Upload size={16} /> Upload Media
          </button>

          <button
            onClick={handleAddSlideLink}
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <FileText size={16} /> Add Slide Link
          </button>
        </div>

        <input
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleMediaChange}
        />

        {/* Media Preview */}
        <div className="flex gap-4 overflow-x-auto mb-6">
          {media.map((m, i) =>
            m.type === "image" ? (
              <img
                key={i}
                src={m.url}
                className="h-28 border border-green-300 rounded-md"
                alt="preview"
              />
            ) : (
              <video
                key={i}
                src={m.url}
                className="h-28 border border-green-300 rounded-md"
                controls
              />
            )
          )}
        </div>

        {/* Slide Links Preview */}
        <div className="flex gap-4 overflow-x-auto mb-6">
          {slideLinks.map((link, i) => (
            <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="text-green-700 underline">
              Slide {i + 1}
            </a>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || isLoading}
          className={`w-full py-3 text-white font-bold rounded-md ${
            canSubmit ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit Project
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
