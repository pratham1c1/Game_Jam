import './GameCards.css'
import React, { useEffect } from 'react'

function GameCards(props){
    const title = props.title;
    const description = props.description;
    const title_color = props.title_color;
    const value_color = props.value_color;
    
    return(
        <div className='card'>
            <div className='card_title' style={{backgroundColor:title_color}}>
                <p>{title}</p>
            </div>

            <div className='card_value' style={{backgroundColor:value_color}}>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default GameCards