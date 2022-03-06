import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SwatchesPicker } from 'react-color';
import { addGroup, closeModal, setSelectedGroupId } from '../todo/todoSlice';
import './modal.css';

const Modal = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todo);

  const [picker, setPicker] = useState(false)
  const [color, setColor] = useState('#ffc107')
  const [name, setName] = useState(null);

  const handleChangeComplete = (color) => {
    console.log(color);
    setColor(color.hex);
    setPicker(false);
  };

  const handleOpenPicker = (e) => {
    setPicker(true);
  }

  const clickCancel = () => {
    dispatch(closeModal())
  }

  const handleChangeGroupName = (e) => {
    setName(e.target.value);
  }

  const clickAddGroup = () => {
    const group = {
      id: Math.max(...state.groups.flatMap(group => group.id)) + 1 | 0,
      name,
      color
    }
    console.log('add group:', group);
    dispatch(addGroup(group));
    dispatch(closeModal());
    dispatch(setSelectedGroupId(group.id));
  }

  return (
    state.modalOpen ?
      <div className="modal-groups">
        <div className="modal-content">
          <div className="modal-header">Create new group</div>
          <div className="modal-body">
            {picker &&
              <SwatchesPicker
                color={color}
                onChangeComplete={handleChangeComplete}
              />
            }
            <div className="color-sample"
              style={{ backgroundColor: color }}
              onClick={handleOpenPicker}
            ></div>
            <input className="input-group" type="text" placeholder='Name it !' onChange={handleChangeGroupName} />
          </div>
          <div className="modal-footer">
            <button className="waves-effect waves-green btn" onClick={clickCancel}>Cancel</button>
            <button className="modal-close waves-effect waves-green btn" onClick={clickAddGroup}>Add group</button>
          </div>
        </div>
      </div>
    : null
  )
}

export default Modal;