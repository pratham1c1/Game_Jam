import { useState } from "react";
import CommonHeader from "../../components/PageHeader/CommonHeader";
import styles from "./UserProfile.module.css";

function UserProfile() {
  const [profileImage, setProfileImage] = useState("/check_image.jpg");
  const [profileBackgroundImage, setProfileBackgroundImage] = useState(`url("no_image.png")`);
  const [fullName, setFullName] = useState("Prathamesh C");
  const [userName, setUserName] = useState("PC");
  const [userEmail, setUserEmail] = useState("kc#gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");
  const [address, setAddress] = useState("123, Game Street, NY");
  const [resetPassword, setResetPassword] = useState(false);
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    showPopup("Profile updated successfully!", "success");
   };

  const handlePasswordReset = () => {
    if (previousPassword === newPassword) {
      showPopup("New password cannot be the same as the previous password.", "error");
      return;
    }
    setResetPassword(true);
  };

  const handleSaveNewPassword = () => {
    if (newPassword !== confirmPassword) {
      showPopup("Passwords do not match!", "error");
      return;
    }
    showPopup("Password updated successfully!", "success");
    setResetPassword(false);
    setPreviousPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  const handleCancelPassword = () => {
    setResetPassword(false);
    setPreviousPassword("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleBgImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setProfileBackgroundImage(`url(${event.target.result})`);
      };

      reader.readAsDataURL(file); // Converts file to base64 data URL
    }
  };



  const showPopup = (message, type) => {
    const popup = document.createElement("div");
    popup.className = type === "success" ? styles.successPopup : styles.errorPopup;
    popup.textContent = message;
    document.body.appendChild(popup);
    setTimeout(() => {
      document.body.removeChild(popup);
    }, 3000);
  };

  return (
    <>
      <CommonHeader />
      <div className={styles.ProfileContainer}>
        <h3 className={styles.ProfileContainerHeaderText}>Update Your Profile</h3>
        <div className={styles.UserDetailsBox}>
          {/* Profile Picture */}
          <div id="ProfileImageContainer" className={styles.ProfileImageContainer} style={{ backgroundImage: profileBackgroundImage }}>
            <img
              src={profileImage || "/default-profile.png"}
              alt="Profile"
              className={styles.ProfileImage}
            />
            <div className={styles.ProFileImageInputs}>
              <label className={styles.ProfileImageLabel} htmlFor="profileImageLabel" style={{ padding: "5px 10px" }}>
                Select Profile Image
              </label>
              <input id="profileImageLabel" style={{ width:20 , visibility: "hidden" }} type={"file"} onChange={handleImageChange}/>

              <label className={styles.ProfileBgImageLabel} htmlFor="profileBgImageLabel" style={{ padding: "5px 10px" }}>
                Select Background Image
              </label>
              <input id="profileBgImageLabel" style={{ width:20 , visibility: "hidden" }} type={"file"} onChange={handleBgImageChange}/>
            </div> 
          </div>

          {/* User Info Form */}
          <form className={styles.UserInfo} onSubmit={handleFormSubmit}>
            <div className={styles.FormRow}>
              <label htmlFor="fullName">Full Name:</label>
              <input className={styles.inputFields}
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className={styles.FormRow}>
              <label htmlFor="userName">Username:</label>
              <input className={styles.inputFields}
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className={styles.FormRow}>
              <label htmlFor="userEmail">Email:</label>
              <input className={styles.inputFields}
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.FormRow}>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input className={styles.inputFields}
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className={styles.FormRowFull}>
              <label htmlFor="address">Address:</label>
              <textarea
                style={{minHeight:50, maxHeight:80, minWidth:700 , maxWidth:700}}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
            <button className={styles.formSubmitButton} type="submit">Save Profile</button>
          </form>

          {/* Reset Password */}
          <div className={styles.ResetPasswordSection}>
            <h4>Reset Password</h4>
            {resetPassword ? (
              <>
                <label htmlFor="newPassword">New Password:</label>
                <input className={styles.inputFields}
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <label htmlFor="confirmPassword">Confirm New Password:</label>
                <input className={styles.inputFields}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {/* cancel */}
                <button className={styles.cancelPasswordButton} onClick={handleCancelPassword}>Cancel</button>
                {/* save new password */}
                <button className={styles.resetPasswordSaveButton} onClick={handleSaveNewPassword}>Save</button> 
              </>
            ) : (
              <>
                <label htmlFor="previousPassword">Enter Previous Password:</label>
                <input className={styles.inputFields}
                  type="password"
                  value={previousPassword}
                  onChange={(e) => setPreviousPassword(e.target.value)}
                />
                <button className={styles.formVerifyButton} onClick={handlePasswordReset}>Verify Password</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
