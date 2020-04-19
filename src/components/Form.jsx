import React from 'react';
import { useState } from 'react';

const TodoForm = ({addTodoForm}) => {
    
    const [value, setValue] = useState('');
    
    const onFormSubmit = (event) => {
        event.preventDefault();

        if( !value ) return;
        
        addTodoForm( value );

        setValue('');
        
    }

    const handleOnChange = (event) => {
        console.log(event.target.value);
        
        setValue(event.target.value);
    }

    return (
        <form onSubmit={onFormSubmit}>
            <input 
                type="text"
                className="form-input"
                placeholder="Add new task"
                value={value}
                onChange={handleOnChange}
            />
        </form>
    )
}

export default TodoForm;