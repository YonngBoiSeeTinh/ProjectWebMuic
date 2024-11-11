const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const audioPath = path.resolve('./public/audio/');

        // Kiểm tra và tạo thư mục nếu nó chưa tồn tại
        if (!fs.existsSync(audioPath)) {
            fs.mkdirSync(audioPath, { recursive: true });
        }

        return cb(null, audioPath);
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 90 * 1024 * 1024 },
});

module.exports = upload;
