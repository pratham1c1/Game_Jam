import React, { useState } from "react";
import styles from "./SideNav.module.css";

function SideNav(props) {
    const [isExpanded, setIsExpanded] = useState(false); // Manage sidebar expand/collapse
    const [selectedFilters, setSelectedFilters] = useState({}); // Track selected filter values
    const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
    const setToggleSideNavbar = props.setToggleSideNavbar;
    // Toggle sidebar expansion
    const toggleSideNav = () => {
        setIsExpanded(!isExpanded);
        setToggleSideNavbar((prev)=>!prev);
    }

    // Handle checkbox selection
    const handleCheckboxChange = (category, value) => {
        setSelectedFilters((prevFilters) => {
            const updatedCategory = prevFilters[category] || [];
            if (updatedCategory.includes(value)) {
                // Remove the value if already selected
                return {
                    ...prevFilters,
                    [category]: updatedCategory.filter((item) => item !== value),
                };
            } else {
                // Add the value if not already selected
                return {
                    ...prevFilters,
                    [category]: [...updatedCategory, value],
                };
            }
        });
    };

    // Handle single filter submission when double-clicking on dropdown category title
    const handleSingleFilterSubmit = (category) => {
        console.log("Single Filter submitted: ", { [category]: selectedFilters[category] || [] });
        // Add single filter submission logic here
    };

    // Toggle dropdown open/close while retaining selected checkboxes
    const toggleDropdown = (category) => {
        setOpenDropdown(openDropdown === category ? null : category);
    };

    // Handle "Go" button submission
    const handleSubmit = () => {
        console.log("Filters submitted: ", selectedFilters);
        // Add submission logic here
    };

    // Handle "Clear All Filters" icon
    const handleClearAll = () => {
        setSelectedFilters({}); // Reset all selected filters
        console.log("All filters cleared.");
    };

    const dropdownData = {
        Genre: ["Action", "Adventure", "Strategy", "Puzzle", "Other"],
        Platform: ["Windows", "macOS", "Linux", "Android", "Other"],
        Date: ["Last 7 Days", "Last 30 Days", "Last 6 Months", "Last Year", "Other"],
        Price: ["Free", "Under $5", "Under $10", "Premium", "Other"],
    };

    return (
        <div
            className={`${styles.sideNav} ${
                isExpanded ? styles.expanded : styles.collapsed
            }`}
        >
            <div className={styles.header}>
                <h3>{isExpanded ? "Filters" : ""}</h3>
                <button className={styles.hamburger} onClick={toggleSideNav}>
                    <i className="fa fa-bars"></i>
                </button>
                {isExpanded && (
                    <>
                        <button className={styles.goButton} onClick={handleSubmit}>
                            Go
                        </button>
                        <i
                            className={`fa fa-trash ${styles.clearIcon}`}
                            onClick={handleClearAll}
                            title="Clear all filters"
                        ></i>
                    </>
                )}
            </div>
            {isExpanded &&
                Object.keys(dropdownData).map((category) => (
                    <div key={category} className={styles.dropdown}>
                        {/* Dropdown title */}
                        <button
                            className={styles.dropdownButton}
                            onClick={() => toggleDropdown(category)}
                            onDoubleClick={() => handleSingleFilterSubmit(category)}
                        >
                            {category} <i className="fa fa-caret-down"></i>
                        </button>
                        {/* Dropdown values */}
                        {openDropdown === category && (
                            <div className={styles.dropdownValues}>
                                {dropdownData[category].map((value, index) => (
                                    <label key={index} className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            value={value}
                                            checked={selectedFilters[category]?.includes(value) || false}
                                            onChange={() => handleCheckboxChange(category, value)}
                                        />
                                        {value}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );
}

export default SideNav;
