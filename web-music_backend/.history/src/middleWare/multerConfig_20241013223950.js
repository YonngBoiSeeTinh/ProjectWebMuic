const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu tệp tải lên
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục lưu trữ tệp tải lên
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Tạo tên tệp duy nhất
    },
});

// Khởi tạo multer với cấu hình trên
const upload = multer({
    storage: storage,
    limits: { fileSize: 60 * 1024 * 1024 }, // Giới hạn kích thước tệp là 60MB
});

module.exports = upload;
