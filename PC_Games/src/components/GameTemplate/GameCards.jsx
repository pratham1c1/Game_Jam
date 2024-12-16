import axios from 'axios';
import React, { useEffect } from 'react';
import styles from './GameCards.module.css'; // Import the CSS module

function GameCards(props) {
    const title = props.title;
    const description = props.description;
    const title_color = props.title_color;
    const value_color = props.value_color;
    const setGameDeleteFlag = props.setGameDeleteFlag;
    const setRedirFlag = props.setRedirFlag;
    const cancleButtonFlag = props.cancleFlag;
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
            successPopup.className = styles.successfulPopup; // Use styles from the module
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

    const redirectPage = (event) => {
        setRedirFlag(event.target.textContent);
    }

    useEffect(() => {
        console.log("This is GameCards : ", props.setGameDeleteFlag);
    });


    return (
        <div className={styles.card}>
            <div className={styles.card_title} style={{ backgroundColor: title_color }}>
                <button style={{display : cancleButtonFlag?"block":"none"}} id="deleteButton" onClick={() => deleteGame(description)} className={styles.card_cancel_button}>X</button>
                <p>{title}</p>
            </div>

            <div className={styles.card_value} style={{ backgroundColor: value_color }}>
                <p onClick={(e) => redirectPage(e)}>{description}</p>
            </div>
        </div>
    );
}

export default GameCards;