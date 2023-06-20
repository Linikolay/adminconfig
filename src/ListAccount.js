
import './App.css';
import { Await, useLoaderData, Routes, Route } from "react-router-dom";

import React, { Component } from 'react';
import { useMatches } from "react-router-dom";
import './App.css';
import setting from './Setting'
import { Link } from 'react-router-dom';

class ListAccount extends Component {

  constructor(props) {
    super()
    this.state = {

      mainLoad: false,
      id: "",
      bus: "04045399",
      mfo: "00445",
      isLoad: false,
      idclient:"",
      branch: "",
      biz:"",
      mainlist: [],
    }
    this.mfo = this.mfo.bind(this);
    this.bus = this.bus.bind(this);
    this.id = this.id.bind(this);
    this.list = this.list.bind(this);
    this.send = this.send.bind(this);
    
  }
  
  componentDidMount() {
   

  }
  send(){
   
    console.log(this.state.branch)
    const fdf = {         "roleId": 2,
    "actionIdList":this.state.mainlist
  }
  console.log(fdf)
    fetch(setting.url + "/api/"+this.state.branch+ "/" +this.state.biz+"/users/"+this.state.idclient+"/relations", {
      method: 'PUT',

      mode: "cors",
      
      headers: {
        "Content-Type": "application/json"
      },
      
      body: JSON.stringify({

        
          "roleId": 2,
          "actionIdList":this.state.mainlist
    })

    })


      .then(rest => rest.json())

      .then((dataid) => {
        console.log(dataid)
        if(dataid.error == null){
          window.location.reload(true)
        }
      })
  }
  
  render() {
    const { isLoad, listPerms } = this.state
    if (!isLoad) {
      return (
        <p>Пусто</p>
      )
    } else {
      return (
        <div>
         
          {
            listPerms.map((data, index) =>
              <div key={index}>
                {data.name} (key = {data.key})
                <div className='myPermition'>
                  {
                    data.actions.map((action, myind) =>
                      <div key={action.key} name={action.name}>
                        <label>
                          <input
                            value={action.id}
                            defaultChecked={action.check}
                            onChange={(e) => {
                              this.check({
                                id: data.id,
                                idindex: index,
                                myindex: myind,
                                myid: action.id,
                                target: e.target.checked
                              });
                            }}
                            type="checkbox" />
                          {action.name} (key = {action.key})
                        </label>
                      </div>
                    )}

                </div>
              </div>
            )
          }
          <button onClick={this.send}>
          Отправить
          </button>
        </div>
      )
    }

  }
}
export default ListAccount;
