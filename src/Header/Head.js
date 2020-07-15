import React from 'react';
import { Navbar, Nav } from'react-bootstrap';
import { BrowserRouter as Router,Link,Route } from 'react-router-dom';
const Head = () => {
    return (
        <>
        <div>
            <div className="row pl-2 ml-4">
        <img src="https://acegif.com/wp-content/uploads/globe.gif" width="150px" height="130px" style={{marginLeft:"200px"}} />
        <h1 style={{textAlign:"center",color:"blue",fontSize:"60px",marginTop:"20px"}}>Worldometers - Corona Virus</h1>
        </div>
       

<div>
     


<Navbar collapseOnSelect  variant="dark" expand="lg">
          
          <Navbar.Toggle className="bg-primary" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" ml-auto">

            <Link to="/Home" style={{textDecoration:"none"}}> <Nav.Link className=" text-dark font-weight-bold ml-5" href="Home" style={{textDecoration:"none"}}><h5 className=" text-success" > Home</h5></Nav.Link></Link>  
            <Link to="/Covid" style={{textDecoration:"none"}}>  <Nav.Link className=" text-dark font-weight-bold ml-5" href="Covid" style={{textDecoration:"none"}}><h5 className=" text-success" >Covid-19 in India</h5></Nav.Link></Link>  
            <Link to="/Login" style={{textDecoration:"none"}}> <Nav.Link className=" text-dark font-weight-bold ml-5" href="Login" style={{textDecoration:"none"}}><h5 className=" text-success" >Sign In</h5></Nav.Link></Link>  
            <Link to="/Safety" style={{textDecoration:"none"}}> <Nav.Link className=" text-dark font-weight-bold ml-5" href="Safety" style={{textDecoration:"none"}}><h5 className=" text-success" >Safety Measures</h5></Nav.Link></Link>
            <Link to="/Contactus" style={{textDecoration:"none"}}>   <Nav.Link className=" text-dark font-weight-bold ml-5" href="Contactus" style={{textDecoration:"none"}}><h5 className=" text-success" style={{paddingRight:"150px"}}>Get in touch</h5></Nav.Link></Link>  

            </Nav>
          </Navbar.Collapse>
        </Navbar>


    </div>



        </div>
</>
    )

}
export default Head