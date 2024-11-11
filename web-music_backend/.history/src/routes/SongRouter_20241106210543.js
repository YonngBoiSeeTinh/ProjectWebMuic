const express = require("express");
const router= express.Router();
const SongController = require('../controllers/SongController');
const upload = require('../middleWare/multerConfig');

router.post('/create',upload.single('audioFile'), SongController.createSong);
router.post('/check',upload.single('audioFile'), SongController.checkSong);
router.put('/updateHasFile/:id',upload.single('audioFile'), SongController.updateSongHasFile);
router.put('/update/:id', SongController.updateSong);
router.get('/get', SongController.getAllSongs);
router.get('/getDetail/:id', SongController.getDetailSong);
router.delete('/delete/:id', SongController.deleteSong);
module.exports = router;