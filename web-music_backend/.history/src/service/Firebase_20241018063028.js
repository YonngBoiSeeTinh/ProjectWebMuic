const admin = require('firebase-admin');
const serviceAccount = require('./project-music-web-firebase-adminsdk-jgnhj-254c154f99.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://project-music-web.appspot.com/songs', 
});

const bucket = admin.storage().bucket();

module.exports = bucket;
