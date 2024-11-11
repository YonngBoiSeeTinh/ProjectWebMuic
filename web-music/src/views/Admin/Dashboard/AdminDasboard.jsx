import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Bar ,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Link } from 'react-router-dom';
import './dashboard.scss';
import UserDashboard from './UserCount';
import UploadCount from  './UploadCount'
import OrderCount from './OrderCount';

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <div className='card-top'>
        <UserDashboard/>
        <UploadCount/>
        <OrderCount/>
        <UserDashboard/>
        
      </div>
      <div className='total_by_month'>
        <div className='compareMonth'>
          <h4>CÁC TOPIC HOT : </h4>
        </div>
        <div className='total_month-chart'>
          <h3>DOANH THU 6 THÁNG QUA: </h3>
         
        </div>
      </div>
      <div className='order_by_month'>
        <h3>UPLOAD 6 THÁNG QUA: </h3>
       
      </div>

     
    </div>
  );
  
};

export default AdminDashboard;
