import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import RankingSong from "./RankingSong";
import RankingPLayList from './RanKingPlaylist'
import './Ranking.scss'
const RankingPage =()=>{

    const fetchApi = async()=>{
        try{ 
            const res = await axios.get(`http://localhost:3001/api/song/get?sort=plays&sort=desc`);  
            return res.data.data; 
        } catch(error){
             console.log(error);
             throw error
         }
    }
    const query = useQuery({queryKey : ['songs'], queryFn: fetchApi});
    const queryDataSong= query.data || [];
    const arrSong = queryDataSong.filter((item)=> item.isAccept) 
  
    const fetchApiPlaylist = async()=>{
        try{ 
            const res = await axios.get(`http://localhost:3001/api/playlist/get`);  
            return res.data.data; 
        } catch(error){
             console.log(error);
             throw error
         }
     }
     const queryPlaylist = useQuery({queryKey : ['playlists'], queryFn: fetchApiPlaylist});
     const arrPlaylist = queryPlaylist.data || [];
     
    return(
        <div className="ranking_page">
             <div className="song_list">
                <h3>BẢNG XẾP HẠNG BÀI HÁT ĐƯỢC NGHE NHIỀU NHẤT</h3>
                <RankingSong arrSong={arrSong}/>     
             </div>
             
             <div className="playlist_list" >
                <h3>PLAYLISTS HOT</h3>
                {arrPlaylist.map((playlist, index)=>(
                    <RankingPLayList playlist={playlist} key={index}/>
                ))}
             </div>
           
        </div>
    );
}

export default RankingPage;