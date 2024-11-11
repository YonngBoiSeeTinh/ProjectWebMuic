import React from "react";
import SongItem from './SongItems'
import Ranking from '../home/Ranking'
import './song.scss';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


const Songs =({filter})=> {

    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/song/get`);
          
            return res.data.data; 
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
  
    const query = useQuery({ queryKey: ['song'], queryFn: fetchApi });
    const queryData = query.data || [];
    let arrSong =[]
    if(filter){
         arrSong = queryData.filter((item)=>item.isAccept && (item.title.toLowerCase().includes(filter.toLowerCase())
                                                          || item.artist.toLowerCase().includes(filter.toLowerCase())              ))
    }
    else{
         arrSong = queryData.filter((item)=>item.isAccept)
    }
   
    console.log(arrSong);
    if (query.isLoading) {
        return <div>Loading...</div>; 
    }

    if (query.isError) {
        return <div>Error fetching data: {query.error.message}</div>; 
    }
  
        return (
            <div className="songs-container">
            <div className="song-list">
            <h2>BÀI HÁT HOT NHẤT</h2>
            {arrSong.map((song, index) => (
                <SongItem song={song} key={index} />
            ))}
              
            </div>
            <Ranking/>      
        </div>     
        );
    
}

export default Songs;
