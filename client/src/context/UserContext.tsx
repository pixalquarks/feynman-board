import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

interface Props {
  children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState({});

  const [topics, setTopics] = useState<Topic[]>([]);

  const navigate = useNavigate();

  const Login = (user: string) => {
    setUser(user);
    navigate("/dashboard");
  };

  return (
    <UserContext.Provider value={{ user, Login, topics }}>
      {children}
    </UserContext.Provider>
  );
};
