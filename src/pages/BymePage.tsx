

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Header from "../components/Header"; // Use same Header path for consistency

// interface Attachment {
//     id: number;
//     name: string;
//     url: string;
//     caption: string | null;
//     alternativeText: string | null;
//     formats?: {
//         large?: { url: string };
//     };
// }

// interface Project {
//     id: number;
//     title: string;
//     short_description: string;
//     content: string;
//     createdBy: string;
//     Category: string;
//     project_status: string;
//     publish_date: string;
//     attachments: Attachment[];
//     updatedAt: string;
// }

// const ByMePage: React.FC = () => {
//     const [projects, setProjects] = useState<Project[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     const userId = localStorage.getItem("userId");

//     useEffect(() => {
//         if (!userId) {
//             setError("User not logged in.");
//             setLoading(false);
//             return;
//         }

//         const fetchProjects = async () => {
//             try {
//                 const res = await fetch(
//                     `https://pse-eco-sharing-be.final25.psewmad.org/api/projects?filters[users_permissions_users][id][$eq]=${userId}&populate=*`
//                 );

//                 if (!res.ok) {
//                     throw new Error("Failed to fetch user projects");
//                 }

//                 const data = await res.json();
//                 setProjects(data.data);
//             } catch (err: any) {
//                 setError(err.message || "Unknown error");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProjects();
//     }, [userId]);

//     const getImageUrl = (attachments?: Attachment[]) => {
//         const file = attachments?.[0];
//         return (
//             file?.formats?.large?.url ||
//             file?.url ||
//             "/images/flowers.png"
//         );
//     };

//     const formatDate = (dateStr: string) => {
//         return new Date(dateStr).toLocaleDateString(undefined, {
//             year: "numeric",
//             month: "short",
//             day: "numeric",
//         });
//     };

//     return (
//         <>
//             <Header />

//             {loading && (
//                 <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex items-center justify-center z-50">
//                     <div className="w-16 h-16 border-4 border-green-600 border-dashed rounded-full animate-spin"></div>
//                 </div>
//             )}

//             <main className="bg-green-100 min-h-screen px-6 md:px-24 py-16">
//                 <h1 className="text-4xl font-extrabold text-green-800 mb-10 text-center tracking-tight">
//                     🌱 My Projects
//                 </h1>

//                 {error && (
//                     <p className="text-center text-red-600 font-semibold">Error: {error}</p>
//                 )}

//                 {!loading && projects.length === 0 && (
//                     <p className="text-center text-gray-600 text-lg">No projects found.</p>
//                 )}

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                     {projects.map((project) => {
//                         const imageUrl = getImageUrl(project.attachments);
//                         return (
//                             <Link to={`/detail/${project.id}`} key={project.id}>
//                                 <div className="bg-white rounded-2xl shadow-lg p-5 w-full hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
//                                     <img
//                                         src={
//                                             imageUrl.startsWith("http")
//                                                 ? imageUrl
//                                                 : `http://pse-eco-sharing-be.final25.psewmad.org${imageUrl}`
//                                         }
//                                         alt={project.title}
//                                         className="w-full h-52 object-cover rounded-xl mb-4"
//                                         loading="lazy"
//                                     />
//                                     <div className="flex-grow">
//                                         <h3 className="font-extrabold text-xl text-green-700 mb-2 line-clamp-1">
//                                             {project.title}
//                                         </h3>
//                                         <p className="text-gray-700 text-sm mb-3 line-clamp-3">
//                                             {project.short_description}
//                                         </p>
//                                         <p className="text-gray-700 text-sm mb-3 line-clamp-3">
//                                             {project.content}
//                                         </p>
//                                         <p className="text-sm text-gray-500">
//                                             Status: {project.project_status || "N/A"}
//                                         </p>
                                        
//                                     </div>
//                                     <div className="text-xs text-gray-500 mt-auto">
//                                         <div>📅 Published: {formatDate(project.publish_date)}</div>
//                                         <div>🔄 Updated: {formatDate(project.updatedAt)}</div>
//                                     </div>
//                                 </div>
//                             </Link>
//                         );
//                     })}
//                 </div>
//             </main>
//         </>
//     );
// };

// export default ByMePage;




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

interface Attachment {
    id: number;
    name: string;
    url: string;
    caption: string | null;
    alternativeText: string | null;
    formats?: {
        large?: { url: string };
    };
}

interface Project {
    id: number;
    title: string;
    short_description: string;
    content: string;
    createdBy: string;
    Category: string;
    project_status: string;
    publish_date: string;
    attachments: Attachment[];
    updatedAt: string;
}

const ByMePage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const userId = localStorage.getItem("userId");
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!userId) {
            setError("User not logged in.");
            setLoading(false);
            return;
        }

        const fetchProjects = async () => {
            try {
                const res = await fetch(
                    `${API_URL}/projects?filters[users_permissions_users][id][$eq]=${userId}&populate=*`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch user projects");
                }

                const data = await res.json();
                setProjects(data.data);
            } catch (err: any) {
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [userId, API_URL]);

    const getImageUrl = (attachments?: Attachment[]) => {
        const file = attachments?.[0];
        return (
            file?.formats?.large?.url ||
            file?.url ||
            "/images/flowers.png"
        );
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <>
            <Header />

            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex items-center justify-center z-50">
                    <div className="w-16 h-16 border-4 border-green-600 border-dashed rounded-full animate-spin"></div>
                </div>
            )}

            <main className="bg-green-100 min-h-screen px-6 md:px-24 py-16">
                <h1 className="text-4xl font-extrabold text-green-800 mb-10 text-center tracking-tight">
                    🌱 My Projects
                </h1>

                {error && (
                    <p className="text-center text-red-600 font-semibold">Error: {error}</p>
                )}

                {!loading && projects.length === 0 && (
                    <p className="text-center text-gray-600 text-lg">No projects found.</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {projects.map((project) => {
                        const imageUrl = getImageUrl(project.attachments);
                        return (
                            <Link to={`/detail/${project.id}`} key={project.id}>
                                <div className="bg-white rounded-2xl shadow-lg p-5 w-full hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
                                    <img
                                        src={
                                            imageUrl.startsWith("http")
                                                ? imageUrl
                                                : `${API_URL}${imageUrl}`
                                        }
                                        alt={project.title}
                                        className="w-full h-52 object-cover rounded-xl mb-4"
                                        loading="lazy"
                                    />
                                    <div className="flex-grow">
                                        <h3 className="font-extrabold text-xl text-green-700 mb-2 line-clamp-1">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                                            {project.short_description}
                                        </p>
                                        <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                                            {project.content}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Status: {project.project_status || "N/A"}
                                        </p>
                                        
                                    </div>
                                    <div className="text-xs text-gray-500 mt-auto">
                                        <div>📅 Published: {formatDate(project.publish_date)}</div>
                                        <div>🔄 Updated: {formatDate(project.updatedAt)}</div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </>
    );
};

export default ByMePage;
