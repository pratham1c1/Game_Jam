import axios from "axios";
import React, { useState, useRef } from "react";
import styles from "./GameCards.module.css";

function GameCards(props) {
  const gameImage = props.gameImage || "/no_image.png"; // Default image
  const gameNameValue = props.gameNameValue || "New Game";
  const gameAuthorName = props.author || "PCgames";
  const gameGenre = props.gameGenre || ["Action" , "Horror" , "Adventure" , "Arcade"];
  const gamePlatform = props.gamePlatform || ["Windows","macOS","Linux"];
  const gameLikes = props.gameLikes || 100;
  const gameDownload = props.gameDownload || 450;
  const gameDescription = props.gameDescription || "This is description";
  const gameFirstSs = props.gameFirstSs || null;
  const gameSecondSs = props.gameSecondSs || null;
  const setGameDeleteFlag = props.setGameDeleteFlag;
  const cancleButtonFlag = props.cancleFlag;

  const [showPopup, setShowPopup] = useState(false);
  const popupTimeout = useRef(null);

  // Delete Game
  const deleteGame = async (gameName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${gameName}"?`
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/games/deleteGameDetailsByName/${gameName}`
      );
      alert("Game Deleted Successfully!");
      setGameDeleteFlag((prev) => !prev);
    } catch (error) {
      console.error("Error deleting game:", error);
      alert("Failed to delete game.");
    }
  };

  // Like and Dislike functionality
  const handleLike = () => {
    console.log("Liked the game:", gameNameValue);
  };

  const handleDislike = () => {
    console.log("Disliked the game:", gameNameValue);
  };

  const handleDownload = () => {
    console.log("Downloading the game ...");
  }

  const handleClickAuthorName = () => {
    console.log("Clicked on Author name ...");
  }

  const handleClickGameName = () => {
    console.log("Clicked on game name ...");
  }

  // Redirect Logic
  const handleImageClick = () => {
    console.log("Redirecting to game details page:", gameNameValue);
    // Add redirect logic here
  };

  // Handle Mouse Hover for Popup
  const handleMouseEnter = () => {
    popupTimeout.current = setTimeout(() => {
      console.log("Opening popup ...");
      setShowPopup(false);
    }, 3000); // Delay of 1 second
  };

  const handleMouseLeave = () => {
    console.log("Clearing the popup...");
    clearTimeout(popupTimeout.current);
    setShowPopup(false);
  };

  const renderPlatformIcons = () =>
    gamePlatform.map((platform, index) => (
      <span key={index} className={styles.icon}>
        {platform === "Windows" && <i className="fa fa-windows"></i>}
        {platform === "macOS" && <i className="fa fa-apple"></i>}
        {platform === "Linux" && <i className="fa fa-linux"></i>}
        {platform === "Android" && <i className="fa fa-android"></i>}
      </span>
    ));

  return (
    <>
    <div
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Image */}
      <div className={styles.card_Image} onClick={handleImageClick}>
        <button
          style={{ display: cancleButtonFlag ? "block" : "none" }}
          onClick={() => deleteGame(gameNameValue)}
          className={styles.card_cancel_button}
        >
          X
        </button>
        {/* <img src={gameImage} alt={gameNameValue} /> */}
        {gameImage}
      </div>

      {/* Card Content */}
      <div className={styles.card_value}>
        {/* Likes, Dislikes, and Downloads */}
        <div className={styles.gameNumbers}>
          <div className={styles.gameLikeDislike}><i className="fa fa-thumbs-up" onClick={handleLike}></i> {gameLikes}
          <i className="fa fa-thumbs-down" onClick={handleDislike}></i></div>
          <div className={styles.gameDownloadsView}><i className="fa fa-download" onClick={handleDownload}></i> {gameDownload}</div>
        </div>

        {/* Game Name */}
        <div className={styles.gameNameInfo}>
          <h4 onClick={handleClickGameName}>{gameNameValue}</h4>
          <h5 onClick={handleClickAuthorName}>{gameAuthorName}</h5>
        </div>
        {/* Platforms and Genre */}
        {gamePlatform.length > 0 && (
          <div className={styles.gameStrip}>{renderPlatformIcons()}</div>
        )}
        {gameGenre.length > 0 && (
          <div className={styles.gameStrip}>
            {gameGenre.map((genre, index) => (
              <span key={index} className={styles.genreTag}>
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
    {/* Popup for Details */}
    {showPopup && gameDescription && (
      <div className={styles.popup}>
        <h4>{gameNameValue}</h4>
        <p>{gameDescription}</p>
        {gameFirstSs && (
          <img src={gameFirstSs} alt="First Screenshot" className={styles.popupImage} />
        )}
        {gameSecondSs && (
          <img src={gameSecondSs} alt="Second Screenshot" className={styles.popupImage} />
        )}
      </div>
    )}
    </>
  );
}

export default GameCards;