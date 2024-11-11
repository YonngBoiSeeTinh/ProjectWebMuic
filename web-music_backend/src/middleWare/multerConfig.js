const multer = require('multer');


const storage = multer.memoryStorage(); // Sử dụng memoryStorage để lưu file trong RAM

const upload = multer({ storage: storage });

module.exports = upload;
