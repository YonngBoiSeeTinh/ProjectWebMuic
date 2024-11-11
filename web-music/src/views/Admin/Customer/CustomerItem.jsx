import React, { useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import './Customer.scss'

const CustomerManagement = ({customer}) => {
  const handleDelete = (id) => {
    console.log('Xóa khách hàng có ID:', id);
  };
  return (          
        <div className="customer_title customer_item">
            <div className="num">1</div>
            <div className="name"> <img src={customer.avatar}/> {customer.name} </div>
            <div className="email">{customer.email}</div>  
            <div className="phone">{customer.phone}</div>
            <div className="address">{customer.address}</div>
            <div className="action" >
              <Link to={'/admin/customerDetail'} state={{ user: customer  }}>Xem Chi tiết</Link>
              <button>X</button>
            </div>
        </div> 
  );
};



const handleDelete = (id) => {
  console.log('Xóa khách hàng có ID:', id);
};

export default CustomerManagement;
