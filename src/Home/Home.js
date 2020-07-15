import React,{useEffect, useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Home.css';
import Graphs from './Graphs'


  
  


const Data = (props) => {
  const {
    buttonLabel,
    className
  } = props;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [input,setInput]=useState('')
  const [cases,setCases]=useState(0)
  const [deaths,setDeaths]=useState(0)
  const [recovered,setRecovered]=useState(0)
  useEffect(() => {
    fetch('https://corona.lmao.ninja/v2/countries').then(response => response.json()).then(json => {
        setTimeout(() => {
           
            setData([...json])
            setIsLoaded(true)
            setCases(json.reduce((a,b)=>a+Number(b.cases),0))
            setDeaths(json.reduce((a,b)=>a+Number(b.deaths),0))
            setRecovered(json.reduce((a,b)=>a+Number(b.recovered),0))
        }, 2000)
    })
}, []);


const inputHandler=(e)=>{
  const {value}=e.target;
  setInput(value);
}
const Search=()=>{
  fetch(`https://corona.lmao.ninja/v2/countries/${input}`).then(response => response.json()).then(json => {
      setTimeout(() => {
          let x=[];
          x.push(json)
          setData([...x]);
          setIsLoaded(true);
      }, 2000)
  })

}





 return(

 
   <div>
     
  <  div className="jumbotron " >
                <div className="heading" id="head"><i>World wide Covid-19 Statistics</i></div><br />
               
                
                <div className="card-deck">
  <div className="card bg-secondary text-white ">
   
    <div className="card-body">
      <h5 className="card-title">Cases</h5>
      <p className="card-text"> {cases}</p>
    </div>
  
  </div>
  <div className="card bg-danger text-white">
    
    <div className="card-body">
      <h5 className="card-title">Deaths</h5>
      <p className="card-text">{deaths}</p>
    </div>
   
  </div>
  <div className="card bg-success text-white">
    
    <div className="card-body">
      <h5 className="card-title">Recovered</h5>
      <p className="card-text">{recovered}</p>
    </div>
 
  </div>
</div><hr />




    <div>
      <Button color="primary" onClick={toggle} className='float-right'>Graphical View{buttonLabel}</Button>
      <Modal   isOpen={modal} toggle={toggle} className='modal-dialog modal-xl'>
        <ModalHeader   toggle={toggle} style={{fontFamily:'Lucida Calligraphy',color:'blue'}}>Graphical view of Total and Recovered Cases in 15 Most affected Countries</ModalHeader>
        <ModalBody>
        <Graphs />

        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle}> Go to Home </Button>
          
        </ModalFooter>
      </Modal>
    </div>
 










<h1 style={{color:'blue',textAlign:'center'}}>Situation accross the Globe </h1>
<div className="input-group mb-3">
  <input type="text"  onChange={inputHandler}  className="form-control" placeHolder="Search a Country"  />
  <div className="input-group-append">
  <button className = "btn" onClick={Search} ><i className="fa fa-search" style={{fontSize:"18px",paddingTop:"10px"}}
                                    ></i></button>
  </div>
</div>
{!isLoaded &&(<img src="https://i.pinimg.com/originals/2e/9c/68/2e9c6878eae5bbcdaa2d07ed4dbd79b8.gif" width="100%" />)}
                <div className="row">
  {data.map(({country, cases,countryInfo,  deaths, recovered,active,todayCases,todayDeaths,todayRecovered }) => (
                        <div className="col-lg-3 col-md-5 col-sm-12 mt-4 mb-5">
                            <div className="card" id="data" style={{ height: '650px' }}>
                            <h2 className="card-title p-2" >{country}</h2>
                                <img src={countryInfo.flag} height="250px" className="card-img-top " />
                                <div className="card-body" >
                                    <p id="cases" style={{color:'black'}}>Total Cases: {cases}</p>
                                    <p id="deaths" style={{color:'red'}}> Deaths: {deaths}</p>
                                    <p id="recovered" style={{color:'green'}}>Recovered: {recovered}</p>
                                    <p id="active" style={{color:'blue'}}> Active Cases: {active}</p>
                                    <p id="todaycases" style={{color:'orange'}}> Todays's Cases: {todayCases}</p>
                                    <p id="todaydeaths" style={{color:'red'}}> Today's Deaths: {todayDeaths}</p>
                                    <p id="todayrecovered" style={{color:'green'}}> Today Recoveries: {todayRecovered}</p>
                                </div>
                            </div>
                        </div>
                    ))}
   
   </div>
            </div>
        
        


</div>


)
}

export default Data;


