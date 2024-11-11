
const SongService = require("../service/SongService");
const { v4: uuidv4 } = require('uuid');
const bucket = require('../service/Firebase');
const axios = require("axios");

const createSong = async (req, res) => {
    try {
        // Lấy thông tin từ body và file tải lên
        const { title, artist, country, coverImage, type,isVip,creator,isAccept } = req.body;
        const audioFileMid = req.file; // Tệp âm thanh được tải lên
        // Kiểm tra xem có file âm thanh được tải lên không
        if (!audioFileMid) {
          return res.status(400).json({
            status: 'FAILED',
            message: 'Audio file is required.',
          });
        }
        // Tạo tên file duy nhất cho tệp âm thanh
        const audioFileName = `songs/${uuidv4()}-${audioFileMid.originalname}`;
        const blob = bucket.file(audioFileName);
        const blobStream = blob.createWriteStream({
          resumable: false, // Không sử dụng resumable để upload nhanh hơn
          contentType: audioFileMid.mimetype, // Xác định loại file tải lên
        });
        // Xử lý lỗi trong quá trình upload file lên Firebase Storage
        blobStream.on('error', (error) => {
          return res.status(500).json({
            status: 'ERROR',
            message: 'Unable to upload file.',
            error: error.message,
          });
        });
        // Khi file upload hoàn tất
        blobStream.on('finish', async () => {
          const token = uuidv4(); // Tạo token duy nhất cho URL
          await blob.setMetadata({
            metadata: {
              firebaseStorageDownloadTokens: token, // Gán token vào metadata
            },
          });
          // Làm cho file công khai để có thể truy cập bằng URL
          await blob.makePublic();
          // Tạo URL công khai cho file đã upload
          const audioUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(audioFileName)}?alt=media&token=${token}`;
          // Gọi dịch vụ lưu thông tin bài hát vào cơ sở dữ liệu
          const response = await SongService.createSong({
            title,
            artist,
            country,
            coverImage,
            type,
            isVip,
            isAccept,
            creator,
            audioFile: audioUrl, // Lưu đường dẫn file âm thanh đã upload vào cơ sở dữ liệu
          });
    
          // Trả về phản hồi tùy thuộc vào trạng thái lưu bài hát
          return res.status(response.status === 'OK' ? 200 : 400).json(response);
        });
        // Kết thúc stream sau khi upload file lên Firebase Storage
        blobStream.end(audioFileMid.buffer);
      } catch (error) {
        // Xử lý lỗi tổng quát và trả về phản hồi lỗi
        return res.status(500).json({
          status: 'ERROR',
          message: 'Internal server error',
          err: error.message,
        });
      }
};

const updateSongHasFile = async (req, res) => {
  const { id } = req.params; 
  try {
    const song = await SongService.getDetailSong(id);
    if (!song) {
        return res.status(404).json({
            status: 'FAILED',
            message: 'Song not found.',
        });
    }
    // Tách phần tên file từ URL
    const audioFileUrl = song.data.audioFile; // URL của file âm thanh
    const audioFileNameDefault = decodeURIComponent(audioFileUrl.split('/o/')[1].split('?alt=media')[0]);
    // Xóa file nhạc từ Firebase Storage
    const file = bucket.file(audioFileNameDefault);
    await file.delete();
      // Lấy thông tin từ body và file tải lên
      const { title, artist, country, coverImage, type,isVip } = req.body;
      const audioFileMid = req.file; // Tệp âm thanh được tải lên
      // Kiểm tra xem có file âm thanh được tải lên không
      if (!audioFileMid) {
        return res.status(400).json({
          status: 'FAILED',
          message: 'Audio file is required.',
        });
      }
      // Tạo tên file duy nhất cho tệp âm thanh
      const audioFileName = `songs/${uuidv4()}-${audioFileMid.originalname}`;
      const blob = bucket.file(audioFileName);
      const blobStream = blob.createWriteStream({
        resumable: false, // Không sử dụng resumable để upload nhanh hơn
        contentType: audioFileMid.mimetype, // Xác định loại file tải lên
      });
      // Xử lý lỗi trong quá trình upload file lên Firebase Storage
      blobStream.on('error', (error) => {
        return res.status(500).json({
          status: 'ERROR',
          message: 'Unable to upload file.',
          error: error.message,
        });
      });
      // Khi file upload hoàn tất
      blobStream.on('finish', async () => {
        const token = uuidv4(); // Tạo token duy nhất cho URL
        await blob.setMetadata({
          metadata: {
            firebaseStorageDownloadTokens: token, // Gán token vào metadata
          },
        });
        // Làm cho file công khai để có thể truy cập bằng URL
        await blob.makePublic();
        // Tạo URL công khai cho file đã upload
        const audioUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(audioFileName)}?alt=media&token=${token}`;
        // Gọi dịch vụ lưu thông tin bài hát vào cơ sở dữ liệu
        const updateSong = {
          title,
          artist,
          country,
          coverImage,
          type,
          isVip,
          audioFile: audioUrl, // Lưu đường dẫn file âm thanh đã upload vào cơ sở dữ liệu
          }
        const response = await SongService.updateSong({ id,updateSong});
  
        // Trả về phản hồi tùy thuộc vào trạng thái lưu bài hát
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
      });
      // Kết thúc stream sau khi upload file lên Firebase Storage
      blobStream.end(audioFileMid.buffer);
    } catch (error) {
      // Xử lý lỗi tổng quát và trả về phản hồi lỗi
      return res.status(500).json({
        status: 'ERROR',
        message: 'Internal server error',
        err: error.message,
      });
    }
};

const updateSong = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await SongService.updateSong(id, req.body);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const getAllSongs = async (req, res) => {
   
    try {
        const {page,limit,sort,filter } = req.query
        const response = await SongService.getAllSongs(Number(limit)||8 , Number(page)||0,sort,filter);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred while retrieving Songs',
            err: error.message,
        });
    }
};
const getDetailSong = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ req.params
        const response = await SongService.getDetailSong(id); // Gọi service với id
        return res.status(200).json(response); // Trả về response thành công
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred while retrieving the song',
            err: error.message,
        });
    }
};

const deleteSong = async (req, res) => {
  const { id } = req.params; // Lấy ID bài hát từ params
  try {
      // Lấy thông tin bài hát từ cơ sở dữ liệu trước khi xóa
      const song = await SongService.getDetailSong(id);
      if (!song) {
          return res.status(404).json({
              status: 'FAILED',
              message: 'Song not found.',
          });
      }
      // Tách phần tên file từ URL
     
      const audioFileUrl = song.data.audioFile; // URL của file âm thanh
      
      const audioFileName = decodeURIComponent(audioFileUrl.split('/o/')[1].split('?alt=media')[0]);
      // Xóa file nhạc từ Firebase Storage
      const file = bucket.file(audioFileName);
      await file.delete();
      // Sau khi xóa file nhạc, xóa bài hát từ cơ sở dữ liệu
      const response = await SongService.deleteSong(id);
     
      return res.status(response.status === 'OK' ? 200 : 400).json(response);
  } catch (error) {
      return res.status(500).json({
          status: 'ERROR',
          message: 'Internal server error',
          err: error.message,
      });
  }
};

const checkSong = async (req, res) => {
  try {
    const { audioFileUrl } = req.body;  // Nhận URL file từ client
    console.log("Received audio file URL:", audioFileUrl);

    // Gửi yêu cầu tới Audd.io API với URL bài hát
    const response = await axios.post('https://api.audd.io/', {
      url: audioFileUrl,  // Gửi URL bài hát đến Audd.io
      api_token: 'f91f099802dac7d19852d722ba5965b2',  
    });

    // Trả kết quả cho client
    res.json(response.data);
  } catch (error) {
    console.error("Error in checking copyright:", error.message);
    if (error.response) {
      console.error("Response error:", error.response.data); // Log response
    }
    if (error.request) {
      console.error("Request error:", error.request); // Log request 
    }
    res.status(500).send("Error checking copyright");
  }
};



module.exports = {
    createSong,
    updateSong,
    getAllSongs,
    deleteSong,
    getDetailSong,
    updateSongHasFile,
    checkSong,
    
};
