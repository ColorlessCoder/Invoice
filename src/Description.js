import React, { Component } from 'react';
import logo from './logo.svg';
import InvoiceField from './InvoiceField.js';
import './App.css';


class Description extends Component{
  render(){
    var items=this.props.items;
    const todoList = (item, index) =>
          {
          console.log(item);
        return (
        <tr>
        <td><input value={item.name} onChange={(event) => this.props.handleEdit(item.id,event,"name")} /></td>
        <td><input value={item.rate} onChange={(event) => this.props.handleEdit(item.id,event,"rate")} /></td>
        <td><input value={item.hrs} onChange={(event) => this.props.handleEdit(item.id,event,"hrs")} /></td>
        <td><input value={item.total} onChange={(event) => this.props.handleEdit(item.id,event,"total")} /></td>
        <td><button onClick={() => this.props.handleDelete(item.id)} style={{color : 'red'}}> X </button></td>
        </tr>
       ); }
    return items.map(todoList);
  }
}

export default Description;