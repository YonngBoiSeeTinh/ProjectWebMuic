import React, { useState,useEffect } from "react";
import { Outlet } from 'react-router-dom';

import UploadNav from './UploadNav'

import './UploadPage.scss';

const UploadPage = () => {
  
  return (
    <div className="admin_upload_page" >
      <UploadNav  />
      <main className="main">  
        <div className="upload_title">
            <div className="num">#</div>
            <div className="name">  Tên </div>
            <div className="date">Ngày</div>
            <div className="status">Trạng thái</div>
            <div className="action">Hành động</div>
        </div> 
        <Outlet  /> 
      </main>  
    </div>
  );
};

export default UploadPage;
