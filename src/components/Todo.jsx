import React, { useState } from 'react';
import Item from './Item';
import TodoForm from './Form';
import { useEffect } from 'react';

const Todo = () => {
    
    const [ todos, setTodo ] = useState([]);

    const getDataTodos = async () => {
        const res = await fetch('https://5e702b60667af70016316bd7.mockapi.io/api/todos', {
            method: 'get',
            headers: {
                Accept: 'Appliction/json'
            }
        });
        const resJSON = await res.json();
        
        setTodo( resJSON ) 
    }

    useEffect(() => {
        getDataTodos();
    }, [])

    const addTodo = async ( text ) => {
        const dataTodos = await fetch('https://5e702b60667af70016316bd7.mockapi.io/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });
        const response = await dataTodos.json();
        
        const newTodos = [...todos, response];

        setTodo( newTodos );
    }

    const handleItemClick = async ( id, index ) => {
        const newTodos = [...todos];

        newTodos[index].isCompleted = ! newTodos[index].isCompleted;

        const data = await fetch(`https://5e702b60667af70016316bd7.mockapi.io/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isCompleted: newTodos[index].isCompleted })
        });

        setTodo( newTodos );
    }

    const handleRemoveClick = async ( id, vitri ) => {
        const newTodosDelete = [...todos];

        const dataTodos = await fetch(`https://5e702b60667af70016316bd7.mockapi.io/api/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const newTodos = newTodosDelete.filter(( _, index ) => index !== vitri);

        setTodo( newTodos );
    }

    return(
        console.log('render'),
        
        <div className="todo-container">
            <h2 className="main-heading">Todo App</h2>
            <TodoForm addTodoForm={ addTodo } />

            <ul class="task-filters">
                <li><a>View All</a></li>
                <li><a>In Progress</a></li>
                <li><a>Completed</a></li>
            </ul>

            <div>
                { todos.length ? (
                    todos.map(( item, index ) => (
                        <Item 
                            key={`${ item.text }-${ index }`}
                            index={ index }
                            todo={ item }
                            handleRemove={ handleRemoveClick }
                            handleItemClick={ handleItemClick }
                        />
                    ))
                ) : '' }
            </div>
        </div>
    )
}

export default Todo;