const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu tệp tải lên
const storage = multer.diskStorage({
   
    destination: (req, file, cb) => {
        const audioPath = path.resolve('./public/audio/');
       return cb(null, audioPath); // Thư mục lưu trữ tệp tải lên
    },
    filename: (req, file, cb) => {
       return cb(null, `${Date.now()}-${file.originalname}`); // Tạo tên tệp duy nhất
    },
});

// Khởi tạo multer với cấu hình trên
const upload = multer({
    storage: storage,
    limits: { fileSize: 90 * 1024 * 1024 }, 
});

module.exports = upload;
