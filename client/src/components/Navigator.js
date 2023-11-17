import React from 'react';
import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import LoginScreen from './ScreenContainers/LoginScreen.js';
import RegisterScreen from './ScreenContainers/RegisterScreen.js';
import ForgotPasswordScreen from './ScreenContainers/ForgotPasswordScreen.js';
import FAQScreen from './ScreenContainers/FAQScreen.js';
import EditScreen from './ScreenContainers/EditMapScreen.js';
import ProfileScreen from './ScreenContainers/ProfileScreen.js'
import EditAccountScreen from './ScreenContainers/EditAccountScreen.js'
import MapFeed from './ScreenContainers/MapFeed.js';
import PublicMapView from './ScreenContainers/PublicMapView.js';

const maps = [
    {
      title: 'Map 1',
      author: 'Author 1',
      likes: 10,
      dislikes: 2,
      imageUrl: 'https://orgtheory.files.wordpress.com/2012/01/soda_map.jpg',
    },
    {
      title: 'Map 556',
      author: 'Author 2',
      likes: 34,
      dislikes: 55,
      imageUrl: 'https://orgtheory.files.wordpress.com/2012/01/soda_map.jpg',
    },
    {
      title: 'Map 6',
      author: 'Author 2',
      likes: 0,
      dislikes: 8,
      imageUrl: 'https://orgtheory.files.wordpress.com/2012/01/soda_map.jpg',
    },
    {
      title: 'Map 7',
      author: 'Author 2',
      likes: 2,
      dislikes: 100,
      imageUrl: 'https://orgtheory.files.wordpress.com/2012/01/soda_map.jpg',
    },
  ];
const mapData = {
    name: 'Map of Treasure Island',
    author: 'John Doe',
    imageUrl: 'https://orgtheory.files.wordpress.com/2012/01/soda_map.jpg',
    description: 'This is a detailed map of Treasure Island showing all the hidden spots.',
    likes: 150,
    dislikes: 3
  };
export default function Navigator() {
    const { store } = useContext(GlobalStoreContext);
    console.log(store)

    switch (store.currentPage) {
        case store.currentPageType.login:
            return (<LoginScreen />)
        case store.currentPageType.mapFeed:
            return (<MapFeed maps={maps}/>)
        case store.currentPageType.publicMapView:
            return (<PublicMapView map={mapData}/>)
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