import React,{createContext,useState} from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/SideBar'; // Import Sidebar
import Navbar from './Nav/Navbar';
import './adminStyle.css';

export const FilterContext = createContext();

const AdminLayout = ({ isAdmin }) => {
  const [filter, setFilter] = useState('');
  return (
    <>
      {isAdmin ? (
        <FilterContext.Provider value={{ filter, setFilter }}>
          <div className="admin-layout">
            <Sidebar /> {/* Hiển thị Sidebar */}
            <main className="main-content">
              <Navbar setFilter={setFilter} />
              <Outlet  /> {/* Đây là nơi mà các route con sẽ được render */}
            </main>
          </div>
        </FilterContext.Provider>
      ) : (
        <h1 className="notify">You do not have access to this page.</h1>
      )}
    </>
  );
};

export default AdminLayout;
