import { useEffect, useState, useRef } from "react";
import GameCards from '../GameTemplate/GameCards';
import './UserGames.css';
import axios from "axios"
import PopupForm from '../PopupForm/PopupForm';

function UserGames() {
    const [games, setGames] = useState([]);
    const [userName, setUserName] = useState("PC");
    const [isPopupVisible , setPopupVisible] = useState(0);
    const popupRef = useRef(null);
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
        if (isPopupVisible) {
            resetFormData(); // Clear the form when it's being closed
        }
        isPopupVisible === 0 ? setPopupVisible(1) : setPopupVisible(0);

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
        console.log("Fetching games ...with isPopupVisible : " , isPopupVisible);
        fetchGames();
        if (isPopupVisible !== 0) {
            document.getElementById("mainPageId").style.webkitFilter = "blur(4px)";
            document.body.style.overflowY = 'hidden';
            document.getElementById("pagePopuId").style.animation = "popupAnimationOpen 0.5s linear";
            document.getElementById("pagePopuId").style.animationFillMode = 'forwards';
      
            // Add event listener to detect clicks outside the popup
            const handleClickOutside = (event) => {
              console.log("popup current : " , popupRef.current , " & contains : " , event.target);
              if (popupRef.current && !popupRef.current.contains(event.target)) {
                  document.getElementById("pagePopuId").style.animation = "popupAnimationClose 0.5s linear";
                  document.getElementById("mainPageId").style.webkitFilter = "blur(0px)";
                  document.body.style.overflowY = 'scroll';
                  setPopupVisible(0);
              }
            };
      
            document.addEventListener('mousedown', handleClickOutside);
            
            // Clean up the event listener on component unmount or when isPopupVisible changes
            return () => {
              document.removeEventListener('mousedown', handleClickOutside);
            };
          } else {
            document.getElementById("mainPageId").style.webkitFilter = "";
            document.body.style.overflowY = 'auto';
          }
    }, [isPopupVisible,gameDeleteFlag]);

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
            isPopupVisible === 0 ? setPopupVisible(1) : setPopupVisible(0);
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
                <div id='mainPageId' className="Games">
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
                <div className="UserForm" style={{ display: isPopupVisible ? 'block' : 'none' }}>
                    <div id="pagePopuId" ref={popupRef} className="pagePopupForm"><PopupForm setpopupDiv = {setPopupVisible} formData={formData} setFormData={setFormData} resetFormData={resetFormData} handleChange={handleChange} handleSubmit={handleSubmit} handleFileChange={handleFileChange}/></div>
                </div>

            </div>
        </>
    );
}

export default UserGames;