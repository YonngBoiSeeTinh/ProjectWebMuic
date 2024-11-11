import React from "react";

const Check = ({ copyrightInfo, setShowModal,showModal }) => {

  const handleCloseModal = () => {
    setShowModal(false);  // Close modal when clicked
  };

  return (
    <div className="check_container" style={{display:showModal?"block":"none"}}>
        <div className="check-content">
        
          <h2>{copyrightInfo?.message === "Found" ? "Bài hát đã được đăng ký với thông tin :" :"Bài hát chưa được đăng ký bản quyền"}</h2>
          <p><strong>Tên bài hát:</strong> {copyrightInfo?.song?.title || "N/A"}</p>
          <p><strong>Nghệ sỹ:</strong> {copyrightInfo?.song?.artist || "N/A"}</p>
          <p><strong>Album:</strong> {copyrightInfo?.song?.album || "N/A"}</p>
          <p><strong>Ngày ra mắt:</strong> {copyrightInfo?.song?.release_date || "N/A"}</p>
          <p><strong>Kiểm tra bài hát:</strong> 
            <a href={copyrightInfo?.song?.song_link || "#"} target="_blank" rel="noopener noreferrer">
             Kiểm tra
            </a>
          </p>

          <button onClick={handleCloseModal}>Close</button>
        </div>
     
    </div>
  );
};

export default Check;
