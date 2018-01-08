import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class List extends Component
{
  render()
  {
    const items=this.props.items;
    const todoList = (item, index) =>
          {
          console.log(item);
        return (
        <li>
          <input value={item.text} onChange={(event) => this.props.handleEdit(item.id,"text",event)} />
          <input value={item.date} onChange={(event) => this.props.handleEdit(item.id,"date",event)}/>
          <button onClick={()=> this.props.onClick(item.id)} > X </button>
        </li>
       ); }
    return (
      <ul>
      {items.map(todoList)}
      </ul>
    );
  }
}


export default List;


