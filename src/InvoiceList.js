import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import Field from './Field.js';
import Description from './Description.js';
import InvoiceField from './InvoiceField.js';

class InvoiceList extends Component
{
	constructor(props)
	{
		super(props);
		this.state={
			invoices : []
		}


		// fetch('/api/users/{"id" : "'+this.props.id+'" , "name": "shakil"}').then(res => res.json()).then(res => {
		// 	console.log("hi",res);
		// 	this.setState(
		// 	{
		// 		id : res[0].id,
		// 		username : res[0].username,
		// 	}
		// 	);
		// });

		fetch('/api/invoices/').then(res => res.json()).then(res => {
			console.log("hi",res);
			this.setState(
			{
				invoices : res,
				name : '',
			}
			);
		});
	}
	handleChange(e)
	{
		this.setState({
			name: e.target.value
		});
		console.log(this.state.name);
	}
	render()
	{
		console.log(this.props);
		return(
			<div> 
			<table border="2" style={{margin: "auto"}}>
			<tr>
			<th> Invoice Name </th>
			<th > Total Amount </th>
			</tr>
			{
				this.state.invoices.map(item => (
	          	<tr>
	          	<td>{item.name}</td>
	          	<td>{item.total}</td>
	          	<td><button 
	          	onClick={()=> this.props.handleEdit(item.id,item.name,item.total)} >
	          	Edit</button></td>
	          	</tr>
	        	))
        	}
        	</table>
        	<br/>
        	<input placeHolder="Invoice Name" 
        	onChange={(e)=>this.handleChange(e)}/>
        	<button onClick={()=> this.props.handleAdd(this.state.name)}> Add </button>
			</div>
		);
	}
}

export default InvoiceList;