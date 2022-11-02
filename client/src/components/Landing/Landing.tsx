import React, { useState } from "react";
import "./style.css";

const Landing: React.FC = () => {
  const [username, setUsername] = useState("");

  const OnUsernameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username);
    setUsername("");
  };

  return (
    <div>
      <form onSubmit={OnUsernameSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Landing;
