import React from "react";
import { useNavigate } from "react-router-dom";

const Post = ({ noMargin }) => {
  const navigate = useNavigate();

  return (
    <div className={`p-6 mt-8 ${noMargin ? '' : 'ml-56'} max-w-7xl mx-auto`}>
      {/* Card Container */}
      <button
          onClick={() => navigate(-1)}
          className="bg-gray-800 text-white py-2 px-4 rounded-lg mt-4 hover:bg-gray-700 transition"
        >
          Back
        </button>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-4">
      

        <div className="flex flex-col md:flex-row p-6">
          {/* Image Section */}
          <div className="flex-shrink-0 md:w-1/2 mb-6 md:mb-0">
            <img
              className="w-full h-96 object-cover rounded-lg"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sunscreen_on_back_under_normal_and_UV_light.jpg/1280px-Sunscreen_on_back_under_normal_and_UV_light.jpg"
              alt="Sunscreen"
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 ml-8">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-red-500 mr-3"></div>
              <div>
                <span className="font-semibold">@AcneTreat_byRuch</span>
                <p className="text-gray-500 text-sm">(10hr ago)</p>
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-4">
              Sunscreen ACTUALLY protected my skin from skin DISEASE
            </h1>

            <p className="text-gray-700 mb-4">
              Honest Review: Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum fugiat, id soluta necessitatibus veritatis assumenda saepe. Blanditiis libero voluptas debitis! Deleniti doloribus inventore sed perspiciatis! Corporis cum iste fugiat ab?
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

            <div className="flex gap-4 mb-4">
              <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center gap-1">
                <i className="ri-thumb-up-line"></i> 524
              </button>
              <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center gap-1">
                <i className="ri-chat-2-line"></i> 5.3k
              </button>
              <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center gap-1">
                <i className="ri-share-forward-line"></i> 48
              </button>
            </div>

            <hr className="border-gray-300 mb-4" />

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Post a Reply</h2>
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
                        <span className="font-semibold">@AcneTreat_byRuch</span>
                        <p className="text-gray-500 text-sm">(10hr ago)</p>
                      </div>
                      <button className="bg-gray-700 text-white px-3 py-1 rounded-lg">Reply</button>
                    </div>
                    <p className="text-sm text-gray-700">
                      Sunscreen ACTUALLY protected my skin from skin DISEASE
                    </p>
                  </div>
                </div>

                {/* Reply 2 */}
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-red-500"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-semibold">@AcneTreat_byRuch</span>
                        <p className="text-gray-500 text-sm">(10hr ago)</p>
                      </div>
                      <button className="bg-gray-700 text-white px-3 py-1 rounded-lg">Reply</button>
                    </div>
                    <p className="text-sm text-gray-700">
                      Sunscreen ACTUALLY protected my skin from skin DISEASE
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
