import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import './dashboard.scss';


const fetchApiUser = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/api/user/get`);
    return res.data.data; // Đảm bảo đây là một mảng
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const UserCount = () => {
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0 - 11
  const currentYear = currentDate.getFullYear();
  
  // lấy số lượng user
  const queryUser = useQuery({ queryKey: ['user'], queryFn: fetchApiUser });
  const userList = queryUser.data || [];
  const customerList = userList.filter ((item)=>((item.role!="employee") && !item.isAdmin))

  const getUserCountByMonth = (customers) => {
    const count = {
        currentMonth: 0,
        previousMonth: 0,
    };
    customers.forEach(customer => {
        const createdAt = new Date(customer.createdAt); // Giả sử `createdAt` là thuộc tính chứa ngày tạo tài khoản
        const month = createdAt.getMonth();
        const year = createdAt.getFullYear();

        if (year === currentYear) {
            if (month === currentMonth) {
                count.currentMonth += 1; // Tăng số lượng cho tháng hiện tại
            } else if (month === currentMonth - 1) {
                count.previousMonth += 1; // Tăng số lượng cho tháng trước
            }
        }
        else if (year === currentYear - 1 && currentMonth === 0 && month === 11) {
          // Xử lý trường hợp khi tháng hiện tại là tháng 1 (currentMonth === 0), cần so sánh với tháng 12 của năm trước
          count.previousMonth += 1;
      }
    });

    return count;
};

const customerCounts = getUserCountByMonth(customerList)
let compareUser = 0;
let classNameForCompare = 'neutral';
if (customerCounts.previousMonth > 0) {
  compareUser = ((customerCounts.currentMonth - customerCounts.previousMonth) / customerCounts.previousMonth) * 100;
  classNameForCompare = compareUser > 0 ? 'increase' : 'decrease';
  compareUser = Math.round(compareUser); 
}


  return (   
         <div className='card-top_item'>
            <h4 className='title'>KHÁCH HÀNG</h4>
            <span className={classNameForCompare}>{compareUser}%</span>
            <div className='amount'>{customerCounts.currentMonth}</div>
            <Link className='link'>Xem chi tiết</Link>
            <span className='icon'>icon</span>
         </div>
    
  );
  
};

export default UserCount;
