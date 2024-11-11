const admin = require('firebase-admin');
const serviceAccount = require('./path/to/your/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'your-project-id.appspot.com', // Đặt ID dự án của bạn
});

const bucket = admin.storage().bucket();

module.exports = bucket;
