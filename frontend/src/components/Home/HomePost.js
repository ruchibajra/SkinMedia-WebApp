// import React from 'react';

// const HomePost = ({ postData, props }) => {
//   return (
//     <div className="card-container w-8/12">
//       {postData.map((post, index) => (
//         <div
//           key={index}
//           className="card flex flex-col mt-10 rounded h-auto p-2 border-2 border-r-slate-300 hover:bg-gray-200 cursor-pointer"
//         >
//           <div className="flex">
//             <div className="profile-pic h-7 w-7 rounded-full bg-red-500 ml-2"></div>
//             <span className="flex mr-2">{post.username}</span>
//             <h3 className="flex">{post.timespan}</h3>
//           </div>
//           <h1 className="ml-9 font-bold text-lg">{post.title}</h1>
//           <div className="ml-8 h-72 w-10/12 mt-2">
//             <img
//               className="h-full w-full object-cover rounded-lg"
//               src={post.imgUrl}
//               alt="Image"
//             />
//           </div>
//           <div className="post-details flex">
//             <button className="btn bg-[#E4E4E4] rounded-2xl text-grey text-sm ml-8 mt-2 w-14 h-6">
//               <i className="ri-thumb-up-line mr-2"></i>
//               {post.likes}
//             </button>
//             <button className="btn bg-[#E4E4E4] rounded-2xl text-grey text-sm ml-8 mt-2 w-14 h-6">
//               <i className="ri-chat-2-line mr-2"></i>
//               {post.comment}
//             </button>
//             <button className="btn bg-[#E4E4E4] rounded-2xl text-grey text-sm ml-8 mt-2 w-14 h-6">
//               <i className="ri-share-forward-line mr-2"></i>
//               {post.shares}
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HomePost;
