import axios from "axios";
import { useEffect, useState } from "react"
import './GameDetails.css'

function GameDetails(props){
    const [gameInfo, setGameInfo] = useState(null);
    const [gameCoverImage, setGameCoverImage] = useState(null);
    const [gameFirstSs, setGameFirstSs] = useState(null);
    const [gameSecondSs, setGameSecondSs] = useState(null);
    const [gameFile, setGameFile] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const[gameName, setGameName] = useState("2nd Game"); // props.gameName
    const [userName, setUserName] = useState(null);
    

    const fetchGames = async () => {
        console.log("In fetchGames ...");
        try {
            const response = await axios.get(`http://localhost:8080/api/games/getGameDetailsByName/${gameName}`);
            console.log("Response : " ,response.data);
            if (!response.data) {
                console.error("No games data found.");
                return;
            }

            setGameInfo(response.data);
            // setDownloadUrl(URL.createObjectURL(blob));
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

    const fetchGameUser = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/api/userGames/getGameUserDetails/${gameName}`);
            if(!response.data){
                console.error("No game user data found.");
                return; 
            }
            console.log("User API response : ", response);
            setUserName(response.data.userName);
        }catch (error) {
            console.error("Error fetching user:", error);
            alert("Failed to get user");
        }
    }

    const fetchGameFile = async (gameName) => {
        try {
            const fileResponse = await axios.get(
                `http://localhost:8080/api/games/getGameFileByGameName/${gameName}`,
                { responseType: "arraybuffer" } // Fetch as binary data
            );
    
            console.log("Response: ", fileResponse);
    
            if (!fileResponse.data) {
                console.error("No game file data found.");
                return;
            }
    
            // Create a Blob from the binary data
            const blob = new Blob([fileResponse.data], { type: "application/zip" });
    
            // Generate a temporary download link
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = `${gameName}.zip`; // File name for download
            document.body.appendChild(link); // Append the link to the body
            link.click(); // Simulate a click to download the file
            document.body.removeChild(link); // Remove the link after download
            URL.revokeObjectURL(downloadUrl); // Clean up the URL object
        } catch (error) {
            console.error("Error fetching game file:", error);
            alert("Failed to load game file.");
        }
    };
    


    useEffect( () => {
        console.log("This is GameDetails useEffect ...");
        fetchGames();
        fetchGameUser();
        console.log("gamedetails :" , gameInfo);
    },[])

    // Refresh again to set the gameInfo variable
    useEffect(() => {
        if (gameInfo) {
            console.log("Updated gameInfo:", gameInfo);
        }
    }, [gameInfo]);


    return(
        <>
            <div className="GamePage" style={{backgroundImage : `url(${gameCoverImage})`}}>
                <div className="GameName"><h1>{gameName}</h1></div>
                <div className="GameInfo">
                    <div className="GameImages">
                        <div className="gameCoverImage" style={{backgroundImage : `url(${gameCoverImage})`}}></div>
                        <div className="GameScreenshots">
                            <div className="FirstGameScreenshot" style={{backgroundImage : `url(${gameFirstSs})`}}></div>
                            <div className="SecondGameScreenshot" style={{backgroundImage : `url(${gameSecondSs})`}}></div>
                        </div>
                    </div>
                    <div className="GameDetailsInfo">
                        <h3 className="GameInfoH3">Game Name: {gameInfo?.gameName || "Loading..."}</h3>
                        <h3 className="GameInfoH3">Game Author: {userName || "Loading..."}</h3>
                        <div className="ScrollableTextArea">
                            <h3>Description:</h3>
                            <textarea
                                value={gameInfo?.gameDescription || "Loading..."}
                                readOnly
                            />
                        </div>
                        <div className="ScrollableTextArea">
                            <h3>Install Instruction:</h3>
                            <textarea
                                value={gameInfo?.gameInstallInstruction || "Loading..."}
                                readOnly
                            />
                        </div>
                        <div className="GameHeader">
                            <button onClick={() => fetchGameFile(`${gameInfo.gameName}`)}>Download</button>
                            <h3>{gameName}.zip</h3>
                        </div>
                    </div>

                </div>
                <div className="GameComments"></div>
            </div>
        </>
    )
}


export default GameDetails;