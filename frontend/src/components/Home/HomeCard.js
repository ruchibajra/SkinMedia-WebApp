import React from "react";
import { useNavigate } from "react-router-dom";

const HomeCard = (props) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/post");
  };
  return (
    <>
      <div className="hero-page p-4 ml-56 mt-14 w-11/12  ">
        {/* TOPIC SECTION START */}
        <div className="topic-section flex gap-3">
          {props.topicData.map((topic, index) => (
            <div
              key={index}
              className="topic-box h-48 w-60 bg-black rounded"
            >
              <img src={topic.imgUrl} alt="Image" />
              <div className="text-white flex items-center justify-center">
                {topic.topicTitle}
              </div>
            </div>
          ))}
        </div>
        {/* TOPIC SECTION END */}

        {/* SECOND PART SECTION START */}
        <div className="hero-second-part flex">
          {/* POST SECTION START */}
          <div className="card-container w-8/12">
            {props.postData.map((post, index) => (
              <div
                key={index}
                onClick={handleCardClick}
                className="card flex flex-col mt-10 rounded h-automt-10 p-2 border-2 border-r-slate-300 hover:bg-gray-200 cursor-pointer"
              >
                <div className="flex">
                  <div className="profile-pic h-7 w-7 rounded-full bg-red-500  ml-2"></div>
                  <span className="flex  mr-2">{post.username}</span>{" "}
                  <h3 className="flex">{post.timespan}</h3>
                </div>
                <h1 className="ml-9 font-bold text-lg">{post.title}</h1>

                <div className=" ml-8 h-72 w-10/12 mt-2">
                  <img
                    className="h-full w-full object-cover rounded-lg"
                    src={post.imgUrl}
                    alt="Image"
                  />
                </div>

                <div className="post-details flex">
                  <button className="btn bg-[#E4E4E4] rounded-2xl text-grey text-sm ml-8 mt-2 w-14 h-6 ">
                    <i class="ri-thumb-up-line mr-2"></i>
                    {post.likes}
                  </button>
                  <button className="btn bg-[#E4E4E4] rounded-2xl text-grey text-sm ml-8 mt-2 w-14 h-6 ">
                    <i class="ri-chat-2-line mr-2 "></i>
                    {post.comment}
                  </button>
                  <button className="btn bg-[#E4E4E4] rounded-2xl text-grey text-sm ml-8 mt-2 w-14 h-6  ">
                    <i class="ri-share-forward-line mr-2"></i>
                    {post.shares}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* POST SECTION END */}

          {/* POPULAR COMMUNITIES SECTION START */}
          <div className="popular-category-section  w-96 ml-6 mt-10 h-96 bg-slate-300 pl-6 pt-4">
            <h1>POPULAR COMMUNITIES</h1>

            {props.popularUserData.map((popularUser, index) => (
              <div key={index} className="flex mt-6 ml-6">
                <img
                  className="h-7 w-7 rounded-3xl bg-red-950 "
                  src=""
                  alt=""
                />
                <div className="flex flex-col text-sm ml-2">
                  <span>{popularUser.username}</span>
                  <span>{popularUser.members}</span>
                </div>
              </div>
            ))}
            <br />
            <button>See More</button>
          </div>
          {/* POPULAR COMMUNITIES SECTION END */}
        </div>
      </div>

      {/* SECOND PART SECTION END */}
    </>
  );
};

export default HomeCard;
