import React from 'react'

const AddTodo = ({ onAdd }) => {

    // handle submit function
    const handleOnSubmit = (e) => {
        e.preventDefault();
        onAdd(e.target.name.value);
        e.target.name.value = "";


    }

    return (
        <div className='todo-form'>
            <form onSubmit={handleOnSubmit}>
                <h1>TODO LIST</h1>
                <input className='todo-input' placeholder='Add Todo...' name='name' required />
                <button className='todo-button' onSubmit={handleOnSubmit}>Add</button>
            </form>
        </div>
    )
}

export default AddTodo