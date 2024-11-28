import axios from "axios";
import { useEffect, useState } from "react"

function GameDetails(props){
    const[gameName, setGameName] = useState(props.gameName);


    useEffect( () => {

        const fetchGames = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/api/games/getGameDetailsByName/${gameName}`)
                const gamesWithImageURL = response.data.map((game) => ({
                    ...game,
                    gameImageUrl: `data:image/png;base64,${game.gameImage.data}` // Decode base64 image
                }));
    
                setGames(gamesWithImageURL);
            }catch(e){
                console.error("Error fetching games : " , e);
                alert("Failed to load games.");
            }
        }

        fetchGames();

    },[])


    return(
        <>
            <div>
                <h3>{gameName}</h3>
            </div>
        </>
    )
}