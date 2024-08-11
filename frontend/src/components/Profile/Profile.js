import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";

const Profile = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(""); // Add state for profile image

  useEffect(() => {
    const fetchProfile = async () => {
      try { 
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) {
          throw new Error("User data not found");
        }

        // Fetch profile data using the user's ID
        const response = await axiosInstance.get(`/api/profile/${user._id}`, {
          headers: { Authorization: token },
        });

        const profileData = response.data.profile;

        // Update state with the fetched profile data
        setBio(profileData.bio || "No bio available");
        setUsername(profileData.user.username || "Username not available");
        setEmail(profileData.user.email || "Email not available");
        setPhone(profileData.user.phone || "Phone not available");

        setProfileImage(profileData.profileImage || ""); // Set profile image
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="ml-96 justify-center bg-white p-6 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col md:flex-row">
        {/* Left part start */}
        <div className="w-full md:w-1/4 bg-slate-600 text-white p-6 flex flex-col items-center rounded-lg mb-6 md:mb-0">
          <img
            className="h-48 w-48 rounded-full border-4 border-slate-300 mb-4"
            src={profileImage || "https://via.placeholder.com/150"} // Use placeholder if no image
            alt="Profile"
          />
          <h1 className="text-2xl font-bold mb-2">{username}</h1>
          <h1 className="text-lg italic w-full flex flex-col items-center underline">
            {email}
          </h1>
          <h1 className="text-lg  w-full flex flex-col items-center ">
            {phone}
          </h1>
          <p className="text-white text-center mb-4">{bio}</p>
          <h3 className="italic text-gray-600 mb-4">Skin Type: Combination Skin</h3>
          <button className="w-full bg-slate-100 text-slate-600 font-semibold py-2 rounded-lg shadow-md transition-transform transform hover:scale-105">
            Edit Profile
          </button>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in turpis quis eros cursus tincidunt.
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat facilis sequi possimus in adipisci id itaque, numquam sunt! Corrupti, autem. Reiciendis corporis voluptatem accusantium pariatur magnam quo delectus doloremque quia!
            </p>

            <br />
            <p className="text-gray-700">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in turpis quis eros cursus tincidunt.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in turpis quis eros cursus tincidunt.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in turpis quis eros cursus tincidunt.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in turpis quis eros cursus tincidunt.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in turpis quis eros cursus tincidunt.</li>
            </p>
          </div>
        </div>
        {/* Right part end */}
      </div>
    </div>
  );
};

export default Profile;
