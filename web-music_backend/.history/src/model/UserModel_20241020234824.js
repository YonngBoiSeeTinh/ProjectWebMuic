const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        isVip: { type: Boolean, default: false, required: true },
        phone: { type: Number, required: true },
        sex: { type: String, required: false },
        address: { type: String, required: false },
        avatar: { type: String, required: false },
        introduce : { type: String, required: false },
    },{
        timestamps: true
    }
);

const User = mongoose.model("User",userSchema);
module.exports = User;