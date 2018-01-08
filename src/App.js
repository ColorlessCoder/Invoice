import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InvoiceField from './InvoiceField.js'
//import Todo from './todo.js'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Invoices</h1>
        </header>
        <p className="App-intro">
          Invoice Name
        </p>
        <InvoiceField />
      </div>
    );
  }
}


export default App;
