import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import Field from './Field.js';
import Description from './Description.js';
class InvoiceField extends Component
{
  constructor(props){
    super(props);
    this.state={
      items : [],
      current : {
        name : null,
        rate : null,
        hrs : null,
        total : null,
      },
      total : 0,
    };
  }

  handleEdit(did,event,type)
  {
    var Items= this.state.items;
    var Total=this.state.total;
    for(var i=0;i<Items.length;i++)
    {
      var prev= Items[i];
      if(prev.id==did)
      {
        Total-=prev.total;
        if(type=="name") prev.name= event.target.value;
        else if(type=="rate") prev.rate= event.target.value;
        else if(type=="hrs") prev.hrs= event.target.value;
        else if(type=="total") prev.total= event.target.value;
        prev.total= prev.rate * prev.hrs;
        Total+= prev.total;
        Items[i] = prev;
      }
    }
    this.setState(
    {
      items : Items,
      total : Total
    }
    );
  }

  handleDelete(did)
  {
    var Items= this.state.items;
    var Total = this.state.total;
    for(var i=0;i<Items.length;i++)
    {
      var prev= Items[i];
      if(prev.id==did)
      {
       Total-=prev.total;
       Items.splice(i,1);
       break;
      }
    }
    this.setState(
    {
      items : Items,
      total : Total
    }
    );
  }

  handleChange(type,event)
  {
    var prev=this.state.current;
    var Total = -prev.total;
    if(type=="name") prev.name= event.target.value;
    else if(type=="rate") prev.rate= event.target.value;
    else if(type=="hrs") prev.hrs= event.target.value;
    else if(type=="total") prev.total= event.target.value;
    prev.total= prev.rate * prev.hrs;
    Total += prev.total + this.state.total;
    this.setState({
      current : prev,
      total :  Total
    }
    );
  }

  handleClick()
  {
    var prev= this.state.items;
    var cur= this.state.current;
    var Total= this.state.total - cur.total;
    var newObj ={
      name : cur.name,
      hrs : cur.hrs,
      rate : cur.rate,
      total : cur.total,
      id : Date.now()
    }
    prev=prev.concat(newObj);
    cur.name='';
    cur.hrs='';
    cur.rate='';
    Total += cur.total;
    cur.total='';
    this.setState({
          items : prev,
          current : cur,
          total : Total
        }
    );
  }


  render()
  {
    return (
      <div>
      <Description handleEdit={(a,b,c) => this.handleEdit(a,b,c)} handleDelete={(a) => this.handleDelete(a)} items={this.state.items}/>
       
      <table style={{margin : 0 , padding : 0}}><tr>
       <td><input name='name' onChange= {(event) => this.handleChange("name",event)} value={this.state.current.name}/></td>
       <td><input name='rate' onChange= {(event) => this.handleChange("rate",event)} value={this.state.current.rate}/></td>
       <td><input name='hrs' onChange= {(event) => this.handleChange("hrs",event)} value={this.state.current.hrs}/></td>
       <td><input name='total' onChange= {(event) => this.handleChange("total",event)} value={this.state.current.total}/></td>
       </tr>
       <tr>
       <td> <button onClick={() => this.handleClick()} style={{height : 25 ,width : 172 , padding : 0}} > Add </button ></td>
       <td> <button onClick={this.handleSubmit} style={{height : 25 ,width : 172 , padding : 0}} > Save </button ></td>
       <td> Total : {this.state.total} </td>
       </tr>
       </table>
      </div>

    );
  }
}


export default InvoiceField;

