import { useEffect, useLayoutEffect, useState ,userRef} from "react";
import './PopupForm.css'

function PopupForm(props){
    const setpopupDiv = props.setpopupDiv;
    const formData = props.formData;
    const setFormData = props.setFormData;
    const resetFormData = props.resetFormData;
    const handleSubmit = props.handleSubmit;
    const handleChange = props.handleChange;
    const handleFileChange = props.handleFileChange;
    const fileInputRefs = props.fileInputRefs;

    const closeDiv= () => {
        console.log("The close x button clicked !!!");
        document.getElementById("pagePopuId").style.animation = "popupAnimationClose 0.5s linear";
        document.getElementById("mainPageId").style.webkitFilter = "blur(0px)";
        document.body.style.overflowY = 'scroll';
        resetFormData();
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
                        {/* Game Description */}
                        <label htmlFor="gameDescription" className='formLabel'><b>Game Description</b></label>
                        <textarea className='formTextarea' placeholder="Enter Game Description" name="gameDescription" value={formData.gameDescription} onChange={handleChange}></textarea>
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
                        <label className='formLabel' htmlFor="gameCoverImage">Game Cover Image:</label>
                        <input
                            className='formInput'
                            type="file"
                            id="gameCoverImage"
                            name="gameCoverImage"
                            accept="image/*"
                            ref={(input) => (fileInputRefs.current['gameCoverImage'] = input)} // Ref for Game Image
                            onChange={(e) => handleFileChange(e, 'gameCoverImage')}
                        />

                        {/* Game First Screenshot */}
                        <label className='formLabel' htmlFor="gameFirstSs">Game First Screenshot:</label>
                        <input
                            className='formInput'
                            type="file"
                            id="gameFirstSs"
                            name="gameFirstSs"
                            accept="image/*"
                            ref={(input) => (fileInputRefs.current['gameFirstSs'] = input)} // Ref for First Screenshot
                            onChange={(e) => handleFileChange(e, 'gameFirstSs')}
                        />

                        {/* Game Second Screenshot */}
                        <label className='formLabel' htmlFor="gameSecondSs">Game Second Screenshot:</label>
                        <input
                            className='formInput'
                            type="file"
                            id="gameSecondSs"
                            name="gameSecondSs"
                            accept="image/*"
                            ref={(input) => (fileInputRefs.current['gameSecondSs'] = input)} // Ref for Second Screenshot
                            onChange={(e) => handleFileChange(e, 'gameSecondSs')}
                        />

                        {/* Game File */}
                        <label className='formLabel' htmlFor="gameFile">Game File (ZIP):</label>
                        <input
                            className='formInput'
                            type="file"
                            id="gameFile"
                            name="gameFile"
                            accept=".zip"
                            ref={(input) => (fileInputRefs.current['gameFile'] = input)} // Ref for Game File
                            onChange={(e) => handleFileChange(e, 'gameFile')}
                        />

                        {/* Game Install Instructions */}
                        <label htmlFor="gameInstallInstruc" className='formLabel'><b>Game Instructions</b></label>
                        <textarea className='formTextarea' placeholder="Enter Game Install Instructions" name="gameInstallInstruc" value={formData.gameInstallInstruc} onChange={handleChange}></textarea>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PopupForm;