import React,{useState} from "react";
import '../userPage.scss';
import { logout } from "../../../Service/UserService";
import { resetUser, updateUser } from "../../../Redux/sliders/userSlide"; 
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/ProfileSideBar'

function UpdateUserPage ({setIsSignIn}){ 
    const user = useSelector((state) => state.user);
   
    return(
     
            <div className="update_profile-container">
            <Sidebar setIsSignIn={setIsSignIn} user={user} />
            <main className="update_profile-content">
                <Outlet />
            </main>
            </div>
      
    )

}

export default UpdateUserPage;