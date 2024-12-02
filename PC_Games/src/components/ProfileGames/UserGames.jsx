import { useEffect, useState } from 'react';
import GameCards from '../GameTemplate/GameCards';
import './UserGames.css';
import axios from "axios"

function UserGames() {
    const [games, setGames] = useState([]);
    const [displayVar, setDisplayVar] = useState(false);
    const [userName, setUserName] = useState("PC");
    const [formData, setFormData] = useState({
        gameName: "",
        gameVideoLink: "",
        gameImage:null,
        gameFirstSs:null,
        gameSecondSs:null,
        gameFile:null
    });
    const resetFormData = () => {
        setFormData({
            gameName: "",
            gameVideoLink: "",
            gameImage: null,
            gameFirstSs: null,
            gameSecondSs: null,
            gameFile: null,
        });
    };
    const[gameDeleteFlag,setGameDeleteFlag] = useState(false);

    const displayForm = () => {
        if (displayVar) {
            resetFormData(); // Clear the form when it's being closed
        } else {
            const formContainer = document.querySelector('.UserForm');
            if (formContainer) {
                formContainer.scrollTop = 0; // Reset the container's scroll position
            }
        }
        setDisplayVar(!displayVar); // Toggle the form's visibility
    };

    const fetchGames = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/userGames/getAllGames/${userName}`);
            
            if (!response.data) {
                console.error("No games data found.");
                setGames([]); // Set an empty array if no data is returned
                return;
            }
    
            // Map and process the data
            const gamesWithImageURL = response.data.map((game) => ({
                ...game,
                gameImageUrl: game.gameImage && game.gameImage.data
                    ? `data:image/png;base64,${game.gameImage.data}` // Use the base64 image if available
                    : `/no_image.png` // Fallback to the public 'no_image.png'
            }));
    
            setGames(gamesWithImageURL); // Set processed data to state
        } catch (error) {
            console.error("Error fetching games:", error);
            alert("Failed to load games.");
        }
    };
    

    useEffect(() => {
        console.log("Fetching games ...");
        fetchGames();
    }, [gameDeleteFlag]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0]; // Get the uploaded file
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: file, // Add the file to the form data
        }));
    };

    // Add Games  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

    // gameFirstSs , gameSecondSs
    data.append("gameName", formData.gameName);
    data.append("userName", userName); // Add the username to the request
    data.append("gameVideoLink", formData.gameVideoLink);

    if (formData.gameImage) data.append("gameImage", formData.gameImage);
    if (formData.gameFirstScreenshot) data.append("gameFirstSs", formData.gameFirstSs); // Renamed
    if (formData.gameSecondScreenshot) data.append("gameSecondSs", formData.gameSecondSs); // Renamed
    if (formData.gameFile) data.append("gameFile", formData.gameFile);
        
        // Debugging: Log all key-value pairs in FormData
        for (let [key, value] of data.entries()) {
            console.log(`${key}:`, value);
        }


        try {
            const response = await axios.post("http://localhost:8080/api/games/addGame", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Game added successfully:", response.data);
            alert("Game added successfully!");
            fetchGames();
            resetFormData(); //Resetting the game-form fields
        }catch(e){
            console.error("Error Uploading data !" , e);
            alert("Upload Failed..");
        }
    };

    

    return (
        <>
            <div className="MainDiv">
                <div className="UserFields">
                    <div className="Username">
                        <h3>Prathamesh</h3>
                    </div>
                    <div className="ActionButtons">
                        <button onClick={displayForm}>Add</button>
                    </div>
                </div>
                <div className="Games">
                    {games.length > 0 ? (
                        games.map((game) => (
                            <GameCards
                                key={game.gameId}
                                title={<img src={game.gameImageUrl} alt={game.gameName} style={{ width: '100%', height: '100%' }} />}
                                description={game.gameName}
                                setGameDeleteFlag={setGameDeleteFlag}
                            />
                        ))
                    ) : (
                        <p>No games available.</p>
                    )}
                </div>
                <div className="UserForm" style={{ display: displayVar ? 'block' : 'none' }}>
                    <form onSubmit={handleSubmit} className="game-form">
                        {/* Game Name */}
                        <label htmlFor="gameName">Game Name:</label>
                        <input
                            type="text"
                            id="gameName"
                            name="gameName"
                            value={formData.gameName}
                            onChange={handleChange}
                            required
                        />

                        {/* Game Video Link */}
                        <label htmlFor="gameVideoLink">Game Video Link:</label>
                        <input
                            type="text"
                            id="gameVideoLink"
                            name="gameVideoLink"
                            value={formData.gameVideoLink}
                            onChange={handleChange}
                        />

                        {/* Game Image */}
                        <label htmlFor="gameImage">Game Image:</label>
                        <input
                            type="file"
                            id="gameImage"
                            name="gameImage"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'gameImage')}
                        />

                        {/* Game First Screenshot */}
                        <label htmlFor="gameFirstSs">Game First Screenshot:</label>
                        <input
                            type="file"
                            id="gameFirstSs"
                            name="gameFirstSs"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'gameFirstSs')}
                        />

                        {/* Game Second Screenshot */}
                        <label htmlFor="gameSecondSs">Game Second Screenshot:</label>
                        <input
                            type="file"
                            id="gameSecondSs"
                            name="gameSecondSs"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'gameSecondSs')}
                        />

                        {/* Game File */}
                        <label htmlFor="gameFile">Game File (ZIP):</label>
                        <input
                            type="file"
                            id="gameFile"
                            name="gameFile"
                            accept=".zip"
                            onChange={(e) => handleFileChange(e, 'gameFile')}
                        />

                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>

            </div>
        </>
    );
}

export default UserGames;