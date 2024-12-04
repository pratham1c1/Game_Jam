import axios from "axios";
import { useEffect, useState } from "react"
import './GameDetails.css'

function GameDetails(props){
    const [gameCoverImage, setGameCoverImage] = useState(null);
    const [gameFirstSs, setGameFirstSs] = useState(null);
    const [gameSecondSs, setGameSecondSs] = useState(null);
    const[gameName, setGameName] = useState("1st Game"); // props.gameName
    

    const fetchGames = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/games/getGameDetailsByName/${gameName}`);
            console.log("Response : " ,response);
            if (!response.data) {
                console.error("No games data found.");
                return;
            }
    
            // Map and gameCoverImage
            const gamesWithImageURL = response.data.gameCoverImage && response.data.gameCoverImage.data
                    ? `data:image/png;base64,${response.data.gameCoverImage.data}` // Use the base64 image if available
                    : `/no_image.png` // Fallback to the public 'no_image.png'
            ;
            setGameCoverImage(gamesWithImageURL); // Set processed data to state
            //Set gameFirstSs
            setGameFirstSs(response.data.gameFirstSs && response.data.gameFirstSs.data
                ? `data:image/png;base64,${response.data.gameFirstSs.data}` // Use the base64 image if available
                    : `/no_image.png` // Fallback to the public 'no_image.png' 
            )
            // Set gameSecondSs
            setGameFirstSs(response.data.gameSecondSs && response.data.gameSecondSs.data
                ? `data:image/png;base64,${response.data.gameSecondSs.data}` // Use the base64 image if available
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
                    <div className="GameDetails"></div>
                </div>
                <div className="GameComments"></div>
            </div>
        </>
    )
}


export default GameDetails;