import { useState } from 'react';
import GameCards from '../GameTemplate/GameCards';
import './UserGames.css';
import axios from "axios"

function UserGames() {
    const [displayVar, setDisplayVar] = useState(false);
    const [formData, setFormData] = useState({
        userId: "",
        name: "",
        email: "",
        noOfGame: ""
    });

    const displayForm = () => {
        setDisplayVar(!displayVar); // Toggle the form
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/addUser", formData);
            console.log("User added successfully:", response.data);
            alert("User added successfully!");
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Failed to add user.");
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
                {/* Uncomment the below section if you want to display GameCards */}
                <div className="Games">
                    <GameCards title="Game1pic" description="First Game" />
                    <GameCards title="Game2pic" description="Second Game" />
                    <GameCards title="Game3pic" description="Third Game" />
                    <GameCards title="Game4pic" description="Fourth Game" />
                </div>
                <div className="UserForm" style={{ display: displayVar ? 'block' : 'none' }}>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="userId">User ID:</label><br />
                        <input
                            type="number"
                            id="userId"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            required
                        /><br />
                        <label htmlFor="name">Name:</label><br />
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        /><br />
                        <label htmlFor="email">Email:</label><br />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        /><br />
                        <label htmlFor="noOfGame">Number of Games:</label><br />
                        <input
                            type="number"
                            id="noOfGame"
                            name="noOfGame"
                            value={formData.noOfGame}
                            onChange={handleChange}
                            required
                        /><br /><br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default UserGames;