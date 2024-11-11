import React,{useState} from "react";

import { resetUser, updateUser } from "../../../Redux/sliders/userSlide"; 
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


function History (){   
 
    return(
       <div className="playlist">
           <h2>Lịch sử nghe nhạc</h2>
          
       </div>
    )

}

export default History;