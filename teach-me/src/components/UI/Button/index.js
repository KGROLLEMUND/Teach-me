import React from 'react';

const Button = ({type, title, handleClick}) => {
    return (
       <button type={type} onClick={handleClick}>
        {title}
        </button>
    );
}

export default Button;
