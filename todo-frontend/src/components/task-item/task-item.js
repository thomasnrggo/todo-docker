import React from "react";

const TaskItem = ({ task, onComplete, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-200 rounded-md">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(event) => onComplete(task, event.target.checked)}
          className="mr-2"
        />
        <span>{task.title}</span>
      </div>
      <button
        onClick={() => onDelete(task._id)}
        className="px-4 py-2 text-white bg-red-500 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
