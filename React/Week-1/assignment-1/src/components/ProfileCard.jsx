import React from "react";
import styles from "./ProfileCard.module.css"; // Import CSS Module for styling
function ProfileCard({ name, email }) {
  return (
    <div className={styles.profileCard}>
      {" "}
      {/* Use styles.profileCard */}
      <h3>{name}</h3>
      <p>Email: {email}</p>
    </div>
  );
}
export default ProfileCard;
