import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import './dashboard.scss';


const fetchApiSong = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/api/song/get`);
    return res.data.data; // Đảm bảo đây là một mảng
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const SongCount = () => {
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0 - 11
  const currentYear = currentDate.getFullYear();
  
  // lấy số lượng Song
  const querySong = useQuery({ queryKey: ['Song'], queryFn: fetchApiSong });
  const SongList = querySong.data || [];
  const customerList = SongList.filter ((item)=>((item.role!="employee") && !item.isAdmin))

  const getSongCountByMonth = (customers) => {
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

const customerCounts = getSongCountByMonth(customerList)
let compareSong = 0;
let classNameForCompare = 'neutral';
if (customerCounts.previousMonth > 0) {
  compareSong = ((customerCounts.currentMonth - customerCounts.previousMonth) / customerCounts.previousMonth) * 100;
  classNameForCompare = compareSong > 0 ? 'increase' : 'decrease';
  compareSong = Math.round(compareSong); 
}


  return (   
         <div className='card-top_item'>
            <h4 className='title'>UPLOAD TRONG THÁNG</h4>
            <span className={classNameForCompare}>{compareSong}%</span>
            <div className='amount'>{customerCounts.currentMonth}</div>
            <Link className='link'>Xem chi tiết</Link>
            <span className='icon'>icon</span>
         </div>
    
  );
  
};

export default SongCount;
