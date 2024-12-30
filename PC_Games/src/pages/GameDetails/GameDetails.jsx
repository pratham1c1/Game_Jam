import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './GameDetails.module.css'; // Import the CSS module
import CommonHeader from "../../components/PageHeader/CommonHeader";

function GameDetails(props) {
    const [gameInfo, setGameInfo] = useState(null);
    const [gameCoverImage, setGameCoverImage] = useState(null);
    const [gameFirstSs, setGameFirstSs] = useState(null);
    const [gameSecondSs, setGameSecondSs] = useState(null);
    const [gameFile, setGameFile] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const location = useLocation();
    const { gameName } = location?.state || {}; // props.gameName
    const loggedInUserName = location?.state?.loggedInUserName || "PC";
    const [userName, setUserName] = useState(null);
    const navigate = useNavigate();

    const fetchGames = async () => {
        console.log("In fetchGames ...");
        try {
            const response = await axios.get(`http://localhost:8080/api/games/getGameDetailsByName/${gameName}`);
            console.log("Response : ", response.data);
            if (!response.data) {
                console.error("No games data found.");
                return;
            }

            setGameInfo(response.data);
            // Map and set gameCoverImage
            const gamesWithImageURL = response.data.gameCoverImage && response.data.gameCoverImage.data
                ? `data:image/png;base64,${response.data.gameCoverImage.data}` // Use the base64 image if available
                : `/no_image.png`; // Fallback to the public 'no_image.png'
            setGameCoverImage(gamesWithImageURL);
            
            // Set other game images
            setGameFirstSs(response.data.gameFirstScreenshot && response.data.gameFirstScreenshot.data
                ? `data:image/png;base64,${response.data.gameFirstScreenshot.data}`
                : `/no_image.png`);

            setGameSecondSs(response.data.gameSecondScreenshot && response.data.gameSecondScreenshot.data
                ? `data:image/png;base64,${response.data.gameSecondScreenshot.data}`
                : `/no_image.png`);
            setUserName(response.data.userName);
        } catch (error) {
            console.error("Error fetching games:", error);
            alert("Failed to load games.");
        }
    };

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
        try{
            const gameDownloadCount = await axios.put(`http://localhost:8080/api/games/updateGameDownloadCount/${gameName}`);
            console.log(gameDownloadCount);
        }catch(e){
            console.log("Error updating gameDownloadCount", e);
        }
    };

    const handlClickonUser = (event) => {
        navigate("/DashboardPage", {
            state: { userName: userName }
        });
    };

    useEffect(() => {
        console.log("This is GameDetails useEffect ...");
        console.log("Testing gameName : ", location.state);
        fetchGames();
        console.log("gamedetails :", gameInfo);
    }, [gameName]);

    // Refresh again to set the gameInfo variable
    useEffect(() => {
        if (gameInfo) {
            console.log("Updated gameInfo:", gameInfo);
        }
    }, [gameInfo]);

    return (
        <>
            <CommonHeader/>
            <div className={styles.GamePage} style={{ backgroundImage: `url(${gameCoverImage})` }}>
                <div className={styles.GameName}><h1>{gameName}</h1></div>
                <div className={styles.GameInfo}>
                    <div className={styles.GameImages}>
                        <div className={styles.gameCoverImage} style={{ backgroundImage: `url(${gameCoverImage})` }}></div>
                        <div className={styles.GameScreenshots}>
                            <div className={styles.FirstGameScreenshot} ><img className={styles.ImageSS} src={gameFirstSs}></img></div>
                            <div className={styles.SecondGameScreenshot}><img className={styles.ImageSS} src={gameSecondSs}></img></div>
                        </div>
                    </div>
                    <div className={styles.GameDetailsInfo}>
                        <h3 className={styles.GameInfoH3}>Game Name: {gameInfo?.gameName || "Loading..."}</h3>
                        <h3 className={styles.GameInfoH3} onClick={handlClickonUser}>Game Author: {userName || "Loading..."}</h3>
                        <div className={styles.ScrollableTextArea}>
                            <h3>Description:</h3>
                            <textarea
                                value={gameInfo?.gameDescription || "The best game that you never played before"}
                                readOnly
                            />
                        </div>
                        <div className={styles.ScrollableTextArea}>
                            <h3>Install Instruction:</h3>
                            <textarea
                                value={gameInfo?.gameInstallInstruction || "Download the game."}
                                readOnly
                            />
                        </div>
                        <div className={styles.GameHeader} style={{ display: gameInfo?.gameFileId ? "flex" : "none" }}>
                            <button onClick={() => fetchGameFile(`${gameInfo.gameName}`)}>Download</button>
                            <h3>{gameName}.zip</h3>
                        </div>
                    </div>
                </div>
                <div className={styles.GameComments}></div>
            </div>
        </>
    );
}

export default GameDetails;
