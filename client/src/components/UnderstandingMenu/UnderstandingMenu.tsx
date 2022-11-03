import React from "react";
import { Container, Button } from "@chakra-ui/react";
import "./style.css";

interface Props {
  current: number;
  top: number;
  left: number;
  onButtonClick: (understanding: number) => void;
}

const ContextItems = [
  {
    text: "What Rubbish",
    understanding: 1,
  },
  {
    text: "Not Clear",
    understanding: 2,
  },
  {
    text: "Somewhat Understood",
    understanding: 3,
  },
  {
    text: "Understood",
    understanding: 4,
  },
];

const UnderstandingMenu: React.FC<Props> = ({
  current,
  top,
  left,
  onButtonClick,
}) => {
  const onClick = (index: number) => {
    onButtonClick(index);
  };

  return (
    <div className="context-menu" style={{ top: top, left: left }}>
      {ContextItems.map((item, index) => {
        return (
          <button
            className={`context-item u${item.understanding}`}
            key={item.understanding}
            onClick={() => onClick(item.understanding)}
          >
            {item.text}
          </button>
        );
      })}
    </div>
  );
};

export default UnderstandingMenu;
