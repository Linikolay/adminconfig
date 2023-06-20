
import './App.css';
import { Await, useLoaderData, Routes, Route } from "react-router-dom";

import React, { Component } from 'react';
import { useMatches } from "react-router-dom";
import './App.css';
import setting from './Setting'
import { Link } from 'react-router-dom';
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiVEVTVDk3NCIsImJyYW5jaCI6IjAwOTc0Iiwicm9sZSI6ItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAINGE0LjQu9C40LDQu9CwIiwic2Vzc2lvbmlkIjoiMTQiLCJleHAiOjE2ODYzNDE0NTQsImlzcyI6IkthcGl0YWxEYm8uU2VydmVyIiwiYXVkIjoiS2FwaXRhbERiby5Vc2VyIn0.-SYf08EIMZAsGan4l7PVso1Mpn6o1pwct-B1_pynxm0"
class Userbyid extends Component {

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
      pravaday: "",
      mainlist: [],
    }
    this.mfo = this.mfo.bind(this);
    this.bus = this.bus.bind(this);
    this.id = this.id.bind(this);
    this.list = this.list.bind(this);
    this.send = this.send.bind(this);
    
    this.sendss = this.sendss.bind(this);
  }
  
  componentDidMount() {
    this.setState({
      id: "",
      bus: "04045399",
      mfo: "00445",
    })
    this.setState({
      idclient: this.props.params.id,
      biz :this.props.params.biz,
      branch : this.props.params.branch,
    })
   
    const idclient = this.props.params.id
    const biz = this.props.params.biz
    const branch = this.props.params.branch
    
    fetch(setting.url + "/api/dictionaries/action-modules", {
      method: 'GET',

      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        "refreshToken": "RSCrhNiwy+R0oSYDlpCzZcA08WOeK6snUXSCXG/H+Oy4awZ/l8SH5K/02RjsU1eryFcALqwTsbQvMT6UQCFL2w=="
      },


    })


      .then(res => res.json())

      .then((data) => {
        console.log(data)
        const guuu = data.result
        console.log(guuu)
        const allprav = []
        for(var gp=0; gp<guuu.length; gp++){
          for(var pp =0; pp<guuu[gp].actions.length; pp++){
            allprav.push(guuu[gp].actions[pp].id)
          }
        }
        this.setState({
          pravaday: allprav
        })
      
        console.log(data)
        if (data.error !=null || data.error != "null") {


          fetch(setting.url + "/api/"+this.state.branch+ "/" +biz+"/users/"+idclient+"/relations", {
            method: 'GET',
      
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
              "refreshToken": "RSCrhNiwy+R0oSYDlpCzZcA08WOeK6snUXSCXG/H+Oy4awZ/l8SH5K/02RjsU1eryFcALqwTsbQvMT6UQCFL2w=="
            },
      
      
          })
      
      
            .then(rest => rest.json())
      
            .then((dataid) => {
              console.log(dataid)
            
    
              const gemo = []
              if(dataid.error == null){
                const myarrr = dataid.result.modules
                for(var gg=0; gg<myarrr.length; gg++){
                  for(var lg =0; lg< myarrr[gg].actions.length; lg++){
                    gemo.push(myarrr[gg].actions[lg].id)
                  }
                }
                this.setState({
                  mainlist: gemo
                })
                if (data.result.length > 0) {

                  const get = data.result
                  for (var i = 0; get.length > i; i++) {
                    get[i].check = false
                    for (var g = 0; get[i].actions.length > g; g++) {
                      get[i].actions[g].check = false
                    }
                  }
                  // console.log(get)
      
                  for (var i = 0; myarrr.length > i; i++) {

                    const pr = myarrr[i].id
      
                    let find = get.findIndex(obj => obj.id === pr)
      
                    console.log(find)
                    get[find].check = true
      
                    for (var g = 0; myarrr[i].actions.length > g; g++) {
                      const br = myarrr[i].actions[g].id
                      let findget = get[find].actions.findIndex(data => data.id === br)
                      console.log(findget)
                      get[find].actions[findget].check = true
                    }
                  }
                  console.log("fdshfkjsdhfkjdshf")
                  this.setState({
                    listPerms: get,
                    isLoad: true,
                  })
                }
              }
            })

         
        }
      })


  }

  sendss(){

  
  // console.log(this.state.pravaday)
  const fdf = {         "roleId": 2,
  "actionIdList":this.state.pravaday
}


  fetch(setting.url + "/api/"+this.state.branch+ "/" +this.state.biz+"/users/"+this.state.idclient+"/relations", {
    method: 'PUT',
    mode: "cors",
    
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
      
    },
    
    body: JSON.stringify({
        "roleId": 1,
        "actionIdList":this.state.pravaday
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
        "Content-Type": "application/json",
        "Authorization": token
      
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
  check = (e) => {



    // console.log(e)
    if (e.target == true) {
      const list = this.state.mainlist
      list.push(e.myid)
      this.setState(
        {
          mainlist: list
        }
      )
    } else {
      const copyListperms = this.state.listPerms[e.idindex].actions[e.myindex]
      console.log(copyListperms)
      const filters = this.state.mainlist.filter(o => o !== copyListperms.id)
      console.log(filters)
      this.setState({
        mainlist: filters
      })


    }

  }
  list() {
    console.log(this.state.mfo)
    fetch('http://localhost:8010/proxy/api/users/' + this.state.mfo + "/" + this.state.bus + "/list?pageNumber=1&pageSize=20", {
      method: 'GET',

      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },


    })


      .then(res => res.json())

      .then((data) => {
        console.log(data)
        this.setState({

        })
      })

  }
  id = (e) => {
    this.setState({
      id: e.target.value
    })
  }
  mfo = (e) => {
    this.setState({
      mfo: e.target.value
    })
  }
  bus = (e) => {
    this.setState({
      bus: e.target.value
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
          {console.log(this.state.listPerms)}
          {console.log(this.state.mainlist)}

          <button className='sendall' onClick={this.sendss}>
          Дать все доступы
          </button>


          <br/>
          <button className='sendall' onClick={this.send}>
          Отправить
          </button>
          <br/>
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
export default Userbyid;
