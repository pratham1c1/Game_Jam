import { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import styles from './BrowseGames.module.css'; // Import the CSS module
import axios from "axios";

import GameCards from "../../components/GameTemplate/GameCards";
import SideNav from "../../components/BrowseSideNav/SideNav";
import CommonHeader from "../../components/PageHeader/CommonHeader";

function BrowseGames(props) {
    const [games, setGames] = useState([]);
    const location = useLocation();
    const loggedInUserName = props.loggedInUserName || "PC";
    const userName = location?.state?.userName || "PC";
    const [gameName, setGameName] = useState(null);
    const [gameNameRedirFlag, setGameNameRedirFlag] = useState(false);
    const [authorNameRedirFlag, setAuthorNameRedirFlag] = useState(false);
    const navigate = useNavigate();
    const [toggleSideNavbar, setToggleSideNavbar] =  useState(false);


    const handleRedirect = () => {
        if (gameNameRedirFlag) {
            console.log("Redirecting to GamePage ...");
            navigate("/GamePage", {
                state: { gameName: `${gameNameRedirFlag}` , userName : `${userName}` , loggedInUserName:`${loggedInUserName}`}
            });
        }
        if(authorNameRedirFlag){
            console.log("Redirecting to Author Dashboard ...");
            navigate("/DashboardPage" ,{
                state:{userName:`${authorNameRedirFlag}`, loggedInUserName:`${loggedInUserName}`}
            });
        }
    };


    const fetchGames = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/games/getAllGames`);

            if (!response.data) {
                console.error("No games data found.");
                setGames([]); // Set an empty array if no data is returned
                return;
            }

            console.log("The response : ", response);

            // Map and process the data
            const gamesWithImageURL = response.data.map((game) => ({
                ...game,
                gameCoverImageUrl: game.gameCoverImage && game.gameCoverImage.data
                    ? `data:image/png;base64,${game.gameCoverImage.data}` // Use the base64 image if available
                    : `/no_image.png` // Fallback to the public 'no_image.png'
            }));

            setGames(gamesWithImageURL); // Set processed data to state
        } catch (error) {
            console.error("Error fetching games:", error);
            // alert("Failed to load games.");
        }
    };

    useEffect(() => {
        console.log("Fetching games to browse...");
        fetchGames();
    }, []);

    useEffect(() => {
        handleRedirect();
    }, [gameNameRedirFlag,authorNameRedirFlag]);

    useEffect(()=>{
        console.log("Sidbar toggle : " , toggleSideNavbar);
    },[toggleSideNavbar]);


    return (
        <>
            <CommonHeader/>
            <div className={styles.MainDiv}>
                <div className={styles.sideNavbar}>
                    <SideNav setToggleSideNavbar={setToggleSideNavbar}/>
                </div>
                <div className={styles.mainGames}>
                    <div className={styles.SearchSortFields}>
                        <div className={styles.SortFields}>
                            <h3>Sort by</h3>
                            <button>Top Rated</button>
                            <button>Top Seller</button>
                            <button>Most Popular</button>
                            <button>Most Recent</button>
                        </div>
                        <div className={styles.SearchField}>
                            <form action="/action_page.php">
                                <input type="text" placeholder="Search.." name="search" />
                                    <button type="submit"><i className="fa fa-search"></i></button>
                            </form>
                            {/* <button onClick={displayForm}>Add</button> */}
                        </div>
                    </div>
                    <div id="mainPageId" className={toggleSideNavbar?styles.Games:styles.GamesCollapsed}>
                        {games.length > 0 ? (
                            games.map((game) => (
                                <GameCards
                                    key={game.gameId}
                                    gameImage={game.gameCoverImageUrl}
                                    gameNameValue={game.gameName}
                                    gameAuthorName={game.userName}
                                    setGameNameRedirFlag={setGameNameRedirFlag}
                                    setAuthorNameRedirFlag={setAuthorNameRedirFlag}
                                    DashboardFlag={false}
                                    cancleFlag={false}
                                />
                            ))
                        ) : (
                            <p>No games available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BrowseGames;
