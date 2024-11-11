import React,{useState} from "react";
import { logout } from "../../../Service/UserService";
import { resetUser, updateUser } from "../../../Redux/sliders/userSlide"; 
import { useNavigate, Link,useLocation  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


function UserSideBar ({setIsSignIn,user}){   
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = async () => {
      await logout();
      dispatch(resetUser());
      navigate('/');
      setIsSignIn(false);
  };
 
  const location = useLocation(); 
 
    return(
        <aside className="updateProfile_sidebar">
            
            <img src={user?.avatar || ""}></img>
            <ul>
                <Link to="/admin/customer/profile/profile" state={{ user }}>
                    <li className={location.pathname === "/admin/customer/profile/profile" ? "active" : ""}> Quản lý tài khoản</li>
                </Link>
                <Link to="/admin/customer/profile/playlist">
                    <li className={location.pathname === "/admin/customer/profile/playlist" ? "active" : ""}>Playlist</li>
                </Link>
                <Link to="/admin/customer/profile/history">
                    <li className={location.pathname === "/admin/customer/profile/history" ? "active" : ""}> Lịch sử</li>
                </Link>
                <Link to="#" onClick={handleLogOut}>
                    <li> Đăng xuất</li>
                </Link>
            </ul>
        </aside>
    )

}

export default UserSideBar;