import React, { useState, useEffect } from "react";

const HomeCard = (props) => {
  const [activePostIndex, setActivePostIndex] = useState(null);
  const [username, setUsername] = useState("");


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      setUsername(user.username);
    }
  }, []);

  // event when comment button is clicked
  const handleComment = (index) => {
    // Toggle the active post index to show/hide the comment section
    setActivePostIndex(activePostIndex === index ? null : index);
  };

  return (
    <div className="mt-10 container ml-64 p-6 w-10/12">

      <h1>Welcome, {username} </h1>
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
                <p className="text-gray-700 mb-4">
                  Honest Review: Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Voluptatum fugiat, id soluta necessitatibus
                  veritatis assumenda saepe. Blanditiis libero voluptas debitis!
                  Deleniti doloribus inventore sed perspiciatis! Corporis cum
                  iste fugiat ab?
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <strong>Product Name:</strong> <br /> Cetaphil Sun SPF 50+
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <strong>Source:</strong> <br /> www.healme.com.np
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <strong>Skin Type:</strong> <br /> Oily/Combination Skin
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <strong>Time Span:</strong> <br /> 2 Months
                  </div>
                </div>
                <img
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  src={post.imgUrl}
                  alt="Post"
                />
                <div className="flex flex-col  text-gray-600">
                  <div className="flex justify-between">
                    <button className="flex items-center gap-1 h-9 w-36 justify-center bg-gray-200 rounded-full px-4 py-1 text-sm">
                      <i className="ri-thumb-up-line"></i>
                      {post.likes}
                    </button>
                    <button
                      onClick={() => handleComment(index)} // Pass the index to the handler
                      className="flex items-center gap-1 h-9 w-36 justify-center  bg-gray-200 rounded-full px-4 py-1 text-sm"
                    >
                      <i className="ri-chat-2-line"></i>
                      {post.comment}
                    </button>

                    <button className="flex items-center gap-1 h-9 w-36 justify-center  bg-gray-200 rounded-full px-4 py-1 text-sm">
                      <i className="ri-share-forward-line"></i>
                      {post.shares}
                    </button>
                  </div>

                  {/* ADD A COMMENT PART */}
                  <div>
                    {activePostIndex === index && (
                      <div className="mb-4 mt-4">
                        <h2 className="text-xl font-semibold mb-2">
                          Post a Reply
                        </h2>
                        <input
                          className="w-full h-20 border-2 border-gray-300 rounded-lg p-2"
                          type="text"
                          placeholder="Write a response to this post"
                        />

                        <div className="mt-4 space-y-4">
                          {/* Reply 1 */}
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-red-500"></div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <span className="font-semibold">
                                    @AcneTreat_byRuch
                                  </span>
                                  <p className="text-gray-500 text-sm">
                                    (10hr ago)
                                  </p>
                                </div>
                                <button className="bg-gray-700 text-white px-3 py-1 rounded-lg">
                                  Reply
                                </button>
                              </div>
                              <p className="text-sm text-gray-700">
                                Sunscreen ACTUALLY protected my skin from skin
                                DISEASE
                              </p>
                            </div>
                          </div>

                          {/* Reply 2 */}
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-red-500"></div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <span className="font-semibold">
                                    @AcneTreat_byRuch
                                  </span>
                                  <p className="text-gray-500 text-sm">
                                    (10hr ago)
                                  </p>
                                </div>
                                <button className="bg-gray-700 text-white px-3 py-1 rounded-lg">
                                  Reply
                                </button>
                              </div>
                              <p className="text-sm text-gray-700">
                                Sunscreen ACTUALLY protected my skin from skin
                                DISEASE
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
                <span className="block font-semibold">
                  {popularUser.username}
                </span>
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
