import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import "./style.css";

import UnderstandingMenu from "../UnderstandingMenu";
import { useParams } from "react-router-dom";

import { Button, useToast } from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";

import {
  SplitIntoBlocks,
  JoinBlocks,
  isDualDelimiter,
  delimiterMap,
} from "../../util/dataparse";

const colors = ["red", "blue", "yellow", "green"];

const delimiter = ",-(){}[]'\"\\/;:?.|";

const AddTopic: React.FC = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isEditing, setIsEditing] = useState(true);
  const [id, setId] = useState("");

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const [currentBlockIndex, setCurrentBlockIndex] = useState(-1);
  const [isContextVisible, setIsContextVisible] = useState(false);

  const { AddTopic, GetTopicById, UpdateTopic } = useContext(
    UserContext
  ) as UserContextType;

  const { topicId } = useParams();
  const toast = useToast();

  useEffect(() => {
    if (topicId) {
      GetTopicById(topicId)
        .then((topic) => {
          if (topic) {
            setName(topic.name);
            setBlocks(topic.blocks);
            setId(topic._id ? topic._id : "");
          }
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: err.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }, []);

  const onEditClicked = () => {
    setIsEditing((prev) => !prev);
    if (!isEditing) {
      SplitData();
    } else {
      JoinData();
    }
  };

  const SplitData = () => {
    try {
      const newBlocks = SplitIntoBlocks(data);
      for (let block of newBlocks) {
        for (let check of blocks) {
          if (block.text === check.text) {
            block.understanding = check.understanding;
          }
        }
      }
      setBlocks(newBlocks);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const JoinData = () => {
    const res = JoinBlocks(blocks);
    setData(res);
  };

  // It sets the top and left for context menu when a block is clicked.
  const onBlockClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    index: number
  ) => {
    const left = e.clientX + "px";
    const top = e.clientY + "px";
    setTop(parseInt(top));
    setLeft(parseInt(left));
    setCurrentBlockIndex(index);
    setIsContextVisible(true);
  };

  // It sets the understanding of the block when a context menu item is clicked.
  const onContextItemClck = (understanding: number) => {
    const newBlocks = [...blocks];
    newBlocks[currentBlockIndex].understanding = understanding;
    setBlocks(newBlocks);
    setIsContextVisible(false);
    setCurrentBlockIndex(-1);
  };

  const onAddTopic = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SplitData();
    const nTopic: Topic = {
      name,
      blocks,
    };
    if (id) {
      nTopic._id = id;
      UpdateTopic(nTopic);
    } else {
      AddTopic(nTopic);
    }
  };

  return (
    <>
      {isContextVisible && (
        <UnderstandingMenu
          current={blocks[currentBlockIndex].understanding}
          top={top}
          left={left}
          onButtonClick={onContextItemClck}
        />
      )}
      <div className="add-topic">
        <form onSubmit={onAddTopic}>
          <div className="topic-name">
            <label htmlFor="topic">TOPIC : </label>
            {isEditing ? (
              name
            ) : (
              <input
                id="topic"
                type="text"
                placeholder="topic"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
          </div>
          <div className="topic-data">
            {isEditing ? (
              blocks.map((block, index) => {
                return (
                  <span
                    className={block.text.trim() !== "" ? "block-item" : ""}
                    key={index}
                    onClick={(e) => onBlockClick(e, index)}
                    style={{ color: colors[block.understanding - 1] }}
                  >
                    {isDualDelimiter(block.delimiter) && (
                      <span style={{ color: "black" }}>
                        {delimiterMap.get(block.delimiter)}
                      </span>
                    )}
                    {block.text}
                    <span style={{ color: "black" }}>{block.delimiter}</span>
                  </span>
                );
              })
            ) : (
              <textarea
                rows={10}
                cols={40}
                value={data}
                onChange={(e) => setData(e.target.value)}
              ></textarea>
            )}
          </div>
          <Button type="submit" color="blue">
            {id ? "Update" : "Add"}
          </Button>
        </form>
        <button className="edit-button" onClick={onEditClicked}>
          <AiFillEdit />
        </button>
      </div>
    </>
  );
};

export default AddTopic;
