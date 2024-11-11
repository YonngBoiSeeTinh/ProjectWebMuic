import React from "react";
import './home.css';
import PlaylistItem from './TopicItem';

function Toppic({ arrTopic }) {
    return (
        <div className="topic">  
            {arrTopic.map((topic, index) => (
                <div key={index}>
                    <h2 id="topic-name">{topic.name.toUpperCase()}</h2>
                    <PlaylistItem topicValue={topic.value}  /> 
                </div>
            ))}     
        </div>
    );
}

export default Toppic;
