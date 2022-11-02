import React from "react";
import "./style.css";

const topics = [
  { name: "fdlskfjdf", understanding: 30 },
  { name: "gflgkflgfr", understanding: 76 },
  { name: "vvmxkvdr", understanding: 12 },
];

const Dashboard: React.FC = () => {
  return (
    <div>
      <button>Add Topic</button>
      <ul>
        {topics.map((topic, index) => {
          return (
            <li key={index}>
              {topic.name}: {topic.understanding} %
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboard;
