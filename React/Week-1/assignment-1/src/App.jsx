import React from "react";
import "./styles.css";
import ProfileCard from "./components/ProfileCard";
function App() {
  const data = [
    { id: 1, name: "Leanne Graham", email: "leannegram@abc.com" },
    { id: 2, name: "Ervin Howell", email: "ervinhowell@abc.com" },
  ];
  return (
    <div className="App">
      {data.map((person) => (
        <ProfileCard key={person.id} name={person.name} email={person.email} />
      ))}
    </div>
  );
}
export default App;
