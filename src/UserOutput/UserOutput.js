import React from 'react';
//import './UserOutput.css'
import styled from 'styled-components';

const StyledDiv=styled.div `  

padding:16px;
width: 60%;
margin:16px;
border:2px solid black;
background-color:skyblue;
text-align: center;

`;



const userOutput = (props) => {
    
    

    return(
//<div className="UserOutput">
<StyledDiv>
<p>Hai i am {props.userName} </p>
<p>Welcome to my First React Application</p>
</StyledDiv>
//</div>

    );

};
export default userOutput;