import React, { useState } from "react";

const NewTask = ({ handleCreate }) => {
  const [task, setTask] = useState("");

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      const newTask = {
        title: task,
      };
      handleCreate(newTask);
      setTask("");
    }
  };

  return (
    <div className="mb-8">
      <input
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
        type="text"
        placeholder="Write a task..."
        value={task}
        onChange={(event) => setTask(event.target.value)}
        onKeyDown={handleKeyPress}
      />
      <hr className="mt-4 " />
    </div>
  );
};

export default NewTask;
