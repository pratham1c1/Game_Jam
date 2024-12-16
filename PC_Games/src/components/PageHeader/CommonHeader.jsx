import siteLogo from '../../assets/Common_logo-removebg.png';
import styles from './CommonHeader.module.css';
import React, { useState, useEffect, useRef } from "react";

function CommonHeader() {
    const userName = "PC";
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null); // Reference to the dropdown element

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const closeDropdown = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropdownVisible(false); // Close the dropdown if clicked outside
        }
    };

    useEffect(() => {
        if (isDropdownVisible) {
            document.addEventListener("mousedown", closeDropdown);
        } else {
            document.removeEventListener("mousedown", closeDropdown);
        }
        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", closeDropdown);
        };
    }, [isDropdownVisible]);

    const myFunction = () => {
        const x = document.getElementById("myTopnav");
        if (x) {
            x.classList.toggle(styles.responsive);
            document.body.style.overflow = x.classList.contains(styles.responsive) ? "hidden" : "scroll";
        }
    };

    return (
        <>
            <header>
                <div className={styles.Navibar}>
                    <div>
                        <img className={styles.siteLogo} src={siteLogo} alt="Site Logo" />
                    </div>
                    <div className={styles.topnav} id="myTopnav">
                        <div className={styles.PagePaths}>
                            <a href="#Home">Browse</a>
                            <a href="#Features">Dashboard</a>
                            <a href="#Features">About</a>
                            <a className={styles.line}><div className={styles.lineDivider}></div></a>
                        </div>
                        <div className={styles.userProfileName} ref={dropdownRef}>
                            <h3 onClick={toggleDropdown}>{userName}</h3>
                            {isDropdownVisible && (
                                <div className={styles.dropdown}>
                                    <a href="#Profile">Profile</a>
                                    <a href="#Settings">Settings</a>
                                    <a href="#Logout">Log Out</a>
                                </div>
                            )}
                        </div>
                    </div>
                    <a href="#" className={styles.icon} onClick={myFunction}>
                        <i className="fa fa-bars"></i>
                    </a>
                </div>
            </header>
        </>
    );
}

export default CommonHeader;