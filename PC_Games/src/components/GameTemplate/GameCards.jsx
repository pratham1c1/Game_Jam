import axios from 'axios';
import './GameCards.css'
import React, { useEffect } from 'react'

function GameCards(props){
    const title = props.title;
    const description = props.description;
    const title_color = props.title_color;
    const value_color = props.value_color;
    const setGameDeleteFlag = props.setGameDeleteFlag;

    const deleteGame = async (gameName) => {
        // Show confirmation popup
        const confirmDelete = window.confirm(`Are you sure you want to delete the game "${gameName}"?`);
        if (!confirmDelete) {
            return; // Exit if user cancels
        }
    
        try {
            // Perform delete request
            const response = await axios.delete(`http://localhost:8080/api/games/deleteGameDetailsByName/${gameName}`);
    
            // Show success popup
            const successPopup = document.createElement("div");
            successPopup.textContent = "Game Deleted Successfully!";
            successPopup.className = "successfulPopup"
            document.body.appendChild(successPopup);
    
            // Remove popup after 1 second
            setTimeout(() => {
                document.body.removeChild(successPopup);
            }, 2000);
    
        } catch (error) {
            console.error(`Error deleting game "${gameName}":`, error);
            alert("Failed to delete game");
        }
    
        // Update state to trigger a refresh
        setGameDeleteFlag((prev) => !prev);
    };
    

    return(
        <div className='card'>
            <div className='card_title' style={{backgroundColor:title_color}}>
                <button onClick={() => deleteGame(description)} className='card_cancel_button'>X</button>
                <p>{title}</p>
            </div>

            <div className='card_value' style={{backgroundColor:value_color}}>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default GameCards