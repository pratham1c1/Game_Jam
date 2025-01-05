import { useState } from "react";
import CommonHeader from "../../components/PageHeader/CommonHeader";
import styles from "./UserProfile.module.css";

function UserProfile() {
  const [profileImage, setProfileImage] = useState("/check_image.jpg");
  const [fullName, setFullName] = useState("Prathamesh C");
  const [userName, setUserName] = useState("PC");
  const [userEmail, setUserEmail] = useState("kc#gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");
  const [address, setAddress] = useState("123, Game Street, NY");
  const [resetPassword, setResetPassword] = useState(false);
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handlePasswordReset = () => {
    if (previousPassword === newPassword) {
      setErrorMessage("New password cannot be the same as the previous password.");
      return;
    }
    setResetPassword(true);
    setErrorMessage("");
  };

  const handleSaveNewPassword = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    setSuccessMessage("Password updated successfully!");
    setResetPassword(false);
    setPreviousPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <CommonHeader />
      <div className={styles.ProfileContainer}>
        <h3>Update Your Profile</h3>
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <div className={styles.UserDetailsBox}>
          {/* Profile Picture */}
          <div className={styles.ProfileImageContainer} style={{ backgroundImage: `url('check_image.jpg')` }}>
            <img
              src={profileImage || "/default-profile.png"}
              alt="Profile"
              className={styles.ProfileImage}
            />
            <div className={styles.ProFileImageInputs}>
            <input className={styles.ProfileImageName} type="file" onChange={handleImageChange} />
            <input className={styles.ProfileBackgroundImageName} type="file" onChange={handleImageChange} />
            </div> 
          </div>

          {/* User Info Form */}
          <form className={styles.UserInfo} onSubmit={handleFormSubmit}>
            <div className={styles.FormRow}>
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className={styles.FormRow}>
              <label htmlFor="userName">Username:</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className={styles.FormRow}>
              <label htmlFor="userEmail">Email:</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.FormRow}>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className={styles.FormRowFull}>
              <label htmlFor="address">Address:</label>
              <textarea
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
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <label htmlFor="confirmPassword">Confirm New Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {/* save new password */}
                <button className={styles.resetPasswordSaveButton} onClick={handleSaveNewPassword}>Save</button> 
              </>
            ) : (
              <>
                <label htmlFor="previousPassword">Enter Previous Password:</label>
                <input
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
