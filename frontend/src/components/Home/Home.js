import React from "react";

const Home = () => {
  console.log("Home component rendered");

  return (
    <>
      {/* <div className="flex "> */}

      <div className="hero-page ml-56 mt-14 w-11/12  ">
        <div className="p-4">
          {/* topic section start */}
          <div className="topic-section flex gap-3">
            <div className="topic-box h-40 w-60 bg-slate-600 rounded">
              <img
                src="https://cdn.cdnparenting.com/articles/2018/11/05182309/1125973946-H.webp"
                alt=""
              />
            </div>
            <div className="topic-box h-40 w-60 bg-slate-600 rounded">
              <divc></divc>
              <img
                src="https://assets.clevelandclinic.org/transform/fc52e376-b64a-4bfe-a219-9fa3ecdd3c2a/acne-on-face-1326434308-770x533-1_jpg"
                alt=""
              />
            </div>
            <div className="topic-box h-40 w-60 bg-slate-600 rounded">
              <img
                src="https://pds.org.ph/wp-content/uploads/2023/07/Hyperpigmentation-1024x682.webp"
                alt=""
              />
            </div>
            <div className="topic-box h-40 w-60 bg-slate-600 rounded">
              <img
                src="https://lapiel.in/wp-content/uploads/2023/02/LaPiel_Wrinkle_Before.png"
                alt=""
              />
            </div>
            <div className="topic-box h-40 w-60 bg-slate-600 rounded ">
              <img
                src="https://img.freepik.com/free-photo/close-up-skin-pores-during-face-care-routine_23-2149383451.jpg"
                alt=""
              />
            </div>
          </div>
          {/* topic section end */}

          <div className="hero-second-part flex">
            {/* main card start */}
            <div className="card-container w-8/12">
              {/* card-1  */}
              <div className="card flex flex-col mt-10 rounded h-automt-10 p-2 border-2 border-r-slate-300">
                <div className="flex">
                  <div className="profile-pic h-7 w-7 rounded-full bg-red-500  ml-2"></div>
                  <span className="flex  mr-2">@AcneTreat_byRuch</span>{" "}
                  <h3 className="flex">(10hr ago)</h3>
                </div>
                <h1 className="ml-9 font-bold text-lg">
                  Sunscreen ACTUALLY protected my skin from skin DISEASE
                </h1>

                <div className=" ml-8 h-72 w-10/12 mt-2">
                  <img
                    className="h-full w-full object-cover rounded-lg"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sunscreen_on_back_under_normal_and_UV_light.jpg/1280px-Sunscreen_on_back_under_normal_and_UV_light.jpg"
                    alt=""
                  />
                </div>

                <div className="post-details flex">
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
              </div>

              {/* card-1  */}
              <div className="card flex flex-col mt-10 rounded h-automt-10 p-2 border-2 border-r-slate-300">
                <div className="flex">
                  <div className="profile-pic h-7 w-7 rounded-full bg-red-500  ml-2"></div>
                  <span className="flex  mr-2">@AcneTreat_byRuch</span>{" "}
                  <h3 className="flex">(10hr ago)</h3>
                </div>
                <h1 className="ml-9 font-bold text-lg">
                  Sunscreen ACTUALLY protected my skin from skin DISEASE
                </h1>

                <div className=" ml-8 h-72 w-10/12 mt-2">
                  <img
                    className="h-full w-full object-cover rounded-lg"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sunscreen_on_back_under_normal_and_UV_light.jpg/1280px-Sunscreen_on_back_under_normal_and_UV_light.jpg"
                    alt=""
                  />
                </div>

                <div className="post-details flex">
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
              </div>

              {/* card-1  */}
              <div className="card flex flex-col mt-10 rounded h-automt-10 p-2 border-2 border-r-slate-300">
                <div className="flex">
                  <div className="profile-pic h-7 w-7 rounded-full bg-red-500  ml-2"></div>
                  <span className="flex  mr-2">@AcneTreat_byRuch</span>{" "}
                  <h3 className="flex">(10hr ago)</h3>
                </div>
                <h1 className="ml-9 font-bold text-lg">
                  Sunscreen ACTUALLY protected my skin from skin DISEASE
                </h1>

                <div className=" ml-8 h-72 w-10/12 mt-2">
                  <img
                    className="h-full w-full object-cover rounded-lg"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sunscreen_on_back_under_normal_and_UV_light.jpg/1280px-Sunscreen_on_back_under_normal_and_UV_light.jpg"
                    alt=""
                  />
                </div>

                <div className="post-details flex">
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
              </div>

              {/* card-1  */}
              <div className="card flex flex-col mt-10 rounded h-automt-10 p-2 border-2 border-r-slate-300">
                <div className="flex">
                  <div className="profile-pic h-7 w-7 rounded-full bg-red-500  ml-2"></div>
                  <span className="flex  mr-2">@AcneTreat_byRuch</span>{" "}
                  <h3 className="flex">(10hr ago)</h3>
                </div>
                <h1 className="ml-9 font-bold text-lg">
                  Sunscreen ACTUALLY protected my skin from skin DISEASE
                </h1>

                <div className=" ml-8 h-72 w-10/12 mt-2">
                  <img
                    className="h-full w-full object-cover rounded-lg"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sunscreen_on_back_under_normal_and_UV_light.jpg/1280px-Sunscreen_on_back_under_normal_and_UV_light.jpg"
                    alt=""
                  />
                </div>

                <div className="post-details flex">
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
              </div>



            </div>
            {/* main card end */}


            <div className="popular-category-section  w-96 ml-6 mt-10 h-96 bg-slate-300 pl-6 pt-4">
              <h1>POPULAR COMMUNITIES</h1>

              <div>
                <div className="flex mt-6 ml-6">
                  <img className= "h-7 w-7 rounded-3xl bg-red-950 "src="" alt="" />
                  <div className="flex flex-col text-sm ml-2">
                    <span>r/AskAcneSpecialist</span>
                    <span>2,365,124 members</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex mt-6 ml-6">
                  <img className= "h-7 w-7 rounded-3xl bg-red-950 "src="" alt="" />
                  <div className="flex flex-col text-sm ml-2">
                    <span>r/AskAcneSpecialist</span>
                    <span>2,365,124 members</span>
                  </div>
                </div>
              </div>


              <div>
                <div className="flex mt-6 ml-6">
                  <img className= "h-7 w-7 rounded-3xl bg-red-950 "src="" alt="" />
                  <div className="flex flex-col text-sm ml-2">
                    <span>r/AskAcneSpecialist</span>
                    <span>2,365,124 members</span>
                  </div>
                </div>
              </div>


              <div>
                <div className="flex mt-6 ml-6">
                  <img className= "h-7 w-7 rounded-3xl bg-red-950 "src="" alt="" />
                  <div className="flex flex-col text-sm ml-2">
                    <span>r/AskAcneSpecialist</span>
                    <span>2,365,124 members</span>
                  </div>
                </div>
              </div>
              <br />

              <h2>See More</h2>
            </div>
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
};

export default Home;
