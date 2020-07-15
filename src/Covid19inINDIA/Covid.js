import React,{useEffect, useState} from 'react';
import Footer from '../Footer/Footer';
import Carousels from './Carousels';


const Data = () => {
  const [data, setData] = useState([]);
 
  useEffect(() => {
      fetch('https://jsonblob.com/api/0d594408-b0be-11ea-affd-45f650024945').
      
          then(response => response.json()).
          then(json => {
              setData([...json])
            
          })
  }, []);

 return(
   <div>
  <  div className="container " >
                <div className="heading" id="head"><i>Novel Corona Virus in India</i>
<h3 style={{color:"lime"}}><b>Top News for you </b></h3>
                <Carousels /></div><br /><br />
                <h3 style={{color:"red",textAlign:"center"}}> Cases accross the Country</h3>
                <table className="table table-hover">
                  
      <thead>
        <tr>
        
          <th colSpan="1" >State</th>
          <th >Total Cases</th>
          <th >Death</th>
          <th >Recovered</th>
          <th >Active Cases</th>
        </tr>
      </thead>
     
      <tbody>
               
  {data.map(({name,total,death,cured,active }) => (
    
 <>
        <tr >
            
      <td>{name}</td>
          <td >{total} </td>
          <td>{death} </td>
          <td>{cured} </td>
          <td>{active} </td>

        </tr>
   </>
  ))}
      </tbody>
  
   </table>
  
         
                    
  
   
   </div>
   
   <Footer />
            </div>
        
        
    




)
}

export default Data;




