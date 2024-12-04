import axios from "axios";
import { useEffect, useState } from "react"
import './GameDetails.css'

function GameDetails(props){
    const [gameDetails, setGameDetails] = useState(null);
    const [gameCoverImage, setGameCoverImage] = useState(null);
    const [gameFirstSs, setGameFirstSs] = useState(null);
    const [gameSecondSs, setGameSecondSs] = useState(null);
    const[gameName, setGameName] = useState("2nd Game"); // props.gameName
    

    const fetchGames = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/games/getGameDetailsByName/${gameName}`);
            console.log("Response : " ,response);
            if (!response.data) {
                console.error("No games data found.");
                return;
            }
            setGameDetails(response.data);
    
            // Map and gameCoverImage
            const gamesWithImageURL = response.data.gameCoverImage && response.data.gameCoverImage.data
                    ? `data:image/png;base64,${response.data.gameCoverImage.data}` // Use the base64 image if available
                    : `/no_image.png` // Fallback to the public 'no_image.png'
            ;
            setGameCoverImage(gamesWithImageURL); // Set processed data to state
            //Set gameFirstSs
            setGameFirstSs(response.data.gameFirstScreenshot && response.data.gameFirstScreenshot.data
                ? `data:image/png;base64,${response.data.gameFirstScreenshot.data}` // Use the base64 image if available
                    : `/no_image.png` // Fallback to the public 'no_image.png' 
            )
            // Set gameSecondSs
            setGameSecondSs(response.data.gameSecondScreenshot && response.data.gameSecondScreenshot.data
                ? `data:image/png;base64,${response.data.gameSecondScreenshot.data}` // Use the base64 image if available
                    : `/no_image.png` // Fallback to the public 'no_image.png' 
            )
        } catch (error) {
            console.error("Error fetching games:", error);
            alert("Failed to load games.");
        }
    };


    useEffect( () => {
        fetchGames();

    },[])


    return(
        <>
            <div className="GamePage" style={{backgroundImage : `url(${gameCoverImage})`}}>
                <h1>{gameName}</h1>
                <div className="GameInfo">
                    <div className="GameImages">
                        <div className="gameCoverImage" style={{backgroundImage : `url(${gameCoverImage})`}}></div>
                        <div className="GameScreenshots">
                            <div className="FirstGameScreenshot" style={{backgroundImage : `url(${gameFirstSs})`}}></div>
                            <div className="SecondGameScreenshot" style={{backgroundImage : `url(${gameSecondSs})`}}></div>
                        </div>
                    </div>
                    <div className="GameDetails">
                        <h3>Game Name : {gameDetails.gameName}</h3>
                        <h3>Description : {gameDetails.gameDescription}</h3>
                        <h3>Install Instruction : {gameDetails.gameInstallInstruction}</h3>
                    </div>
                </div>
                <div className="GameComments"></div>
            </div>
        </>
    )
}


export default GameDetails;