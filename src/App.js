
import './App.css';
import { Await, useLoaderData, Routes, Route, useParams } from "react-router-dom";

import React, { Component } from 'react';

// import './App.css';
import Permision from './Permision'

import Userbyid from './Userbyid'
import ListAccount from './ListAccount'
import { Link } from 'react-router-dom';



const UserbyidHook = props => {
  const param = useParams()
  
  

  return <Userbyid {...props} params={param}/>
}


class App extends Component {

  constructor(props) {
    super()
    this.state = {

      isLoad: false,
      isHeader: false,
      showModal: true,
      isBody: false,
      width: window.innerWidth,
      height: window.innerWidth,
    }

  }


  render() {

    console.log(this.state.width)


    const { isLoad, isHeader } = this.state
  


      return (

        <Routes>


        <Route path='/' element={<Permision/>}>

       
        </Route>

        <Route path='/user/:id/:biz/:branch' element={<UserbyidHook/>} 

       ></Route>
         <Route path='/list/' element={<ListAccount/>}></Route>
        
        </Routes>
      )
   

    }


  

}

export default App;
