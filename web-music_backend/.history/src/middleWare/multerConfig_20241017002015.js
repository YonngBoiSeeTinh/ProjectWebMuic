const multer = require('multer');
const bucket = require('./firebase'); // Import bucket từ firebase.js
const { v4: uuidv4 } = require('uuid'); // Để tạo tên file duy nhất

const storage = multer.memoryStorage(); // Sử dụng memoryStorage để lưu file trong RAM

const upload = multer({ storage: storage });

module.exports = upload;
