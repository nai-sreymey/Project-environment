import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

interface Project {
  id: number;
  title: string;
  short_description: string;
  content: string;
  publish_date: string | null;
  createdAt: string;
  project_status: string;
  slideLink?: string | null;
  users_permissions_users: { username: string }[];
  category?: { category_name: string } | null;
  attachments?: {
    url?: string;
    formats?: {
      thumbnail?: { url: string };
      large?: { url: string };
    };
  }[];
}

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/projects?filters[id][$in]=${id}&populate=*`
        );
        if (!res.ok) throw new Error("Failed to fetch project details");
        const data = await res.json();
        setProject(data.data[0]);
        setCurrentImageIndex(0);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  const handleBackClick = () => navigate("/projects");

  const formatDate = (isoDate: string | null) => {
    if (!isoDate) return "N/A";
    return new Date(isoDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getImageUrl = (attachments?: Project["attachments"]) => {
    const file = attachments?.[currentImageIndex];
    if (!file) return "/images/trees.png";
    return (
      file?.formats?.large?.url ||
      file?.formats?.thumbnail?.url ||
      file?.url ||
      "/images/trees.png"
    );
  };

  const handlePrevImage = () => {
    if (!project?.attachments) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.attachments!.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!project?.attachments) return;
    setCurrentImageIndex((prev) =>
      prev === project.attachments!.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300">
        <p className="text-xl font-semibold text-green-900 animate-pulse">
          Loading project details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <p className="text-lg text-red-600 font-medium">Error: {error}</p>
      </div>
    );
  }

  if (!project) return null;

  const hasMultipleImages = project.attachments && project.attachments.length > 1;

  return (
    <>
      <Header />
      <section className="bg-gradient-to-br from-green-50 to-green-200 text-gray-900 py-16 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-10 space-y-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-center text-green-800">
            {project.category?.category_name || "Uncategorized"}
          </h1>

          {/* Image slider */}
          <div className="relative w-full flex items-center justify-center">
            {project.attachments && project.attachments.length > 0 ? (
              <>
                {hasMultipleImages && (
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-3xl md:text-4xl font-bold rounded-full shadow-lg flex items-center justify-center select-none transition-colors duration-300"
                    aria-label="Previous image"
                  >
                    {"<"}
                  </button>
                )}

                <img
                  src={getImageUrl(project.attachments)}
                  alt={`Project image ${currentImageIndex + 1}`}
                  className="w-full max-h-[500px] object-contain rounded-xl shadow-md"
                />

                {hasMultipleImages && (
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-3xl md:text-4xl font-bold rounded-full shadow-lg flex items-center justify-center select-none transition-colors duration-300"
                    aria-label="Next image"
                  >
                    {">"}
                  </button>
                )}
              </>
            ) : (
              <img
                src="/images/trees.png"
                alt="Default project"
                className="w-full rounded-xl shadow-md"
              />
            )}
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-semibold text-green-700">📝 Short Description</h2>
            <p className="text-lg text-gray-800 leading-relaxed">
              {project.short_description}
            </p>
          </div>

          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold text-green-700">📖 Project Content</h2>
            <p className="text-base text-gray-900 whitespace-pre-line">{project.content}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg font-inter text-gray-900">
            <p><span className="font-semibold">📅 Published:</span> {formatDate(project.publish_date)}</p>
            <p><span className="font-semibold">👤 Created by:</span> {project.users_permissions_users?.[0]?.username || "Unknown"}</p>
            <p><span className="font-semibold">📂 Category:</span> {project.category?.category_name || "N/A"}</p>
          </div>

          <div className="flex justify-center gap-6 pt-8">
            <button
              onClick={handleBackClick}
              className="px-6 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-900 transition-all shadow-md"
            >
              ← Back to Projects
            </button>
            {project.slideLink && (
              <a
                href={project.slideLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-800 transition-all shadow-md"
              >
                View Slide
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Detail;