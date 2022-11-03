import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

export const UserContext = createContext({});

const baseUrl = "http://localhost:8000";

interface Props {
  children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState("");

  const [topics, setTopics] = useState<CompactTopic[]>([]);

  const navigate = useNavigate();

  const Login = async (user: string) => {
    setUser(user);
    navigate("/dashboard");
  };

  const GetTopics = async () => {
    console.log("Getting topics");
    if (!user) {
      navigate("/");
      return;
    }
    const response: AxiosResponse = await axios.get(`${baseUrl}/${user}/topic`);
    setTopics(response.data.user.topics);
  };

  const GetTopicById = async (id: string): Promise<Topic | null> => {
    if (!user) {
      navigate("/");
      return null;
    }
    const response: AxiosResponse = await axios.get(
      `${baseUrl}/${user}/topic/${id}`
    );
    if (response.status === 200) {
      return response.data.topic;
    } else {
      return null;
    }
  };

  const AddTopic = async (topic: Topic) => {
    if (!user) {
      navigate("/");
      return;
    }
    const response: AxiosResponse = await axios.post(
      `${baseUrl}/${user}/topic`,
      topic
    );
    if (response.status === 200) {
      navigate("/dashboard");
    } else {
      console.error(response.data.error);
    }
  };

  const UpdateTopic = async (topic: Topic) => {
    if (!user) {
      navigate("/");
      return;
    }
    const response: AxiosResponse = await axios.put(
      `${baseUrl}/${user}/topic/${topic._id}`,
      topic
    );
    if (response.status === 200) {
      navigate("/dashboard");
    } else {
      console.error(response.data.error);
    }
  };

  // const UpdateTopic = async (topic: Topic) => {
  //   if (!user) {
  //     navigate("/");
  //     return;
  //   }
  //   const response: AxiosResponse = await axios.put(
  //     `${baseUrl}/${user}/topic`,
  // }

  return (
    <UserContext.Provider
      value={{
        user,
        Login,
        topics,
        AddTopic,
        GetTopics,
        GetTopicById,
        UpdateTopic,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
