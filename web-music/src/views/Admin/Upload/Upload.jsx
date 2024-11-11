import React,{useState} from "react";
import axios from 'axios';
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query';
import Pagination from '../../Pagination'
import UploadSongItem from './UploadSongItem'
import DetailCheck from './DetailCheck'

const Upload = () => {
  const fetchApi = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/song/get?sort=createdAt&sort=desc`);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(0);
  const query = useQuery({ queryKey: ['orders'], queryFn: fetchApi });

  const listUpload = query.data || [];
  let listNonAccept = listUpload.filter((item)=>!item.isAccept)
  const itemsPerPage = 5; // Số lượng sản phẩm mỗi trang
  const totalPage = Math.ceil(listNonAccept.length / itemsPerPage); 

  const startIndex = currentPage * itemsPerPage;
  const currentUploads = listNonAccept.slice(startIndex, startIndex + itemsPerPage);


  const handleClickAccept = (songId) => {
    handleAcceptUpload(songId);
  };

  const handleAcceptUpload = async (songId) => {
    try {
      console.log('songId', songId);
      const res = await axios.put(`http://localhost:3001/api/song/update/${songId}`, {
        isAccept: true 
      });
      alert("Duyệt bài hát thành công");
      return res.data.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };
  const fetchApiUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/user/get`);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  const queryUser = useQuery({ queryKey: ['creator'], queryFn: fetchApiUser });
  const listuser = queryUser.data || [];

  const getCreator =(creator)=>{
    const user = listuser.filter((item)=>item._id === creator)
    return user[0]
  }

  const deleteSongMutation = useMutation({
    mutationFn: async (originalSong) => { // songToDelete sẽ được truyền vào khi gọi mutate
        return await axios.delete(`http://localhost:3001/api/song/delete/${originalSong._id}`);
    },
    onSuccess: () => {
        console.log('Xóa bài hát thành công');
        alert('Xóa bài hát thành công!');
        // Refetch lại danh sách bài hát sau khi xóa
        queryClient.invalidateQueries('songs');
    },
    onError: (error) => {
        console.error('Lỗi khi xóa bài hát:', error);
        alert('Lỗi khi xóa bài hát');
    }
});


const handleDelete = (songToDelete) => {
    console.log('Song inside function:', songToDelete); 
    const originalSong = songToDelete.song || songToDelete;
    deleteSongMutation.mutate(originalSong); // Thực hiện xóa bài hát
};
const [showModal, setShowModal] = useState(false);
const [copyrightInfo, setCopyrightInfo] = useState(null);
    return (

    <div className="admin_upload-item">
      <div style={{height:"490px"}}>
      {currentUploads.map((upload, index)=>{
        return(
          <div className="upload" key ={index}>
           <div className="upload_title upload_item">
                 <div className="num">{index}</div> 
                 <div className="name">
                 <img src={ getCreator(upload.creator)?.avatar || ""}></img>
                  { getCreator(upload.creator)?.name}
                  <span className={ getCreator(upload.creator)?.isVip ?"vip":"normal"}> 
                    { getCreator(upload.creator)?.isVip ?"Vip":"Thường"}
                  </span>
                 </div>
                 <div className="date">{upload.createdAt}</div>
                 <div className="song"> {upload.address}</div>  
                 <div className="status nonaccept ">{upload.isAccept?"Đã duyệt":"Chưa duyệt"}</div>
                 <div className="action">
                   <button className="accept-btn" onClick={()=>handleClickAccept(upload._id)}>Duyệt</button>
                   
                   <button className="delete-btn"onClick={()=>handleDelete(upload)}>Hủy</button>
                 </div>
              
             </div> 
             <div className="upload_detail"  >
                 <UploadSongItem song = {upload} setShowModal={setShowModal} setCopyrightInfo={setCopyrightInfo} />
             </div>
             {showModal && (
                  <DetailCheck
                      showModal={showModal}
                      setShowModal={setShowModal}
                      copyrightInfo={copyrightInfo}
                  />
              )}
             
         </div>
        )  
       })} 
      </div>  
      <Pagination 
                totalPage={totalPage * 10} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
            />
    </div> 
     );
}

export default Upload;
