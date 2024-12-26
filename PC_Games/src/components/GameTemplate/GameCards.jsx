import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import styles from "./GameCards.module.css";

function GameCards(props) {
  const gameImage = props.gameImage || "/no_image.png"; // Default image
  const gameNameValue = props.gameNameValue || "New Game";
  const gameAuthorName = props.gameAuthorName || "PC";
  const gameGenre = props.gameGenre || ["Action", "Horror", "Adventure"];
  const gamePlatform = props.gamePlatform || ["Windows", "macOS", "Linux"];
  const gameLikes = props.gameLikes || 100;
  const gameDownload = props.gameDownload || 450;
  const gameDescription = props.gameDescription || "This is description";
  const gameFirstSs = props.gameFirstSs || null;
  const gameSecondSs = props.gameSecondSs || null;
  const setGameDeleteFlag = props.setGameDeleteFlag;
  const cancleButtonFlag = props.cancleFlag;
  const setGameNameRedirFlag = props.setGameNameRedirFlag;
  const setAuthorNameRedirFlag = props.setAuthorNameRedirFlag;
  const [visibleGameToOthers, setVisibleGameToOthers] = useState(props.visibleGameToOthers ?? true);
  const [clickedDiv, setClickedDiv] = useState(null);


  const [showPopup, setShowPopup] = useState(false);
  const popupTimeout = useRef(null);

  // Delete Game
  const deleteGame = async (gameName) => {
    if (cancleButtonFlag) {
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

  const handleClickAuthorName = (e) => {
    console.log("Clicked on Author name ... : ", e.target.textContent);
    setAuthorNameRedirFlag(e.target.textContent);
  }

  const handleClickGameName = (e) => {
    console.log("Clicked on Game name ... : ");
    setGameNameRedirFlag(e.target.textContent);
  }

  // Redirect Logic
  const handleImageClick = (e) => {
    console.log("Redirecting to game details page:", gameNameValue);
    setGameNameRedirFlag(gameNameValue);
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
    // console.log("Clearing the popup...");
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

    const handleDivClick = (divType) => {
      setClickedDiv(divType);
      setVisibleGameToOthers(divType === "publish");
      if(divType === "dev"){
        document.getElementById(`publishSemiCircleId-${gameNameValue}`).style.width = "20px";
        document.getElementById(`devSemiCircleId-${gameNameValue}`).style.width = "38px";
      }
      else{
        document.getElementById(`publishSemiCircleId-${gameNameValue}`).style.width = "38px";
        document.getElementById(`devSemiCircleId-${gameNameValue}`).style.width = "20px";
      }
    };
  
    const getOpacity = (type) => {
      if (clickedDiv) {
        return type === clickedDiv ? 1 : 0.3;
      }
      return visibleGameToOthers === (type === "publish") ? 1 : 0.3;
    };
    const handleMouseEnterCombined = () => {
      handleMouseEnter();
      handleSemiCircleEnterEffect();
  };
  
  const handleMouseLeaveCombined = () => {
      handleMouseLeave();
      handleSemiCircleLeaveEffect();
  };

  const handleSemiCircleLeaveEffect = () => {
    document.getElementById(`publishSemiCircleId-${gameNameValue}`).style.width = "0px";
    document.getElementById(`devSemiCircleId-${gameNameValue}`).style.width = "0px";
  }

  const handleSemiCircleEnterEffect = () => {
    if(visibleGameToOthers){
        document.getElementById(`publishSemiCircleId-${gameNameValue}`).style.width = "38px";
        document.getElementById(`devSemiCircleId-${gameNameValue}`).style.width = "20px";
    }
    else{
        document.getElementById(`publishSemiCircleId-${gameNameValue}`).style.width = "20px";
        document.getElementById(`devSemiCircleId-${gameNameValue}`).style.width = "38px";
    }
  }


  
  return (
    <>
      <div
        className={styles.card}
        onMouseEnter={handleMouseEnterCombined}
        onMouseLeave={handleMouseLeaveCombined}
      >
        {/* Card Image */}
        <div className={styles.card_Image}>
          <i
            style={{ display: cancleButtonFlag ? "flex" : "none"}}
            className={`fa fa-trash ${styles.clearIcon}`}
            onClick={() => deleteGame(gameNameValue)}
            title="Clear all filters"
          ></i>
          <img onClick={(e) => {handleImageClick(e)}} src={gameImage} alt={gameNameValue} />
          {/* {gameImage} */}
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
            <div className={styles.gameStatusCircle}>
            <div
              id={`devSemiCircleId-${gameNameValue}`}
              className={`${styles.devSemiCircleOnCard} ${clickedDiv === "dev" ? "clicked" : ""}`}
              style={{
                opacity: getOpacity("dev"),
                left: "0px",
                width:"0px"
              }}
              onClick={() => handleDivClick("dev")}
            >
              D
            </div>
            <div
              id={`publishSemiCircleId-${gameNameValue}`}
              className={`${styles.publishSemiCircleOnCard} ${clickedDiv === "publish" ? "clicked" : ""
                }`}
              style={{
                opacity: getOpacity("publish"),
                left: "0px",
                width:"0px"
              }}
              onClick={() => handleDivClick("publish")}
            >
              P
            </div>
            </div>
            <div className={styles.gameNameValues}>
              <h4 onClick={(e) => { handleClickGameName(e) }}>{gameNameValue}</h4>
              <h5 onClick={(e) => { handleClickAuthorName(e) }}>{gameAuthorName}</h5>
            </div>
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