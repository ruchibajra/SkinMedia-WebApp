import React from "react";
import { useNavigate } from "react-router-dom";

const HomeCard = (props) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/post");
  };

  return (
    <div className="mt-10 container ml-64 p-6 w-10/12">
      {/* TOPIC SECTION START */}
      <div className="flex flex-wrap gap-4 mb-8">
        {props.topicData.map((topic, index) => (
          <div
            key={index}
            className="w-full sm:w-60 md:w-64 bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              className="w-full h-40 object-cover"
              src={topic.imgUrl}
              alt="Topic"
            />
            <div className="p-4 text-center text-white font-semibold">
              {topic.topicTitle}
            </div>
          </div>
        ))}
      </div>
      {/* TOPIC SECTION END */}

      {/* SECOND PART SECTION START */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* POST SECTION START */}
        <div className="flex-1">
          {props.postData.map((post, index) => (
            <div
              key={index}
              onClick={handleCardClick}
              className="bg-white border border-gray-300 rounded-lg shadow-md mb-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center p-4 border-b border-gray-300">
                <div className="h-10 w-10 rounded-full bg-gray-400"></div>
                <div className="ml-4">
                  <span className="block font-semibold">{post.username}</span>
                  <span className="text-gray-600 text-sm">{post.timespan}</span>
                </div>
              </div>
              <div className="p-4">
                <h1 className="text-xl font-bold mb-2">{post.title}</h1>
                <img
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  src={post.imgUrl}
                  alt="Post"
                />
                <div className="flex justify-between text-gray-600">
                  <button className="flex items-center gap-1 bg-gray-100 rounded-full px-4 py-1 text-sm">
                    <i className="ri-thumb-up-line"></i>
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1 bg-gray-100 rounded-full px-4 py-1 text-sm">
                    <i className="ri-chat-2-line"></i>
                    {post.comment}
                  </button>
                  <button className="flex items-center gap-1 bg-gray-100 rounded-full px-4 py-1 text-sm">
                    <i className="ri-share-forward-line"></i>
                    {post.shares}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* POST SECTION END */}

        {/* POPULAR COMMUNITIES SECTION START */}
        <div className="w-full md:w-96 bg-gray-200 p-4 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold mb-4">Popular Communities</h1>
          {props.popularUserData.map((popularUser, index) => (
            <div key={index} className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-400"></div>
              <div className="ml-4 text-sm">
                <span className="block font-semibold">{popularUser.username}</span>
                <span className="text-gray-600">{popularUser.members} </span>
              </div>
            </div>
          ))}
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            See More
          </button>
        </div>
        {/* POPULAR COMMUNITIES SECTION END */}
      </div>
    </div>
  );
};

export default HomeCard;
