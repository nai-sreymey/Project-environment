import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Upload, Users, FileText } from "lucide-react";
import Header from "../components/Header";
import { jwtDecode } from "jwt-decode";


interface MediaItem {
  id: number;
  url: string;
  type: "image" | "video";
}

interface Member {
  email: string;
  avatar: string;
}

interface Category {
  id: number;
  documentId: string;
  category_name: string;
  description: string | null;
}

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [user__data, setUserData] = useState<{}>({});
  const [short_description, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [slideLink, setSlideLink] = useState<string>(""); // single string
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const token = localStorage.getItem("jwt");;
  console.log(token)

  console.log("======>", category);


  const canSubmit = title && short_description && content && category;

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews: MediaItem[] = files.map((file) => ({
      id: 0,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "video",
    }));
    setMedia((prev) => [...prev, ...previews]);
  };

  const handleAddMember = () => {
    if (!newEmail.trim()) return alert("Email is required.");
    if (!isValidEmail(newEmail)) return alert("Invalid email address.");
    setMembers((prev) => [...prev, { email: newEmail.trim(), avatar: "/images/mey.png" }]);
    setNewEmail("");
  };

  const handleAddSlideLink = () => {
    const link = prompt("Enter slide link (e.g. Google Slides)");
    if (link && link.trim()) {
      setSlideLink((prev) => (prev ? `${prev.trim()}\n${link.trim()}` : link.trim()));
    }
  };

  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsLoading(true);

    try {
      const mediaFiles = fileInputRef.current?.files || [];
      const mediaIDs: number[] = [];

      if (mediaFiles.length > 0) {
        const formData = new FormData();
        Array.from(mediaFiles).forEach((file) => formData.append("files", file));

        const uploadRes = await fetch("http://pse-eco-sharing-be.final25.psewmad.org/api/upload", {
          method: "POST",
          headers: {
            "Authorization": `Bearer${token}`,
          },
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("Media upload failed");
        const uploaded = await uploadRes.json();
        for (const file of uploaded) {
          mediaIDs.push(file.id);
        }
      }

      // Construct the payload to match your API
      // const payload = {
      //   data: {
      //     documentId: crypto.randomUUID(), // or generate how your system expects
      //     title,
      //     short_description,
      //     content,
      //     project_status: "padding", // adjust to your logic
      //     publish_date: new Date().toISOString(), // or use a form value
      //     slideLink,
      //     attachments: mediaIDs.map((id) => ({ id })),
      //     category: parseInt(category),
      //   },
      // };

      // console.log("Submitting payload:", payload);

      const res = await fetch("http://pse-eco-sharing-be.final25.psewmad.org/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(
          {
            "data": {
              "title": title,
              "short_description": short_description,
              "content": content,
              "project_status": "padding",
              "publish_date": "2025-05-20T08:00:00.000Z",
              "users_permissions_users": user__data,
              "category": category,
              "slideLink": slideLink,
              "attachments": mediaIDs.map((id) => ({ id })),
            }
          }
        ),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error?.message || "Project creation failed");
      }

      const result = await res.json();
      console.log("Created:", result);

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        navigate("/byme");
      }, 3000);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://pse-eco-sharing-be.final25.psewmad.org/api/categories");
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch categories");
        setCategories(data.data);
        console.log("Fetched categories:", data.data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    fetchCategories();

  }, []);

  useEffect(() => {
    const decodeToken = async () => {
      if (token) {
        try {
          const userData = await jwtDecode(token); // this can still be synchronous depending on the lib
          console.log("Decoded user data:", userData);
          setUserData(userData);
        } catch (error) {
          console.error("Invalid JWT token:", error);
        }
      } else {
        console.log("No token found");
      }
    };

    decodeToken(); // call it inside useEffect
  }, [token]);



  return (
    <div className="min-h-screen bg-green-50 relative" style={{ backgroundImage: 'url("/bg.jpg")', backgroundSize: "cover" }}>
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <span className="text-white text-xl animate-pulse">Submitting...</span>
        </div>
      )}
      {submitted && (
        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-50">
          <h2 className="text-3xl font-bold text-green-600">Waiting for Teacher's Approval</h2>
          <p className="mt-2 text-gray-700">Your post has been submitted.</p>
          <div className="mt-4 w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <Header />
      <h1 className="text-4xl font-bold text-center text-green-700 my-10">Create Project</h1>
      <div className="max-w-4xl mx-auto bg-white/30 p-8 rounded-xl shadow-lg backdrop-blur-md">
        <div className="flex space-x-2 mb-6">
          {members.slice(0, 4).map((m, i) => (
            <img key={i} src={m.avatar} className="w-12 h-12 rounded-full border border-green-400" alt="avatar" />
          ))}
          {members.length > 4 && (
            <div className="w-12 h-12 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold">
              +{members.length - 4}
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={60}
          className="w-full mb-4 p-4 border border-green-300 rounded-md"
        />

        <textarea
          placeholder="Short Description"
          value={short_description}
          onChange={(e) => {
            setShortDescription(e.target.value);
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
            setContent(e.target.value);
            autoGrow(e);
          }}
          rows={3}
          className="w-full mb-4 p-4 border border-green-300 rounded-md resize-none overflow-hidden"
        />

        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Member email"
            className="p-2 border border-green-300 rounded-md"
          />
          <button onClick={handleAddMember} className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2">
            <Users size={16} /> Add Member
          </button>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id-1} value={cat.id-1}>
                {cat.category_name}
              </option>
            ))}
          </select>
          <button onClick={() => fileInputRef.current?.click()} className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <Upload size={16} /> Upload Media
          </button>
          <button onClick={handleAddSlideLink} className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <FileText size={16} /> Add Slide Link
          </button>
        </div>

        <input type="file" multiple accept="image/*,video/*" className="hidden" ref={fileInputRef} onChange={handleMediaChange} />

        <div className="flex gap-4 overflow-x-auto mb-6">
          {media.map((m, i) =>
            m.type === "image" ? (
              <img key={i} src={m.url} className="h-28 border border-green-300 rounded-md" alt="preview" />
            ) : (
              <video key={i} src={m.url} className="h-28 border border-green-300 rounded-md" controls />
            )
          )}
        </div>

        <div className="flex gap-4 flex-wrap mb-6">
          {(slideLink || "")
            .split("\n")
            .filter((link) => link.trim() !== "")
            .map((link, i) => (
              <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="text-green-700 underline">
                Slide {i + 1}
              </a>
            ))}
        </div>

        <button
  onClick={handleSubmit}
  disabled={!canSubmit || isLoading}
  className={`w-full py-3 text-white font-bold rounded-md transition-colors duration-300 ${
    canSubmit && !isLoading
      ? "bg-green-600 hover:bg-green-700"
      : isLoading
      ? "bg-green-500 cursor-wait"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
  {isLoading ? "Submitting Project..." : "Submit Project"}
</button>

      </div>
    </div>
  );
};

export default CreatePost;