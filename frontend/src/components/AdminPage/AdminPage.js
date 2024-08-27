import React, { useEffect, useState } from "react";
import { FaUserCheck, FaUserSlash } from "react-icons/fa";
import axios from "axios";

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/all", {
          headers: {
            Authorization: localStorage.getItem("token"), // Adjust based on how you store the token
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDisableUser = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/disable/${userId}`, {}, {
        headers: {
          Authorization: localStorage.getItem("token"), // Adjust based on how you store the token
        },
      });
      setUsers(users.map(user => user._id === userId ? { ...user, disabled: true } : user));
    } catch (error) {
      console.error("Error disabling user:", error);
    }
  };

  const handleEnableUser = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/enable/${userId}`, {}, {
        headers: {
          Authorization: localStorage.getItem("token"), // Adjust based on how you store the token
        },
      });
      setUsers(users.map(user => user._id === userId ? { ...user, disabled: false } : user));
    } catch (error) {
      console.error("Error enabling user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      <div className="p-4 w-3/6 bg-white shadow-md mx-auto rounded-lg overflow-hidden">
        <table className="min-w-full w bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Name</th>
              <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Email</th>
              <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Status</th>
              <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-gray-700">
                <td className="py-3 px-4">{user.username}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      user.disabled
                        ? "bg-red-200 text-red-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {user.disabled ? "Disabled" : "Active"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  {user.disabled ? (
                    <button
                      onClick={() => handleEnableUser(user._id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <FaUserCheck className="inline-block mr-1" />
                      Enable
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDisableUser(user._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaUserSlash className="inline-block mr-1" />
                      Disable
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
