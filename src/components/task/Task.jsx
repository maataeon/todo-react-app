import React from 'react';
import Switch from "react-switch";

const Task = ({ task, getGroupById, handleDelete, toggleTaskState }) => {
  return (
    <div className={'task' + (task.done ? ' done' : '')}>
      <div className="task-header">
        <button
          className="delete-btn"
          onClick={() => handleDelete(task.id)}
        >X</button>
        <Switch
          onChange={(status) => toggleTaskState(task.id, status)}
          checked={task.done}
          height={22}
        />
      </div>
      <div className="task-body">
        <div className="title">{task.title}</div>
        <div className="description">{task.description}</div>
      </div>
    </div>
  )
}

export default Task