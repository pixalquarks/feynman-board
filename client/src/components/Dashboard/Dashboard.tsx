import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Container, ListItem, UnorderedList, Button } from "@chakra-ui/react";
import "./style.css";

const Dashboard: React.FC = () => {
  const { topics } = useContext(UserContext) as UserContextType;

  const navigate = useNavigate();
  return (
    <div>
      <Container maxW="md">
        <Button colorScheme="blue" onClick={() => navigate("/add-topic")}>
          Add Topic
        </Button>
        <UnorderedList>
          {topics.map((topic, index) => {
            return (
              <ListItem key={index}>
                {topic.name}: {topic.understanding} %
              </ListItem>
            );
          })}
        </UnorderedList>
      </Container>
    </div>
  );
};

export default Dashboard;
