import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";
const token = localStorage.getItem("token");

const Profile = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = "66abe1b02f533e2e4b25cafa"; // Replace this with the actual user ID
        const response = await axiosInstance.get(`/api/profile/${userId}`);

        // Extract data from the response
        const profileData = response.data.profile;
        setBio(profileData.bio);
        setUsername(profileData.user.name);
        setEmail(profileData.user.email);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="ml-96  justify-center bg-white p-6 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col md:flex-row">
        {/* Left part start */}
        <div className="w-full md:w-1/4 bg-slate-600 text-white p-6 flex flex-col items-center rounded-lg mb-6 md:mb-0">
          <img
            className="h-48 w-48 rounded-full border-4 border-slate-300 mb-4"
            src="https://media.licdn.com/dms/image/D4E03AQHh91ri_EZxEQ/profile-displayphoto-shrink_200_200/0/1676103858101?e=2147483647&v=beta&t=mLmyu6IlrNfSfHRZoF0CNS-Ma-x754pKj3eIkRM2fYg"
            alt="Profile"
          />
          <h1 className="text-2xl font-bold mb-2">{username} </h1>

          <h1 className="text-lg italic w-full flex flex-col items-center underline">
            {email}{" "}
          </h1>
          <p className="text-white   text-center mb-4">
            {bio}
           
          </p>
          <h3 className="italic text-gray-600 mb-4">
            Skin Type: Combination Skin
          </h3>
          <button className="w-full bg-slate-100 text-slate-600 font-semibold py-2 rounded-lg shadow-md transition-transform transform hover:scale-105">
            Edit Profile
          </button>
        </div>
        {/* Left part end */}

        {/* Right part start */}
        <div className="w-full md:w-3/4 p-6 flex flex-col">
          <h3 className="text-lg font-medium mb-4"> Overview</h3>
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
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur in turpis quis eros cursus tincidunt.{" "}
              </li>
              <li>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur in turpis quis eros cursus tincidunt.{" "}
              </li>
              <li>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur in turpis quis eros cursus tincidunt.{" "}
              </li>
              <li>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur in turpis quis eros cursus tincidunt.{" "}
              </li>
              <li>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur in turpis quis eros cursus tincidunt.{" "}
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
