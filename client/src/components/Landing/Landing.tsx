import React, { useRef, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Container, Input, Button } from "@chakra-ui/react";
import "./style.css";

const Landing: React.FC = () => {
  const { user, Login } = useContext(UserContext) as UserContextType;

  const inputRef = useRef(null);

  const OnUsernameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current === null) return;
    console.log(inputRef.current.value);
    Login(inputRef.current.value);
  };

  return (
    <div className="landing">
      <Container>
        <form onSubmit={OnUsernameSubmit}>
          <label htmlFor="username">Username: </label>
          <Input
            ref={inputRef}
            id="username"
            type="text"
            placeholder="username"
          />
          <Button colorScheme="green" type="submit">
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Landing;
