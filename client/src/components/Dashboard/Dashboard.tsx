import React, { useContext, useEffect } from "react";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ListItem, UnorderedList, Button, Link, Flex } from "@chakra-ui/react";
import "./style.css";

const Dashboard: React.FC = () => {
  const { topics, GetTopics } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    GetTopics();
  }, []);

  const navigate = useNavigate();
  return (
    <Flex
      maxW="md"
      direction="column"
      align="center"
      justify="space-between"
      marginTop="2rem"
    >
      <Link
        as={ReactLink}
        to="/topics"
        width="100%"
        marginTop="1rem"
        marginBottom="1rem"
      >
        <Button colorScheme="blue" width="100%">
          Add Topic
        </Button>
      </Link>
      <h3 className="topic-header">TOPIC LIST: </h3>
      <UnorderedList className="topic-list">
        {topics.map((topic: CompactTopic, index: number) => {
          return (
            <ListItem key={index}>
              <Link as={ReactLink} to={`/topics/${topic._id}`}>
                <div className="topic-list-item">
                  <span className="topic-name">{topic.name} : </span>{" "}
                  <span className="understanding">
                    {Math.ceil(topic.understanding)} %
                  </span>
                </div>
              </Link>
            </ListItem>
          );
        })}
      </UnorderedList>
    </Flex>
  );
};

export default Dashboard;
