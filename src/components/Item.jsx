import React from 'react';

const Item = ( {todo, index, handleRemove, handleItemClick} ) => {
    return (
        <div className="todo">
            <span 
                className={ todo.isCompleted ? 'strike-through' : '' }
                onClick={() => handleItemClick( todo.id, index )}
            >{todo.text}</span>
            <span className="remove-item-cross" onClick={() => handleRemove(todo.id, index)}>Xóa</span>
        </div>
    )
};

export default Item;