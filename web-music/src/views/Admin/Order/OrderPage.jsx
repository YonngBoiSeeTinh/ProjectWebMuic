import React, { useState,useEffect } from "react";
import { Outlet } from 'react-router-dom';

import OrderNav from './OrderNav'

import './OrderPage.scss';

const OrderPage = () => {

  return (
    <div className="order_page">
      <OrderNav  />
      <main className="main">  
        <div className="order_title">
            <div className="num">#</div>
            <div className="name">
             Tên
            </div>
            <div className="addres">Địa chỉ</div>  
            <div className="date">Ngày</div>
            <div className="status">Trạng thái</div>
            <div className="action">Chi tiết</div>
        </div> 
        <Outlet  /> 
      </main>  
    </div>
  );
};

export default OrderPage;
