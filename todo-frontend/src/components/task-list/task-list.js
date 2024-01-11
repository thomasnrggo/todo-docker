import React, { useState } from "react";
import TaskItem from "../task-item/task-item";
import NewTask from "../new-task/new-task";
import useService from "../../hooks/useService";

const TaskList = () => {
  const [showCompleted, setShowCompleted] = useState(false);
  const {
    data = [],
    createItem,
    deleteItem,
    updateItem,
    loading,
  } = useService(showCompleted);

  const handleComplete = (item, completed) => {
    const updatedItem = {
      ...item,
      completed,
    };
    updateItem(item._id, updatedItem);
  };

  const handleDelete = (itemId) => {
    deleteItem(itemId);
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold mb-4">Task List</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={toggleShowCompleted}
        >
          {showCompleted ? "Show pending" : "Show completed"}
        </button>
      </div>
      <NewTask handleCreate={createItem} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {data.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
