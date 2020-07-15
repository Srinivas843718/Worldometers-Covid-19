import React from 'react';
import './Contactus.css'
import Footer from '../Footer/Footer';

const Contactus = () => {
    return (
        <div><br />
        
<div className="jumbotron">
  <div >
      <marquee>For any COVID 19 related queries, call your State Helpline/Ministry of Health & Family Welfare's 24X7 helpline at 1075 or 011-23978046.</marquee>
     
 <hr />
    
  </div>
  <div className="row">
    <div className="column">
    <img src="https://images.unsplash.com/photo-1591766138175-adc7b22a3708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80" style={{width:"90%", height:"440px"}} />
    
 
    </div>
    <div className="column">
      <form >
      <h2 style={{ color:"green"}}>Contact Us</h2>
        <label for="fname">First Name</label>
        <input type="text" id="fname" name="firstname" placeholder="Your name.." />
        <label for="lname">Last Name</label>
        <input type="text" id="lname" name="lastname" placeholder="Your last name.." />
       
        <label for="subject">Subject</label>
        <textarea id="subject" name="subject" placeholder="Write something.." ></textarea>
        <input type="submit" value="Submit" />
      </form>
    </div>
  
</div>
</div>
<Footer />
      
      </div> )

}
export default Contactus