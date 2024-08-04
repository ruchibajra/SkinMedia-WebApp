import React from "react";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="main-page p-10 ml-56 mt-14 w-11/12 ">
        {/* card-1  */}
        <div className="card flex flex-col mt-4 rounded h-automt-10 p-5 border-2 border-r-slate-300">
          <button
            onClick={() => navigate(-1)}
            className="bg-slate-400 p-1 pl-4 pr-4 w-24 text-sm rounded-lg"
          >
            Back
          </button>

          <div className="flex">
            <img
              className="h-96 w-5/12 mt-2 rounded-xl"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sunscreen_on_back_under_normal_and_UV_light.jpg/1280px-Sunscreen_on_back_under_normal_and_UV_light.jpg"
              alt=""
            />

            <div className="flex flex-col">
              <div className="flex">
                <div className="profile-pic h-7 w-7 rounded-full bg-red-500 ml-5"></div>
                <span className="flex  ml-3 mr-2">@AcneTreat_byRuch</span>{" "}
                <h3>(10hr ago)</h3>
              </div>

              <div className="ml-16 ">
                <h1 className="font-bold text-lg">
                  Sunscreen ACTUALLY protected my skin from skin DISEASE
                </h1>

                <span>
                  Honest Review: Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Voluptatum fugiat, id soluta necessitatibus
                  veritatis assumenda saepe. Blanditiis libero voluptas debitis!
                  Deleniti doloribus inventore sed perspiciatis! Corporis cum
                  iste fugiat ab?
                </span>

                <div className="text-sm flex mt-3 rounded-lg gap-5">
                  <p className="bg-slate-200 p-2 text-xs rounded-lg">
                    Product Name: <br /> Cetaphil Sun SPF 50+
                  </p>
                  <p className="bg-slate-200 p-2 text-xs rounded-lg">
                    Source: <br /> www.healme.com.np
                  </p>
                  <p className="bg-slate-200 p-2 text-xs rounded-lg">
                    SkinType: <br /> Oily/Combination Skin
                  </p>
                  <p className="bg-slate-200 p-2 text-xs rounded-lg">
                    TimeSpan: <br /> 2 Months
                  </p>
                </div>
              </div>

              <div className="ml-8 post-details flex">
                <button className="btn bg-[#E4E4E4] rounded-2xl text-grey text-sm ml-8 mt-2 w-14 h-6 ">
                  <i class="ri-thumb-up-line mr-2"></i>524
                </button>
                <button className="btn bg-[#E4E4E4] rounded-2xl text-grey text-sm ml-8 mt-2 w-14 h-6 ">
                  <i class="ri-chat-2-line mr-2 ">5.3k</i>
                </button>
                <button className="btn bg-[#E4E4E4] rounded-2xl text-grey text-sm ml-8 mt-2 w-14 h-6  ">
                  <i class="ri-share-forward-line mr-2"></i>48
                </button>
              </div>

              <hr className="ml-16 mr-5 mt-4 border-1" />

              <div className="ml-16 mt-4">
                <h2>Post a Reply</h2>
                <input
                  className="w-full h-20 border-2 rounded mt-2"
                  type="text"
                  placeholder="Write a response to this post"
                />

                <div className="flex flex-col mt-4 gap-4">
                  {/* reply1  */}
                  <div>
                    <div className="flex text-sm  ">
                      <div className="profile-pic h-5 w-5 rounded-full bg-red-500 "></div>
                      <span className="flex  ml-3 mr-2">@AcneTreat_byRuch</span>{" "}
                      <h3>(10hr ago)</h3>
                      <button className="ml-52 bg-slate-700 text-white pl-1 pr-1 rounded">
                        Reply
                      </button>
                    </div>
                    <h1 className="text-sm">
                      Sunscreen ACTUALLY protected my skin from skin DISEASE
                    </h1>
                  </div>

                  <div>
                    <div className="flex text-sm  ">
                      <div className="profile-pic h-5 w-5 rounded-full bg-red-500 "></div>
                      <span className="flex  ml-3 mr-2">@AcneTreat_byRuch</span>{" "}
                      <h3>(10hr ago)</h3>
                      <button className="ml-52 bg-slate-700 text-white pl-1 pr-1 rounded">
                        Reply
                      </button>
                    </div>
                    <h1 className="text-sm">
                      Sunscreen ACTUALLY protected my skin from skin DISEASE
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
