import React, { useState } from "react";
import "./style.css";

const colors = ["red", "blue", "yellow", "green"];

const AddTopic: React.FC = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isEditing, setIsEditing] = useState(true);

  const onEditClicked = () => {
    setIsEditing((prev) => !prev);
    if (!isEditing) {
      SplitData();
    } else {
      JoinData();
    }
  };

  const SplitData = () => {
    const newBlocks = data
      .split(",")
      .filter((block: string) => block.trim().length > 0)
      .map((block: string) => {
        return {
          text: block,
          understanding: 1,
          delimiter: ",",
        };
      });
    setBlocks(newBlocks);
    console.log(newBlocks);
  };

  const JoinData = () => {
    let res = "";
    for (let block of blocks) {
      res += block.text;
      if (block.delimiter !== undefined) {
        res += block.delimiter;
      }
    }
    setData(res);
  };

  const onAddTopic = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, data);
  };

  const onBlockClicked = (index: number) => {};

  return (
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
          <button onClick={onEditClicked}>Edit</button>
        </div>
        {isEditing ? (
          blocks.map((block, index) => {
            return (
              <span
                className="block-item"
                key={index}
                style={{ color: colors[block.understanding - 1] }}
              >
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTopic;
