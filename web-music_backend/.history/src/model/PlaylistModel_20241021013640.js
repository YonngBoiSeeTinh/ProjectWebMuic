const mongoose = require('mongoose');


const SongSchema = new mongoose.Schema({
  title: { type: String,required: true},
  artist: { type: String, required: true },
  playlist: {type: String, required: false},
  country: { type: String, required: false},
  type: { type: String, required: true},
  releaseDate: { type: Date, required: false},
  coverImage: {type: String  },
  audioFile: { type: String,  required: true },
  plays: {  type: Number, default: 0 },
  isVip:{  type:Boolean },
  creator: { type: String,  required: true},

}, { timestamps: true });
const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  coverImage: {
    type: String // URL hoặc đường dẫn ảnh bìa của playlist
  },

  creator: {
    type: String, // Tên người tạo playlist
    required: true
  },
  plays: {
    type: Number,
    default: 0
  },
  songs: { type: [SongSchema], required: false }
}, { timestamps: true });

module.exports = mongoose.model('Playlist', PlaylistSchema);
