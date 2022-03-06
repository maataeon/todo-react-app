import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTask, clearAll, clearTasks, openModal, removeGroup, setSelectedGroupId } from '../todo/todoSlice';
import Select from 'react-select';

const Creator = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todo);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const clickAddTask = () => {
    if (title !== '' && description !== '') {
      const task = {
        id: Math.max(...state.tasks.flatMap(task => task.id)) + 1 | 0,
        groupId: state.selectedGroupId,
        done: false,
        title,
        description
      };
      console.log('add task:', task);
      dispatch(addTask(task));
      setTitle('');
      setDescription('');
    } else {
      console.error('You have to provide a title and description in order to add a task!')
    }
  }

  const clickAddGroup = () => {
    dispatch(openModal());
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  const changeGroup = (group) => {
    dispatch(setSelectedGroupId(group.id));
  }

  const clickRemoveGroup = (groupId) => {
    console.log(groupId);
    const groupInUse = state.tasks.flatMap(task => task.groupId).some(id => id === groupId);
    if (!groupInUse) {
      dispatch(removeGroup(groupId));
    } else {
      console.error('You can\'t delete a group already in use !')
    }

  }

  return (
    <div className="creator">
      <div className="group-section">
        <Select
          key={state.selectedGroupId}
          className="group-list"
          classNamePrefix="select"
          defaultValue={state.groups.find(group => group.id == state.selectedGroupId)}
          isDisabled={false}
          isLoading={false}
          isClearable={true}
          isRtl={false}
          isSearchable={true}
          name="groups"
          options={state.groups}
          placeholder="Select a group"
          onChange={changeGroup}
          getOptionLabel={(option) => {
            return (
              <div className="select-group-option">
                <div className="option-color-sample" style={{ backgroundColor: option.color }}></div>
                <span className="option-name">{option.name}</span>
                {option.id > 0 ?
                  <button className="delete-btn" onClick={() => clickRemoveGroup(option.id)}>X</button>
                  : null}
              </div>
            );
          }
          }
        />
        <a className="waves-effect waves-light btn" onClick={clickAddGroup}>Add Group</a>
      </div>
      <div className="separator-horizontal" />
      <div className="task-section">
        <div className="task-inputs">
          <input
            className="input-task"
            placeholder='Write the title...'
            type="text"
            value={title}
            onChange={handleChangeTitle} />
          <input
            className="input-task"
            placeholder='and a description...'
            type="text"
            value={description}
            onChange={handleChangeDescription} />
        </div>
        <a className="waves-effect waves-light btn" onClick={clickAddTask}>Add Taks</a>
      </div>
      <div className="cleaning-buttons">
        <button className="btn red lighten-1" onClick={() => { dispatch(clearTasks()) }}>Clean tasks</button>
        <button className="btn red lighten-1" onClick={() => { dispatch(clearAll()) }}>Default</button>
      </div>
    </div>
  )
};

export default Creator;