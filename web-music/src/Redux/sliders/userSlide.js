import { createSlice } from '@reduxjs/toolkit';

// Định nghĩa initialState
const initialState = {
    name: '',
    email: '',
    access_token: '',
    isAdmin: false,
    isVip: '',
    avatar: '',
    id: '',
    phone: '',
    sex: '',
    introduce: '',
    birthday: '',
    address: '', 
    songHistory: [],
    songFavorite: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                name, email, access_token, isAdmin, isVip, avatar, _id,
                sex, phone, introduce, address, birthday, songHistory, songFavorite
            } = action.payload;

            state.name = name;
            state.email = email;
            state.access_token = access_token;
            state.isAdmin = isAdmin;
            state.isVip = isVip;
            state.avatar = avatar;
            state.id = _id;
            state.sex = sex;
            state.phone = phone;
            state.introduce = introduce;
            state.address = address; 
            state.birthday = birthday;
            state.songHistory = songHistory;
            state.songFavorite = songFavorite;
        },
        resetUser: (state) => {
            state.name = "";
            state.email = "";
            state.access_token = "";
            state.isAdmin = false;
            state.isVip = "";
            state.avatar = "";
            state.id = "";
            state.sex = "";
            state.phone = "";
            state.introduce = "";
            state.address = ""; 
            state.birthday = "";
            state.songHistory = [];
            state.songFavorite = [];
        },
    },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
