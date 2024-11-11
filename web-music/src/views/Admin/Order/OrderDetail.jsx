import React, { useState,useEffect } from "react";


const OrderPage = () => {
  
  return (
    <div className="order_detail">
    
      <main className="main">  
        <div className="order_title">
            <div className="num">#</div>
            <div className="avatar">Tên</div>
            <div className="name">Tên</div>
            <div className="addres">Địa chỉ</div>  
            <div className="date">Ngày</div>
            <div className="status">Trạng thái</div>
            <div className="action">Chi tiết</div>
        </div> 
      </main>  
    </div>
  );
};

export default OrderPage;
