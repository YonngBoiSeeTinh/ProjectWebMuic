import React, { useState, useEffect } from 'react'; // Để sử dụng useState và useEffect
import { useSelector } from 'react-redux'; // Để sử dụng useSelector

import { Link, useNavigate } from "react-router-dom";
import './NavigationTop.css'
import Login from '../User/login'
import Resiter from '../User/register'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Navigation =({isSignIn,setIsSignIn,filter,setFilter})=>  {

    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false); // State cho phần đăng ký
   
    
    const user = useSelector((state) => state.user)
    const navigate = useNavigate();
    useEffect(() => {
        if (user && user.name) {
            setIsSignIn(true);
            if (user.isAdmin){
                navigate('/admin');
            } 
        }
     else  {
            setIsSignIn(false);
        }
    }, [user]);  // Chạy lại khi user thay đổi

    const handleOpenLogin = () => {
        setShowLogin(true);
        setShowSignUp(false); // Đảm bảo tắt phần đăng ký khi mở đăng nhập
    };
  
    const handleOpenSignUp = () => {
        setShowSignUp(true);
        setShowLogin(false); // Đảm bảo tắt phần đăng nhập khi mở đăng ký
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
        setShowSignUp(false); // Đóng cả hai
    };
    const handeFilter =(e)=>{
        setFilter(e.target.value)
    }
    const handleSearch =(e)=>{
        e.preventDefault();
        if (filter){
            navigate('/songs');
        } 
    }
        return (
            <div className="sub-menu">
                <div className='sub-menu-item'>
                <div className="sub-menu-1">
                        <Link className="" to="/">
                                <div className="logo">

                                </div>
                            </Link>
                    <ul className="lst-menu">
                        
                        <li>
                            <Link to="/discovery">Khám Phá</Link>
                        </li>
                        <li>
                            <Link to="/songs">Bài Hát</Link>
                        </li>
                        <li>
                            <Link to="/ranking">BXH</Link>
                        </li>
                        <li>
                            <Link to="/top100">Top 100</Link>
                        </li>
                    </ul>
                </div>
                <div className="sub-menu-2">
                    <ul className="lst-menu">
                        <li className="search-bar"> 
                            <form className='FormSearch' onSubmit={handleSearch}>
                            <input      id='input'
                                        type="text" 
                                        placeholder="Tìm kiếm..." 
                                        className="search-input" 
                                        onChange={handeFilter}
                                        style={{ 
                                            border: 'none', 
                                            width: '100%', 
                                            height: '95%' ,
                                            padding: '0px 5px'
                                        }}
                                />    
                            </form>         
                                
                        </li>
                        <li>
                            <Link to="/upload"  className='nav_upload-item'  style={{color:"#5092dd"}}>
                            <CloudUploadIcon/>Upload
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sub-menu-3">
                    
                    <Link to={`/userPage`}  style={{ display: isSignIn ? 'flex' : 'none' }} className='sub-menu_account'>
                        <img className='img-account' src={user?.avatar || ""}/>
                        <p> {user.name} </p>
                       
                    </Link>
                    
                    <div className="login" style={{ display: isSignIn ? 'none' : 'flex' }}>
                    <Link to="#" onClick={handleOpenLogin}  >Đăng nhập</Link>
                    </div> 
                    <div className="register" style={{ display: isSignIn ? 'none' : 'flex' }}>
                    <Link to="#" onClick={handleOpenSignUp}  >Đăng ký</Link>
                    </div>
                </div>
                </div>
             
                {showLogin && (
                <div className="overlay">
                    <div className="login-modal">
                        <button className="close-button" onClick={handleCloseLogin}>
                            &times;
                        </button>
                        <Login handleOpenSignUp={handleOpenSignUp} handleCloseLogin={handleCloseLogin} setIsSignIn={setIsSignIn}  />
                    </div>
                </div>
            )}

            {showSignUp && (
                <div className="overlay">
                    <div className="login-modal">
                        <button className="close-button" onClick={handleCloseLogin}>
                            &times;
                        </button>
                        <Resiter handleOpenLogin={handleOpenLogin} /> {/* Truyền hàm mở đăng nhap */}
                    </div>
                </div>
            )}
            </div>
        );
    
}

export default Navigation;
