const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    type: String
  },
  creator: {
    type: String,
    required: true
  },
  plays: {
    type: Number,
    default: 0
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song' // Tham chiếu đến collection 'Song'
  }]
}, { timestamps: true });


module.exports = mongoose.model('Playlist', PlaylistSchema);
