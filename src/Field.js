import React, { Component } from 'react';
import logo from './logo.svg';
import InvoiceField from './InvoiceField.js';
import './App.css';

class Field extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
      name : props.name,
      text : null,
    };
  }
  render(){
    
    return (<div>
    <input type="text"
    onChange={this.props.onChange.bind(this, this.props.name)} 
    value= {this.props.value}
    />
    </div>);
  }
}

export default Field;