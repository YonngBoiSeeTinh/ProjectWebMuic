import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import './dashboard.scss';


const fetchApiOrder = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/api/order/get`);
    return res.data.data; // Đảm bảo đây là một mảng
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const OrderCount = () => {
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0 - 11
  const currentYear = currentDate.getFullYear();
  
  // lấy số lượng Order
  const queryOrder = useQuery({ queryKey: ['Order'], queryFn: fetchApiOrder });
  const OrderList = queryOrder.data || [];
  const customerList = OrderList.filter ((item)=>((item.role!="employee") && !item.isAdmin))

  const getOrderCountByMonth = (customers) => {
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

const customerCounts = getOrderCountByMonth(customerList)
let compareOrder = 0;
let classNameForCompare = 'neutral';
if (customerCounts.previousMonth > 0) {
  compareOrder = ((customerCounts.currentMonth - customerCounts.previousMonth) / customerCounts.previousMonth) * 100;
  classNameForCompare = compareOrder > 0 ? 'increase' : 'decrease';
  compareOrder = Math.round(compareOrder); 
}


  return (   
         <div className='card-top_item'>
            <h4 className='title'>LƯỢT ĐĂNG KÝ THÀNH VIÊN</h4>
            <span className={classNameForCompare}>{compareOrder}%</span>
            <div className='amount'>{customerCounts.currentMonth}</div>
            <Link className='link'>Xem chi tiết</Link>
            <span className='icon'>icon</span>
         </div>
    
  );
  
};

export default OrderCount;
