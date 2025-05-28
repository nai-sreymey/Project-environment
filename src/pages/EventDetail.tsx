// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Header from "../components/Header";

// interface Project {
//   id: number;
//   Title: string;
//   description: string;
//   location: string;
//   start_time: string;
//   end_time: string;
//   createdAt: string;
//   publishedAt: string;
//   publish_date: string | null;
//   publish_by: string | null;
//   participants: string | null;
//   purpose: string | null;
//   number_participants: string | null;
//   manager: string | null;
//   attachments?: {
//     url?: string;
//     formats?: {
//       thumbnail?: { url: string };
//       large?: { url: string };
//     };
//   }[];
// }

// const EventDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [project, setProject] = useState<Project | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await fetch(
//           `http://pse-eco-sharing-be.final25.psewmad.org/api/events?filters[id][$in]=${id}&populate=*`
//         );
//         if (!res.ok) throw new Error("Failed to fetch project details");
//         const data = await res.json();
//         setProject(data.data[0]);
//         setCurrentImageIndex(0);
//       } catch (err: any) {
//         setError(err.message || "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchProject();
//   }, [id]);

//   const handleBackClick = () => navigate("/event");

//   const formatDate = (isoDate: string | null) => {
//     if (!isoDate) return "N/A";
//     return new Date(isoDate).toLocaleDateString(undefined, {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const getImageUrl = (attachments?: Project["attachments"]) => {
//     const file = attachments?.[0];
//     if (!file) return "/images/trees.png";
//     return (
//       file?.formats?.large?.url ||
//       file?.formats?.thumbnail?.url ||
//       file?.url ||
//       "/images/trees.png"
//     );
//   };

//   const handlePrev = () => {
//     if (!project?.attachments) return;
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? project.attachments!.length - 1 : prev - 1
//     );
//   };

//   const handleNext = () => {
//     if (!project?.attachments) return;
//     setCurrentImageIndex((prev) =>
//       prev === project.attachments!.length - 1 ? 0 : prev + 1
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300">
//         <p className="text-xl font-semibold text-green-900 animate-pulse">
//           Loading project details...
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-red-50">
//         <p className="text-lg text-red-600 font-medium">Error: {error}</p>
//       </div>
//     );
//   }

//   if (!project) return null;

//   const hasMultipleImages = project.attachments && project.attachments.length > 1;

//   return (
//     <>
//       <Header />
//       <section className="bg-gradient-to-br from-green-50 to-green-200 text-gray-900 py-16 px-6 min-h-screen">
//         <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-10 space-y-10">
//           <h1 className="text-4xl md:text-5xl font-semibold text-center text-green-800">
//             {project.Title}
//           </h1>

//           <div className="relative w-full flex items-center justify-center">
//             {project.attachments && project.attachments.length > 0 ? (
//               <>
//                 {hasMultipleImages && (
//                   <button
//                     onClick={handlePrev}
//                     className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-3xl md:text-4xl font-bold rounded-full shadow-lg flex items-center justify-center select-none transition-colors duration-300"
//                     aria-label="Previous image"
//                   >
//                     {"<"}
//                   </button>
//                 )}

//                 <img
//                   src={getImageUrl([project.attachments[currentImageIndex]])}
//                   alt={`Project image ${currentImageIndex + 1}`}
//                   className="w-full max-h-[500px] object-contain rounded-xl shadow-md"
//                 />

//                 {hasMultipleImages && (
//                   <button
//                     onClick={handleNext}
//                     className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-3xl md:text-4xl font-bold rounded-full shadow-lg flex items-center justify-center select-none transition-colors duration-300"
//                     aria-label="Next image"
//                   >
//                     {">"}
//                   </button>
//                 )}
//               </>
//             ) : (
//               <img
//                 src="/images/trees.png"
//                 alt="Default project"
//                 className="w-full rounded-xl shadow-md"
//               />
//             )}
//           </div>

//           <div className="text-center space-y-4">
//             <h2 className="text-3xl font-semibold text-green-700">📝 Description</h2>
//             <p className="text-lg text-gray-800 leading-relaxed">
//               {project.description}
//             </p>
//           </div>

//           <div className="space-y-2 text-gray-900 text-lg">
//             <p>
//               <span className="font-semibold">📂 Purpose:</span> {project.purpose || "N/A"}
//             </p>
//             <p>
//               <span className="font-semibold">📂 Location:</span> {project.location}
//             </p>
//             <p>
//               <span className="font-semibold">📂 Manager:</span> {project.manager || "N/A"}
//             </p>
//             <p>
//               <span className="font-semibold">📂 Participants:</span> {project.participants || "N/A"}
//             </p>
//             <p>
//               <span className="font-semibold">📂 Number Participants:</span>{" "}
//               {project.number_participants || "N/A"}
//             </p>
//             <p>
//               <span className="font-semibold">📅 Published:</span> {formatDate(project.publish_date)}
//             </p>
//             <p>
//               <span className="font-semibold">👤 Created by:</span> {project.publish_by || "N/A"}
//             </p>
//             <p>
//               <span className="font-semibold">📂 Created At:</span>{" "}
//               {new Date(project.createdAt).toLocaleString()}
//             </p>
//             <p>
//               <span className="font-semibold">Start time - End time:</span>{" "}
//               {new Date(project.start_time).toLocaleDateString()} |{" "}
//               {new Date(project.start_time).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}{" "}
//               -{" "}
//               {new Date(project.end_time).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
//             </p>
//           </div>
//           <div className="flex justify-center gap-6 pt-8">
//             <button
//               onClick={handleBackClick}
//               className="px-6 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-900 transition-all shadow-md"
//             >
//               ← Back to Event
//             </button>
        
            
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default EventDetail;



import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

interface Project {
  id: number;
  Title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  createdAt: string;
  publishedAt: string;
  publish_date: string | null;
  publish_by: string | null;
  participants: string | null;
  purpose: string | null;
  number_participants: string | null;
  manager: string | null;
  attachments?: {
    url?: string;
    formats?: {
      thumbnail?: { url: string };
      large?: { url: string };
    };
  }[];
}

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `${API_URL}/events?filters[id][$in]=${id}&populate=*`
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
  }, [id, API_URL]);

  const handleBackClick = () => navigate("/event");

  const formatDate = (isoDate: string | null) => {
    if (!isoDate) return "N/A";
    return new Date(isoDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getImageUrl = (attachments?: Project["attachments"]) => {
    const file = attachments?.[0];
    if (!file) return "/images/trees.png";
    return (
      file?.formats?.large?.url ||
      file?.formats?.thumbnail?.url ||
      file?.url ||
      "/images/trees.png"
    );
  };

  const handlePrev = () => {
    if (!project?.attachments) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.attachments!.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
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
            {project.Title}
          </h1>

          <div className="relative w-full flex items-center justify-center">
            {project.attachments && project.attachments.length > 0 ? (
              <>
                {hasMultipleImages && (
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-3xl md:text-4xl font-bold rounded-full shadow-lg flex items-center justify-center select-none transition-colors duration-300"
                    aria-label="Previous image"
                  >
                    {"<"}
                  </button>
                )}

                <img
                  src={getImageUrl([project.attachments[currentImageIndex]])}
                  alt={`Project image ${currentImageIndex + 1}`}
                  className="w-full max-h-[500px] object-contain rounded-xl shadow-md"
                />

                {hasMultipleImages && (
                  <button
                    onClick={handleNext}
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
            <h2 className="text-3xl font-semibold text-green-700">📝 Description</h2>
            <p className="text-lg text-gray-800 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="space-y-2 text-gray-900 text-lg">
            <p>
              <span className="font-semibold">📂 Purpose:</span> {project.purpose || "N/A"}
            </p>
            <p>
              <span className="font-semibold">📂 Location:</span> {project.location}
            </p>
            <p>
              <span className="font-semibold">📂 Manager:</span> {project.manager || "N/A"}
            </p>
            <p>
              <span className="font-semibold">📂 Participants:</span> {project.participants || "N/A"}
            </p>
            <p>
              <span className="font-semibold">📂 Number Participants:</span>{" "}
              {project.number_participants || "N/A"}
            </p>
            <p>
              <span className="font-semibold">📅 Published:</span> {formatDate(project.publish_date)}
            </p>
            <p>
              <span className="font-semibold">👤 Created by:</span> {project.publish_by || "N/A"}
            </p>
            <p>
              <span className="font-semibold">📂 Created At:</span>{" "}
              {new Date(project.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Start time - End time:</span>{" "}
              {new Date(project.start_time).toLocaleDateString()} |{" "}
              {new Date(project.start_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(project.end_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="flex justify-center gap-6 pt-8">
            <button
              onClick={handleBackClick}
              className="px-6 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-900 transition-all shadow-md"
            >
              ← Back to Event
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventDetail;
