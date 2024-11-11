import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './UploadPage.scss'
const UploadNav = () => {
 
  return (
    <aside className="">
      <div className="upload_nav">
        <ul>
          <Link  to={{
            pathname: "/admin/upload/nonAccept",
          }} style={{ textDecoration: "none" }}>
            <li>
              <span>Chưa xác nhận</span>
            </li>
          </Link>
          <Link  to={{
            pathname: "/admin/upload/accept",
          }} style={{ textDecoration: "none" }}>
            <li>     <span>Đã xác nhận</span>
            </li>
          </Link>
          
        </ul>
      </div>
    </aside>
  );
};

export default UploadNav;


