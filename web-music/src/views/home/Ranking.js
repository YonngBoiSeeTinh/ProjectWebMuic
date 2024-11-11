import React, { useState } from "react";
import './home.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import RankingItem from './rankingItem'
const Ranking = ()=>{
   
   
    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/song/get?sort=plays&sort=desc`);  
            return res.data.data; 
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
  
    const query = useQuery({ queryKey: ['song'], queryFn: fetchApi });
    const queryData = query.data || [];
    const arrSong = queryData.filter((item)=>item.isAccept)

    const [country, setCountry] = useState("Việt Nam")
    const [activeIndex, setActiveIndex] = useState(0);
    const handleClick =(index, country)=>{
        setActiveIndex(index)
        setCountry(country);
    }
  return (
        <div className="ranking">
            <p className="rank-title">BXH BÀI HÁT</p>
            <div className="rank-nav">
                <div
                    className={`rank-nav-item item-1 ${activeIndex === 0 ? 'active' : ''}`}
                    onClick={() => handleClick(0,"Việt Nam")}
                >
                    Việt Nam
                </div>
                <div
                    className={`rank-nav-item  ${activeIndex === 1 ? 'active' : ''}`}
                    onClick={() => handleClick(1,"Âu Mỹ")}
                >
                    Âu Mỹ
                </div>
                <div
                    className={`rank-nav-item item-2 ${activeIndex === 2 ? 'active' : ''}`}
                    onClick={() => handleClick(2,"Hàn Quốc")}
                >
                    Hàn Quốc
                </div>
            </div>
            <div className="ranking-list">
               <RankingItem arrSong={arrSong} country={country}/>
            </div>
        </div>
    );
    
}

export default Ranking;
