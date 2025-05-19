import React, { useState } from "react";
import Header from "../components/Header";

const ProfilePage = () => {
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("/images/profile.png");
  const [isEditing, setIsEditing] = useState(false);
  const [tempBio, setTempBio] = useState(bio);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Get values from localStorage
  const username = localStorage.getItem("username") || "Your Name";
  const email = localStorage.getItem("userEmail") || "your@email.com";

  const handleEditClick = () => {
    setIsEditing(true);
    setTempBio(bio);
  };

  const handleSaveClick = () => {
    setLoading(true);

    setTimeout(() => {
      setBio(tempBio);
      if (newImage) setProfileImage(newImage);
      setIsEditing(false);
      setLoading(false);
      alert("Profile updated successfully!");
    }, 1000); // Simulate delay
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewImage(imageURL);
    }
  };

  return (
    <div className="min-h-screen bg-green-100">
      <Header />
      <div className="flex justify-center items-center py-20 px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-12 w-full max-w-3xl text-center min-h-[700px] flex flex-col justify-between">
          <div>
            <div className="relative">
              <img
                src={newImage || profileImage}
                alt="Profile"
                className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-green-400"
              />
              {isEditing && (
                <div className="absolute top-2 right-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer bg-green-600 text-white px-3 py-1 text-sm rounded shadow hover:bg-green-700"
                  >
                    Change
                  </label>
                </div>
              )}
            </div>

            <h2 className="text-3xl font-extrabold text-green-800 mb-1">{username}</h2>

            <div className="text-left space-y-4 text-lg text-gray-800">
              <p><strong>Email:</strong> {email}</p>
              <div>
                <strong>Bio:</strong>
                {isEditing ? (
                  <textarea
                    value={tempBio}
                    onChange={(e) => setTempBio(e.target.value)}
                    className="w-full mt-2 p-3 border border-green-300 rounded-md resize-none text-base"
                    rows={5}
                  />
                ) : (
                  <p className="mt-2 text-base">{bio}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            {loading ? (
              <button
                className="mt-10 px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-full"
                disabled
              >
                Saving...
              </button>
            ) : isEditing ? (
              <button
                onClick={handleSaveClick}
                className="mt-10 px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-full hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="mt-10 px-8 py-3 bg-gray-500 text-white text-lg font-semibold rounded-full hover:bg-gray-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
