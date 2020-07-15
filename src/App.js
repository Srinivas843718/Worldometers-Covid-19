import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router,Route } from "react-router-dom";
import Head from './Header/Head';
import Home from './Home/Home';
import Covid from './Covid19inINDIA/Covid';
import Safety from './SafetyMeasures/Safety'
import Login from './Signin/Login'
import Contactus from './GetInTouch/Contactus';


 class App extends Component{


  render(){
  return (
    <div >
      
         
         
       <Router>
      
       <Head />
       <Route exact path="/Home" component={Home}></Route>
        <Route exact path="/Covid" component={Covid}></Route>
        <Route exact path="/Safety" component={Safety}></Route>
        <Route exact path="/Login" component={Login}></Route>
        
        <Route exact path="/Contactus" component={Contactus}></Route>
     
        </Router> 

       
    </div>
  );
}
  }

export default App;