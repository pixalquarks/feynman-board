import React from "react";
import "./style.css";

const AddTopic: React.FC = () => {
  return (
    <div className="add-topic">
      <form>
        <div className="topic-name">
          <label htmlFor="topic">TOPIC : </label>
          <input id="topic" type="text" placeholder="topic" />
        </div>
        <textarea rows={30} cols={40}></textarea>
      </form>
    </div>
  );
};

export default AddTopic;
