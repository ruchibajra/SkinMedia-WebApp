import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";

const Profile = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) {
          throw new Error("User data not found");
        }

        const response = await axiosInstance.get(`/api/profile/${user._id}`, {
          headers: { Authorization: token },
        });

        const profileData = response.data.profile;

        setBio(profileData.bio || "No bio available");
        setUsername(profileData.user.username || "Username not available");
        setEmail(profileData.user.email || "Email not available");
        setPhone(profileData.user.phone || "Phone not available");
        setProfileImage(profileData.profileImage || "");

        // Save profileImage to localStorage
        localStorage.setItem("profileImage", profileData.profileImage || "");
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user) {
        throw new Error("User data not found");
      }

      const updatedProfile = {
        user: {
          username,
          phone,
          email,
        },
        bio,
        profileImage: newProfileImage || profileImage,
      };

      await axiosInstance.put(`/api/profile/update`, updatedProfile, {
        headers: { Authorization: token },
      });

      // Update profileImage in localStorage after save
      localStorage.setItem("profileImage", newProfileImage || profileImage);

      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const token = localStorage.getItem("token");

        const response = await axiosInstance.put(
          `/api/profile/update`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        );

        setNewProfileImage(response.data.imageUrl); // Assuming response contains the URL

        // Save the new profile image URL to localStorage
        localStorage.setItem("profileImage", response.data.imageUrl);
        console.log(localStorage.getItem("profileImage"));

      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Function to handle image click
  const handleImageClick = () => {
    document.getElementById("profileImageInput").click();
  };

  return (
    <div className="ml-96 justify-center bg-white p-6 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col md:flex-row">
        {/* Left part start */}
        <div className="w-full md:w-1/4 bg-slate-600 text-white p-6 flex flex-col items-center rounded-lg mb-6 md:mb-0">
          <img
            className="h-48 w-48 rounded-full border-4 border-slate-300 mb-4 cursor-pointer"
            src={
              newProfileImage ||
              profileImage ||
              "https://via.placeholder.com/150"
            }
            alt="Profile"
            onClick={handleImageClick}
          />
          <input
            type="file"
            id="profileImageInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="mb-4 p-2 rounded border text-slate-600"
            />
          ) : (
            <h1 className="text-2xl font-bold mb-2">{username}</h1>
          )}
          {isEditing ? (
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username"
              className="mb-4 p-2 rounded border text-slate-600"
            />
          ) : (
            <h1 className="text-lg italic w-full flex flex-col items-center underline">
              {email}
            </h1>
          )}
          {isEditing ? (
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="mb-4 p-2 rounded border text-slate-600"
            />
          ) : (
            <h1 className="text-lg w-full flex flex-col items-center">
              {phone}
            </h1>
          )}
          {isEditing ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
              className="mb-4 p-2 rounded border text-slate-600"
            />
          ) : (
            <p className="text-white text-center mb-4">{bio}</p>
          )}
          <h3 className="italic text-gray-600 mb-4">
            Skin Type: Combination Skin
          </h3>
          <button
            onClick={handleEditClick}
            className="w-full bg-slate-100 text-slate-600 font-semibold py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
          {isEditing && (
            <button
              onClick={handleSave}
              className="w-full bg-slate-100 text-slate-600 font-semibold py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 mt-2"
            >
              Save Changes
            </button>
          )}
        </div>
        {/* Left part end */}

        {/* Right part start */}
        <div className="w-full md:w-3/4 p-6 flex flex-col">
          <h3 className="text-lg font-medium mb-4">Overview</h3>
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div className="flex flex-col items-center">
              <h3 className="text-3xl font-semibold">53,920</h3>
              <p className="text-gray-600">Members</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-3xl font-semibold">212</h3>
              <p className="text-gray-600">Following</p>
            </div>
          </div>
          {/* Additional profile information or activities */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-medium mb-2">Skin Type</h4>
            <p className="text-gray-700">Combination Skin</p>

            <br />

            <h4 className="text-lg font-medium mb-2">Skin History</h4>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              in turpis quis eros cursus tincidunt. Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Quaerat facilis sequi possimus in
              adipisci id itaque, numquam sunt! Corrupti, autem. Reiciendis
              corporis voluptatem accusantium pariatur magnam quo delectus
              doloremque quia!
            </p>

            <br />
            <p className="text-gray-700">
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur in turpis quis eros cursus tincidunt.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur in turpis quis eros cursus tincidunt.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur in turpis quis eros cursus tincidunt.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur in turpis quis eros cursus tincidunt.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur in turpis quis eros cursus tincidunt.
              </li>
            </p>
          </div>
        </div>
        {/* Right part end */}
      </div>
    </div>
  );
};

export default Profile;
