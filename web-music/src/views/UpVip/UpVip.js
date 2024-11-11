
import React,{useEffect,useState} from 'react';
import './UpVip.scss'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
const UpVip = ({user}) => {

  const order ={
    userId:user?.id,
    totalPrice:  50000,
    isPaid:false
  }
  const createOrder =async()=>{
    const response = await axios.post('http://localhost:3001/api/order/create', order);
    console.log(response.data);
  }
  return (
    
    <div className="upvip" >
        <div className='bg' ></div > 
        <div>
          <h1>NÂNG CẤP THÀNH VIÊN VIP</h1>
          <div className='vip_content'>
           Tận hưởng âm nhạc trọn vẹn với đặc quyền VIP từ chúng tôi
          </div>
          <div >
             Dùng ứng dụng Zalopay quét mã để tiếp tục thanh toán dịch vụ
          </div>
          <div className='vip_img'>
           <img src='/zalopay.jpg' />
           <img src='/zalopay.jpg' /> 
          </div>
        </div>
        <div className='action_vip'>
          <img className='qrcode'/>
          <div className='price'>50,000 VND</div>
          <button onClick={createOrder} className='order_btn'> Xác nhận thanh toán</button>
        </div>

       
    </div>
  );
};

export default UpVip;
