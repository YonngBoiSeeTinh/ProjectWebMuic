import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Navigation from './Nav/NavigationTop';
import Home from './home/Home.js';
import Songs from './Songs/Songs.js';
import PlaylistSong from './Playlist/PlaylistSongPlay.js';
import FavoritePlaylist from './Playlist/FavoritePlaylist.js'
import CreatePlaylist from './Playlist/CreatePlaylist.js';
import UpdatePlaylist from './Playlist/UpdatePlaylist.js';
import SongPlay from './Play-music/song-plays.js';
import UserPage from './User/UserPage.jsx';
import UpdateProfle from './User/UpdateProfile/UpdateProfile.jsx';
import Profile from './User/UpdateProfile/Profile.jsx';
import ProfilePlaylist from './User/UpdateProfile/ProfilePlaylist.jsx';
import History from './User/UpdateProfile/Hisroty.jsx';
import Alter from './Alter/Alter.jsx'

import Upload from './upload/Upload.js';
import UpdateSong from './upload/UpdateSong.js';
import RankingPage from './Ranking/RankingPage.js';
import UpVip from './UpVip/UpVip.js';

import AdminLayout from './Admin/AdminLayout.jsx';
import AdminDasboard from './Admin/Dashboard/AdminDasboard.jsx';
import CustomerPage from './Admin/Customer/CustomerPage.jsx'
import CustomerDetail from './Admin/Customer/CustomerDetail.jsx'
import UploadPage from './Admin/Upload/UploadPage.jsx';
import NonAcceptUpload from './Admin/Upload/Upload.jsx';
import AcceptedUpload from './Admin/Upload/UploadAccept.jsx';
import OrderPage from './Admin/Order/OrderPage.jsx';
import Order from './Admin/Order/Order.jsx';
import AcceptOrder from './Admin/Order/OrderAccept.jsx';

import { isJsonString } from '../Service/ultils';
import { axiosJWT, GetDetailUser } from '../Service/UserService.js';
import { refresh_token } from '../Service/UserService';
import './style.css';
import { useDispatch } from 'react-redux';
import { updateUser } from '../Redux/sliders/userSlide';
import { useSelector } from 'react-redux';
import {

  Routes,
  Route,
  Navigate,
  useLocation // Import useLocation ở đây
} from "react-router-dom";

import Footer from './Footer/Footer.jsx';

function App() {
  const [isSignIn, setIsSignIn] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

    useEffect(() => {
      const result = handleDecode();
      if (result) {
        const { storageData, decode } = result;
        if (decode?.id) {
          handelGetDetailUser(decode.id, storageData);
        }
      }
    }, []);


    const handleDecode = () => {
      let storageData = localStorage.getItem('accessToken');
      let decode = {};
      if (storageData && isJsonString(storageData)) {
        storageData = JSON.parse(storageData);
        decode = jwtDecode(storageData);
        return { decode, storageData };
      }
      return null;
    };
    axiosJWT.interceptors.response.use(function (config) {
      const result = handleDecode();
      if (result) {
          const { storageData, decode } = result;
          const currentDate = new Date();
          
          if (decode?.exp < currentDate.getTime() / 1000) { // mls
              const data = refresh_token();
              config.headers['token'] = `Bearer ${data?.access_token}`;
              console.log('Hết hạn access token:', data.access_token);
          }
      }
      
      return config;
  }, function (error) {
      return Promise.reject(error);
  });
    const handelGetDetailUser = async (id, token) => {
      const res = await GetDetailUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
    };
const [filter,setFilter] = useState("")
const [alertMessage, setAlertMessage] = useState('');
const [type, setType] = useState('');
const [showAlert, setShowAlert] = useState(false);
const handleCloseAlert = () => {
  setShowAlert(false);
};

    return (
      <div>
        {!isAdminPage && <Navigation isSignIn={isSignIn} setIsSignIn={setIsSignIn} filter={filter} setFilter={setFilter} />}
        <div className="main-container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/discovery' element={<Home />} />
            <Route path='/songs' element={<Songs filter={filter} />} />
            <Route path='/ranking' element={<RankingPage />} />
            <Route path='/upload' element={<Upload user= {user}/>} />
            <Route path='/upvip' element={<UpVip user= {user}/>} />
            <Route path='/updateSong' element={<UpdateSong user= {user}/>} />
            <Route path='/song_play/:id' element={<SongPlay />} />
            <Route path='/playListSong' element={<PlaylistSong />} />
            <Route path='/favoritePlaylist' element={<FavoritePlaylist />} />
            
            <Route path='/userPage' element={<UserPage setIsSignIn={setIsSignIn} />}/>
            <Route path='/updateProfile' element={<UpdateProfle setIsSignIn={setIsSignIn} />} >
                    <Route index element={<Profile user= {user}/>} />
                    <Route path='profile' element={<Profile user= {user} />} />
                    <Route path='playlist' element={<ProfilePlaylist user= {user} />} />
                    <Route path='history' element={<History user= {user} />} />
            </Route>
            <Route path='/createPlaylist' element={<CreatePlaylist user= {user} />} />
            <Route path='/updatePlaylist' element={<UpdatePlaylist user= {user} />} />
            
            <Route path='/admin/' element={user.isAdmin ? <AdminLayout isAdmin={user.isAdmin} /> : <Navigate to="/" />}>
              <Route index element={<AdminDasboard />} />
              <Route path='dashboard' element={<AdminDasboard />} />
              <Route path='customers' element={<CustomerPage />} />
              <Route path='customerDetail' element={<CustomerDetail setAlertMessage={setAlertMessage}
                     setShowAlert={setShowAlert} setType={setType}/>} 
                />
              <Route path='upload' element={<UploadPage />} >
                 <Route index element={<NonAcceptUpload />} />
                 <Route path='nonAccept' element={<NonAcceptUpload />} /> 
                 <Route path='accept' element={<AcceptedUpload />} /> 
              </Route>
              <Route path='orders' element={<OrderPage />} >
                 <Route index element={<Order setAlertMessage={setAlertMessage} 
                                          setShowAlert={setShowAlert} setType={setType}/>} />
                 <Route path='nonAccept' element={<Order setAlertMessage={setAlertMessage} 
                                          setShowAlert={setShowAlert} setType={setType}/>} /> 
                 <Route path='accept' element={<AcceptOrder setAlertMessage={setAlertMessage} 
                                          setShowAlert={setShowAlert} setType={setType}/>} /> 
              </Route>
            </Route>
          </Routes>
        </div>
        {showAlert && <Alter message={alertMessage} onClose={handleCloseAlert}  type={type} />}
        {!isAdminPage && <Footer/>}
        
      </div>
    );
  };



export default App;
