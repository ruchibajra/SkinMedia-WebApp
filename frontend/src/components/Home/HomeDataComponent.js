import React from 'react';
import HomeCard from './HomeCard';

const HomeDataComponent = () => {
  const topicList = [
    {
      imgUrl: 'https://cdn.cdnparenting.com/articles/2018/11/05182309/1125973946-H.webp',
      topicTitle: '#OpenPores',
    },
    {
      imgUrl: 'https://assets.clevelandclinic.org/transform/fc52e376-b64a-4bfe-a219-9fa3ecdd3c2a/acne-on-face-1326434308-770x533-1_jpg',
      topicTitle: '#AcneTreatment',
    },
    {
      imgUrl: 'https://pds.org.ph/wp-content/uploads/2023/07/Hyperpigmentation-1024x682.webp',
      topicTitle: '#Hyperpigmentation',
    },
    {
      imgUrl: 'https://lapiel.in/wp-content/uploads/2023/02/LaPiel_Wrinkle_Before.png',
      topicTitle: '#AntiAging',
    },
    {
      imgUrl: 'https://img.freepik.com/free-photo/close-up-skin-pores-during-face-care-routine_23-2149383451.jpg',
      topicTitle: '#DarkCircles',
    },
  ];


  const postList = [
    {
        username: '@AcneTreat_byRuch',
        timespan: '10hr ago',
        title: 'Sunscreen ACTUALLY protected my skin from skin DISEASE',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sunscreen_on_back_under_normal_and_UV_light.jpg/1280px-Sunscreen_on_back_under_normal_and_UV_light.jpg',
        likes: '524',
        comment: '5.2k',
        shares: '48'
    },

    {
        username: '@DermaPoreTreat_2024',
        timespan: '5 mins ago',
        title: 'Tighten Your Open Pores with Derma Co',
        imgUrl: 'https://i.ytimg.com/vi/zox6Kr0KlHE/maxresdefault.jpg',
        likes: '504',
        comment: '2k',
        shares: '108'
    }

  ]

  const popularUserList = [
    {
        username:  '@AcneTreat_byRuch',
        members: '2,564,212 members'
    },

    {
        username:  '@HealmeNepal',
        members: '8,004,712 members'
    }
  ]

  return (
    <>
      <HomeCard topicData={topicList} postData={postList} popularUserData = {popularUserList}/>
    </>
  );
};

export default HomeDataComponent;
