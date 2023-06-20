
import './App.css';
import { Await, useLoaderData, Routes, Route } from "react-router-dom";

import React, { Component } from 'react';

// import './App.css';
import setting from './Setting'
import { Link } from 'react-router-dom';
class Permision extends Component {

  constructor(props) {
    super()
    this.state = {

        mainLoad: false,
      id: "",
      bus: "04045399",
      mfo:"00445",

    }
    this.mfo = this.mfo.bind(this);
    this.bus = this.bus.bind(this);
    this.id = this.id.bind(this);
    this.list = this.list.bind(this);
  }
  componentDidMount(){
    this.setState({
        id: "",
        bus: "04045399",
        mfo:"00445",   
    })
    
  }
list(){
    console.log(this.state.mfo)
    fetch(setting.url+'/api/users/'+ this.state.mfo+ "/" + this.state.bus + "/list?pageNumber=1&pageSize=20", {
            method: 'GET',

            mode: "cors",
            headers: {
         
            },
         

        })


            .then(res => res.json())

            .then((data) => {
                console.log(data)
                this.setState({
                
                })
            })

}
  id=(e) =>{
this.setState({
    id: e.target.value
})
  }
  mfo=(e)=>{
    this.setState({
        mfo: e.target.value
    })
  }
  bus=(e)=>{
    this.setState({
        bus: e.target.value
    })
  }
  render() {
      return (
        <div>
           <div>
           <input onChange={this.id} value={this.state.id} placeholder='id пользователя'>
            </input>
            <input onChange={this.bus} value={this.state.bus} placeholder='Бизнес'>
            </input>

              <input onChange={this.mfo} value={this.state.mfo} placeholder='мфо'>
            </input>
             
           </div>
           {(() => {
            if(this.state.id.length>0&& this.state.bus.length>0 && this.state.mfo.length> 0){
                return(
                    <button onClick={this.list}>Отправить</button>
                )
            }
            if(this.state.mainLoad == true){
                return(
                    <p>eee</p>
                )
            }
            })()}
        </div>
      )
    }
     



}

export default Permision;
