import React from "react";
import './Alter.scss';

const Alter = ({ type, message, onClose }) => {
    return (
        <div className={`alter ${type}`}>
           
                <div className="alter__message">
                    {message}
                </div>
                <button className="alter__button" onClick={onClose}> X </button>
            
        </div>
    );
};

export default Alter;
