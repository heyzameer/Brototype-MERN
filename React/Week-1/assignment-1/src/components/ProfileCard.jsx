import React from "react";
import  "./profil.css"; // Import CSS Module for styling
function ProfileCard({ name, email }) {
  return (
    <div className="profileCard">
      {" "}
      {/* Use styles.profileCard */}
      <h3>{name}</h3>
      <p>Email: {email}</p>
    </div>
  );
}
export default ProfileCard;
