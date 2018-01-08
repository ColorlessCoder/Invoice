import React, { Component } from 'react';
import logo from './logo.svg';
import List from './List.js';
import './App.css';


class Todo extends Component
{
  constructor(props){
    super(props);
    this.state={
      items : [],
      date : null,
      text : null,
    };
  }
  handleChange(type,event)
  { 
    if(type == "text"){
        this.setState({
              text : event.target.value}
        );}
    else{
        this.setState(
          {date : event.target.value}
        );}
    console.log("here",type, this.state);
  }
  handleEdit(did,type,event)
  { 
    var prev = this.state.items;
    for(var i=0;i<prev.length;i++)
      if(prev[i].id==did)
    {
        if(type == "text") prev[i].text=event.target.value;
        else prev[i].date=event.target.value;
    }
    this.setState(
    {
      items : prev
    }
    );
    console.log("here",type, this.state);
  }
  handleClick( event)
  {
    var prev = this.state.items;
    const item={
      text : this.state.text,
      date : this.state.date,
      id : Date.now()
    }
    prev=prev.concat(item);
    this.setState({
      items : prev,
      text : '',
      date : '',
    }
    );
  }
  handleDelete(did)
  {
    console.log(did,this.state.items);
    var prev= this.state.items;
    for(var i=0;i<prev.length;i++)
      if(prev[i].id == did)
        prev.splice(i,1);
    this.setState(
    {
      items : prev
    }
    );
  }
  render()
  {
    return (
      <div>
      <List onClick={(id) => this.handleDelete(id)} items = {this.state.items}  handleEdit={(a,b,c) => this.handleEdit(a,b,c)}/>
      <input name = "Work" onChange = {(event) => this.handleChange("text",event)} value= {this.state.text}/>
      <input name = "Date" onChange = {(event) => this.handleChange("date",event)} value= {this.state.date}/>
      <button onClick = {(event) => this.handleClick(event)}> Add </button>
      </div>
    );
  }
}


export default Todo;

