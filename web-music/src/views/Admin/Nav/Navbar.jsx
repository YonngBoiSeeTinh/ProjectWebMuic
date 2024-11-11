import React, { useContext, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import "./navbar.scss";

const Navbar = ({setFilter}) => {

  const [searchValue, setSearchValue] = useState(''); // Lưu trữ giá trị của input

  const handelSearch = (e) => {
    e.preventDefault();
    setFilter(searchValue); // Cập nhật filter bằng giá trị đã lưu trữ
  };

  return (
    <div className="navbar">
      <div className="navbarContainer">
     
          <form onSubmit={handelSearch} className="search">
            <input type="text"
            id="input"
            placeholder="Tìm kiếm"
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)}  />
            <SearchOutlinedIcon onClick={handelSearch} className="icon"/>
          </form>  
       
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            <span>Tiếng Việt</span>
          </div>
          
          <div className="item">
            <FullscreenOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsActiveOutlinedIcon className="icon" />
            <div className="counter">3</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img src="/assets/person.jpg" alt="" className="profileImg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
