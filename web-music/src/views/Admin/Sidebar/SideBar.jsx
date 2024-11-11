import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { logout } from "../../../Service/UserService";
import { useDispatch } from 'react-redux';
import { resetUser } from "../../../Redux/sliders/userSlide";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import InsertChartOutlinedSharpIcon from "@mui/icons-material/InsertChartOutlinedSharp";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import BadgeIcon from '@mui/icons-material/Badge';
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import './sideBar.scss'
const Sidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    await logout();
    dispatch(resetUser());
    navigate('/');
};
  return (
    <aside className="">
      <div className="sidebar">
      <div className="top">
        <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo_admin">MusicWeb</span>
        </Link>
      </div>
      <hr />
      <div className="bottom">
        <ul>
          <p className="title">CHÍNH</p>
          <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">QUẢN LÝ</p>
          <Link to="/admin/customers" style={{ textDecoration: "none" }}>
            <li>
              <Person3OutlinedIcon className="icon" />
              <span>Người dùng</span>
            </li>
          </Link>

          <Link to="/admin/songs" style={{ textDecoration: "none" }}>
            <li>
              <LocalGroceryStoreOutlinedIcon className="icon" />
              <span>Danh sách nhạc</span>
            </li>
          </Link>
          <Link to="/admin/orders/nonAccept" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardOutlinedIcon className="icon" />
              <span>Đơn hàng</span>
            </li>
            
          </Link>
   
          <Link to="/admin/upload/nonAccept" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardOutlinedIcon className="icon" />
              <span>Upload</span>
            </li>
            
          </Link>
          <p className="title">THỐNG KÊ</p>
          <li>
            <InsertChartOutlinedSharpIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsActiveOutlinedIcon className="icon" />
            <span>Notifications</span>
          </li>

          <p className="title">USER INTERFACE</p>
        
          <li>
            <CalendarMonthOutlinedIcon className="icon" />
            <span>Calendar</span>
          </li>
          <li>
            <DiamondOutlinedIcon className="icon" />
            <span>Helper</span>
          </li>

          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={handleLogOut}>
              <ExitToAppOutlinedIcon className="icon" />
              <i className="fa fa-arrow-left"></i> <span>Đăng xuất</span> 
            </Link>
        </li>
        </ul>
      </div>
    </div>
    </aside>
  );
};

export default Sidebar;


