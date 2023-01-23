import React from 'react'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import { MdDoneOutline, MdRemoveDone } from 'react-icons/md';
const Todo = ({ id, title, completed, onDelete, checkComplete, handleEditTodos }) => {

    
    const [onEdit, setOnEdit] = useState(false)
    const [editValue, setEditValue] = useState(title);


    const handleDelete = () => {
        onDelete(id);
    }

    
    const handleOnEdit = () => {
        setOnEdit(true);
    }
   
    const handleSave = () => {
        setOnEdit(false);
        if (editValue) {
            handleEditTodos(editValue, id)
        }
        else {
            setEditValue(title)
        }
    }

 
    if (onEdit) {
        return (

            <div className='todo-item-container'>

                
                    <input className='todo-input' id={id} type="text" value={editValue} name="editValue"
                        onChange={e => setEditValue(e.target.value.toLocaleLowerCase())}
                    />

                

             
                    <div className="button-container">
                        <button id='edit' onClick={() => handleSave()} >Save</button>
                        <button className='remove-button' id='delete' onClick={handleDelete}><TiDelete/></button>
                    </div>
             
            </div>
        )

    }

    else {

        return (

            <div className='todo-item-container'>

                <div className='todo-item'>
                    <label htmlFor={id} className={completed ? "active todo" : "todo"}>
                        {title}
                    </label>
                </div>
                 <div className="button-container">
                    <button className='completed-btn' id={id} onClick={() => checkComplete(id)}>{completed ? <MdRemoveDone/> : <MdDoneOutline/>}</button>
                    <button id='edit' onClick={handleOnEdit} disabled={completed}><FaEdit/></button>
                    <button className='remove-button' id='delete' onClick={handleDelete}><TiDelete/></button>
                </div>
                
            </div>
        )
    }


}

export default Todo