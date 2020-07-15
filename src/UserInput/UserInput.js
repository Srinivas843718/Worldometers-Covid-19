import React from 'react';

const userInput = (props) => {
    const inputStyle = {
        border: '3px solid green'
    }

    return <input type="text" onChange={props.changed} 
    style={inputStyle}
    value={props.currentName}/>;
};
export default userInput;