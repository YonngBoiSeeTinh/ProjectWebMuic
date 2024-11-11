
const SongService = require("../service/SongService");

const createSong = async (req, res) => {
    try {
        // Lấy dữ liệu từ body và tệp tải lên
        const { title, artist, playlist, coverImage, type } = req.body;
        const audioFileMid = req.file; // Tệp âm thanh được tải lên
        if (!audioFileMid) {
            return res.status(400).json({
                status: 'FAILED',
                message: 'Audio file is required.',
            });
        }
        //  xử lý audioFile để lưu vào cơ sở dữ liệu 
        const audioUrl = `/uploads/${audioFileMid.filename}`;   // Đường dẫn công khai cho tệp âm thanh
        const response = await SongService.createSong({
            title,
            artist,
            playlist,
            coverImage,
            type,
            audioFile: audioUrl, // Lưu đường dẫn tệp tải lên vào cơ sở dữ liệu
        });

        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const updateSong = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await SongService.updateSong(id, req.body);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const getAllSongs = async (req, res) => {
   
    try {
        const {page,limit,sort,filter } = req.query
        const response = await SongService.getAllSongs(Number(limit)||8 , Number(page)||0,sort,filter);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred while retrieving Songs',
            err: error.message,
        });
    }
};
const getDetailSong = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ req.params
        const response = await SongService.getDetailSong(id); // Gọi service với id
        return res.status(200).json(response); // Trả về response thành công
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred while retrieving the song',
            err: error.message,
        });
    }
};

const deleteSong = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await SongService.deleteSong(id);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

module.exports = {
    createSong,
    updateSong,
    getAllSongs,
    deleteSong,
    getDetailSong
};
