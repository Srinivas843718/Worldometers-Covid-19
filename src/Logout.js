import React , { Component } from "react";
import fire from "./Config/fire";

class Logout extends Component{
constructor(props)
{
    super(props)
    this.state={
        
    }
}
logout(){
    fire.auth().signOut();
}
render()
{
    return(
        <div>
           <h1>You are Logged in!!!</h1>
            <button onClick={this.logout}>Logout</button>
        </div>
    )
}
}
export default Logout ;