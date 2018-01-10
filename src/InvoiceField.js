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
      invoice_name: ''
    };
    fetch('/api/items/'+this.props.invoice_id).then(res => res.json()).then(res => {
      console.log("hi",res);
      this.setState(
      {
        items : res,
        invoice_name : this.props.invoice_name,
        total : this.props.invoice_total
      }
      );
    });
  }
  updateInvoice()
  {
    var obj = {
      id : this.props.invoice_id,
      name : this.state.invoice_name,
      total: this.state.total
    };
    
    fetch('/api/invoices/edit/'+JSON.stringify(obj)).then(res => res.json()).then(res => {
    });
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
        fetch('/api/items/edit/'+JSON.stringify(Items[i])).then(res => res.json()).then(res => {
        });
        break;
      }
    }
    this.setState(
    {
      items : Items,
      total : Total
    }
    );
    this.updateInvoice();
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
       fetch('/api/items/delete/'+did).then(res => res.json()).then(res => {
        });
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
    this.updateInvoice();
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
    };
    var newObj2 ={
      name : cur.name,
      invoice_id : this.props.invoice_id,
      hrs : cur.hrs,
      rate : cur.rate,
      total : cur.total,
      id : Date.now()
    }
    prev=prev.concat(newObj);
    fetch('/api/items/add/'+JSON.stringify(newObj2)).then(res => res.json()).then(res => {
        });
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
    this.updateInvoice();
  }


  render()
  {
    console.log(this.state);
    return (
      <div>
      <h2>{this.state.invoice_name}</h2>
      <table>
      <tr>
      <th>Product Name</th>
      <th>Rate/hr</th>
      <th>Hours</th>
      <th>Total</th>
      <th>  </th>
      </tr>
      <Description handleEdit={(a,b,c) => this.handleEdit(a,b,c)} handleDelete={(a) => this.handleDelete(a)} items={this.state.items}/>
       
      <tr>
       <td><input placeholder='Product Name' name='name' onChange= {(event) => this.handleChange("name",event)} value={this.state.current.name}/></td>
       <td><input placeholder='Rate' name='rate' onChange= {(event) => this.handleChange("rate",event)} value={this.state.current.rate}/></td>
       <td><input placeholder='Hours' name='hrs' onChange= {(event) => this.handleChange("hrs",event)} value={this.state.current.hrs}/></td>
       <td><input placeholder='Total' name='total' onChange= {(event) => this.handleChange("total",event)} value={this.state.current.total}/></td>
       <td> <button onClick={() => this.handleClick()}  style={{background: 'green', color: 'white'}}> Add </button ></td>
       </tr>
       <tr>
       <td> <button onClick={this.props.handleBack} style={{background: 'Blue', color: 'white'}} > Invoice List </button ></td>
       <td> <button onClick={()=>this.props.handleDelete(this.props.invoice_id)} style={{background: 'red', color: 'white'}} > Delete </button ></td>
       <td></td>
       <td> Total : {this.state.total} </td>
       <td></td>
       </tr>
       </table>
      </div>

    );
  }
}


export default InvoiceField;

