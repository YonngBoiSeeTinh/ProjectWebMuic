const admin = require('firebase-admin');
const serviceAccount = require('./project-music-web-firebase-adminsdk-jgnhj-2cad58b0de.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'webmusic.appspot.com', // Đặt ID dự án của bạn
});

const bucket = admin.storage().bucket();

module.exports = bucket;
