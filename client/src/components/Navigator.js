import React from 'react';
import { useContext } from 'react';
import { GlobalStoreContext } from './store';
import LoginScreen from './ScreenContainers/LoginScreen.js';
import RegisterScreen from './ScreenContainers/RegisterScreen.js';
import ForgotPasswordScreen from './ScreenContainers/ForgotPasswordScreen.js';
import FAQScreen from './ScreenContainers/FAQScreen.js';
import EditScreen from './ScreenContainers/EditMapScreen.js';
import ProfileScreen from './ScreenContainers/ProfileScreen.js'
import EditAccountScreen from './ScreenContainers/EditAccountScreen.js'
import MapFeed from './ScreenContainers/MapFeed.js';
import PublicMapView from './ScreenContainers/PublicMapView.js';

let exampleMaps = {
  Map1: {
      title: 'Voronoi Map Example',
      author: 'Author 1',
      reactions:{
          likes: 10,
          dislikes: 2,
          comments: [  {
            _id: '1',
            authorUsername: 'MapLover42',
            comment: 'This map is incredibly detailed. Great work!',
            timestamp: '2023-11-01T09:24:00.000Z'
          },
          {
            _id: '2',
            authorUsername: 'GeoGeek',
            comment: 'Does anyone have recommendations for similar maps?',
            timestamp: '2023-11-02T10:35:00.000Z'
          },],
      },
      type: "Voronoi Map",
      isPublic: true,
      imageUrl: 'https://orgtheory.files.wordpress.com/2012/01/soda_map.jpg',
    },
  Map2: {
      title: 'Heat Map Example',
      author: 'Author 2',
      reactions:{
          likes: 34,
          dislikes: 55,
          comments: [],
      },
      type: "Heat Map",
      isPublic: true,
      imageUrl: 'https://orgtheory.files.wordpress.com/2012/01/soda_map.jpg',
    },
  Map3: {
      title: 'Dot Map Example',
      author: 'Author 2',
      reactions:{
          likes: 0,
          dislikes: 8,
          comments: [],
      },
      type: "Dot Map",
      isPublic: true,
      imageUrl: 'https://orgtheory.files.wordpress.com/2012/01/soda_map.jpg',
    },
  Map4: {
      title: 'Spike Map Example',
      author: 'Author 2',
      reactions:{
          likes: 2,
          dislikes: 100,
          comments: [],
      },
      type: "Spike Map",
      isPublic: true,
      imageUrl: 'https://orgtheory.files.wordpress.com/2012/01/soda_map.jpg',
    },
  Map5:{
      title: 'Choropleth Map Example',
      author: 'Author 2',
      reactions:{
          likes: 20,
          dislikes: 8,
          comments: [],
      },
      isPublic: true,
      type: "Choropleth Map"
  }
}
let Map1 = exampleMaps.Map1;
const mapData = {
    name: 'Map of Treasure Island',
    author: 'John Doe',
    imageUrl: 'https://orgtheory.files.wordpress.com/2012/01/soda_map.jpg',
    description: 'This is a detailed map of Treasure Island showing all the hidden spots.',
    reactions:{
      likes: 10,
      dislikes: 2,
      comments: [],
    },
  };
export default function Navigator() {
    const { store } = useContext(GlobalStoreContext);
    console.log(store)

    switch (store.currentPage) {
        case store.currentPageType.login:
            return (<LoginScreen />)
        case store.currentPageType.mapFeed:
            return (<MapFeed maps/>)
        case store.currentPageType.publicMapView:
            return (<PublicMapView map={Map1} likes = {Map1.reactions.likes} dislikes = {Map1.reactions.dislikes} comments = {Map1.reactions.comments}/>)
        case store.currentPageType.forgotPassScreen:
            return (<ForgotPasswordScreen/>)
        case store.currentPageType.registerScreen:
            return (<RegisterScreen/>)
        case store.currentPageType.faqScreen:
            return (<FAQScreen/>)
        case store.currentPageType.editMapScreen:
            return (<EditScreen/>)
        case store.currentPageType.editAccScreen:
            return (<EditAccountScreen/>)
          case store.currentPageType.profileScreen:
            return (<ProfileScreen/>)
        default:
            return (<LoginScreen />)
    }
}