const multer = require('multer');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

// Cấu hình Firebase Storage
const serviceAccount = require('./project-music-web-firebase-adminsdk-jgnhj-254c154f99.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://project-music-web.appspot.com/songs',
});
const bucket = admin.storage().bucket();

// Cấu hình multer sử dụng memoryStorage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn file tải lên (10MB)
});
