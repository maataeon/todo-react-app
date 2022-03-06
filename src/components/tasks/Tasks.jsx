import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStorageData, removeTask, toggleTask } from '../todo/todoSlice';
import './tasks.css';
import Task from '../task/Task';

const Tasks = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todo);

  const handleDelete = (index) => {
    dispatch(removeTask(index));
  }

  useEffect(() => {
    dispatch(getStorageData());
  }, []);

  const getGroupById = (groupId) => {
    return state.groups.find(group => group.id === groupId)
  };


  const toggleTaskState = (id, status) => {
    const parameters = { id, status };
    console.log(parameters);
    dispatch(toggleTask(parameters));
  }

  const getChecked = (taskId) => {
    state.tasks.filter(task => task.id !== taskId)
  }

  return (
    <div className="tasks-wrapper">
      {state.groups.flatMap(group => group.id).map((groupId) => {
        const group = getGroupById(groupId);
        const tasksGroup = state.tasks.filter(task => task.groupId === groupId);
        return (
          <div className="tasks" key={group.id}>
            <div className="tasks-header" style={{ backgroundColor: group.color }}>{group.name}</div>
            <div className="tasks-body">
              {tasksGroup.map((task, index) => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    getChecked={getChecked}
                    handleDelete={handleDelete}
                    toggleTaskState={toggleTaskState}
                    getGroupById={getGroupById} />
                );
              })
              }
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Tasks