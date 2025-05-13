import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";

const ProfilePage = () => {
  const [bio, setBio] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [tempBio, setTempBio] = useState<string>("");
  const [newImage, setNewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Assuming the user's token is stored in localStorage after login
  const token = localStorage.getItem("authToken"); 

  // Fetch profile data on component mount
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:1337/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const userProfile = response.data;
          setBio(userProfile.bio);
          setProfileImage(userProfile.profileImage);
          setTempBio(userProfile.bio);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [token]);

  const handleEditClick = () => {
    setIsEditing(true);
    setTempBio(bio);
  };

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (newImage) {
        formData.append("image", newImage);
      }
      formData.append("bio", tempBio);

      const response = await axios.put(
        "http://localhost:1337/api/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Attach the token here
          },
        }
      );

      if (response.status === 200) {
        setBio(tempBio);
        if (newImage) setProfileImage(newImage);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("There was an error saving your profile. Please try again.");
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
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
                src={newImage || profileImage || "/images/default.png"}
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

            <h2 className="text-3xl font-extrabold text-green-800 mb-1">Nai Sreymey</h2>
            <p className="text-lg text-gray-600 mb-6">Full-Stack Developer | Phnom Penh</p>

            <div className="text-left space-y-4 text-lg text-gray-800">
              <p>
                <strong>Email:</strong> nai.sreymey@example.com
              </p>
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
                className="mt-10 px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-full hover:bg-green-700"
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
