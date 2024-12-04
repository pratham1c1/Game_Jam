import { useEffect, useLayoutEffect, useState } from "react";
import './PopupForm.css'

function PopupForm(props){
    const setpopupDiv = props.setpopupDiv;
    const formData = props.formData;
    const setFormData = props.setFormData;
    const resetFormData = props.resetFormData;
    const handleSubmit = props.handleSubmit;
    const handleChange = props.handleChange;
    const handleFileChange = props.handleFileChange;

    const closeDiv= () => {
        console.log("The close x button clicked !!!");
        document.getElementById("pagePopuId").style.animation = "popupAnimationClose 0.5s linear";
        document.getElementById("mainPageId").style.webkitFilter = "blur(0px)";
        document.body.style.overflowY = 'scroll';
        setpopupDiv(0);
    }

    return(
        <>
            <div >
                <div id="popupDivID" className='popupDiv'>
                    <span onClick={closeDiv} className='closeButton'>&times;</span>
                    {/* <form onSubmit={closeDiv} className='popupForm'> */}
                    <form onSubmit={handleSubmit} className='popupForm'>
                        {/* Game Name */}
                        <label className='formLabel'htmlFor="gameName">Game Name:</label>
                        <input
                            className='formInput'
                            type="text"
                            id="gameName"
                            name="gameName"
                            value={formData.gameName}
                            onChange={handleChange}
                            required
                        />

                        {/* Game Video Link */}
                        <label className='formLabel'htmlFor="gameVideoLink">Game Video Link:</label>
                        <input
                            className='formInput'
                            type="text"
                            id="gameVideoLink"
                            name="gameVideoLink"
                            value={formData.gameVideoLink}
                            onChange={handleChange}
                        />

                        {/* Game Image */}
                        <label className='formLabel'htmlFor="gameCoverImage">Game Cover Image:</label>
                        <input
                            className='formInput'
                            type="file"
                            id="gameCoverImage"
                            name="gameCoverImage"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'gameCoverImage')}
                        />

                        {/* Game First Screenshot */}
                        <label className='formLabel'htmlFor="gameFirstSs">Game First Screenshot:</label>
                        <input
                            className='formInput'
                            type="file"
                            id="gameFirstSs"
                            name="gameFirstSs"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'gameFirstSs')}
                        />

                        {/* Game Second Screenshot */}
                        <label className='formLabel'htmlFor="gameSecondSs">Game Second Screenshot:</label>
                        <input
                            className='formInput'
                            type="file"
                            id="gameSecondSs"
                            name="gameSecondSs"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'gameSecondSs')}
                        />

                        {/* Game File */}
                        <label className='formLabel'htmlFor="gameFile">Game File (ZIP):</label>
                        <input
                            className='formInput'
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
    )
}

export default PopupForm;