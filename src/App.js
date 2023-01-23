import './App.css';
import React, { useEffect, useState } from 'react'
import Todo from './Components/Todo';
import AddTodo from './Components/AddTodo';

const App = () => {
  // some constant and global varibles and useState
  const [todos, setTodos] = useState([]);
  const [upperLimit, addupperLimit] = useState(200);
  const jsonLink = 'https://jsonplaceholder.typicode.com/todos'
  var lowerLimit = 195;

  // useEffect for continous fetching api on component
  useEffect(() => {
    fetchData();
  }, [])


  // fetching data arrow function
  const fetchData = async () => {

    await fetch(jsonLink)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => {
        console.log(err);
      })
  }

  // add new todo
  const onAdd = async (name) => {

    await fetch(jsonLink, {
      method: 'POST',
      body: JSON.stringify({
        title: name,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          return
        }
        else {
          return response.json();
        }
      })
      .then((data) => {
        setTodos((todos) => [...todos, data]);
        // upperLimit=upperLimit-1;
        addupperLimit(upperLimit + 1);
      })
      .catch((err) => {
        console.log(err)
      });

  }

  // delelte todo
  const onDelete = async (id) => {
    await fetch(jsonLink + `/${id}`, {
      method: 'DELETE'
    }).then((response) => {
      if (response.status !== 200) {
        return
      }

      else {
        setTodos(todos.filter((todo) => {
          return todo.id !== id;
        }))
        addupperLimit(upperLimit - 1);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  // function to handle edit dummy api
  const handleEditTodos = async (editvalue, id) => {

    await fetch(jsonLink + `/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        title: editvalue
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data+"==udatedd ")
        setTodos((todos) => [...todos, data])
        alert(data.title + "  Edited at id-" + id)
      })
      .catch((err) => {
        console.log(err)
      });
  }

  // switch check isDone or not
  const switchComplete = id => {
    const newTodos = [...todos];
    newTodos.forEach((todo, index) => {
      if (index + 1 === id) {
        todo.completed = !todo.completed;
      }
    })
    setTodos(newTodos)
  }
  // print userss on console
  // console.log(users)
  return (
    <div className='App'>
      <h3>ToDo App</h3>
      <br />
        <AddTodo onAdd={onAdd} />
      <div className='list-wrapper'>
        {
          todos.slice(lowerLimit, upperLimit).map((todo) => (
            <Todo
              id={todo.id}
              key={todo.id}
              title={todo.title}
              completed={todo.completed}
              onDelete={onDelete}
              handleEditTodos={handleEditTodos}
              checkComplete={switchComplete}
            />
          ))}
      </div>
    </div>
  )
}

export default App