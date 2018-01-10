import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import Field from './Field.js';
import Description from './Description.js';
import InvoiceField from './InvoiceField.js';
import InvoiceList from './InvoiceList.js';

class InvoiceHolder extends Component
{
	constructor(props)
	{
		super(props);
		this.state=(
		{
			List : true,
			Invoice_id : -1,
			Invoice_name : '',
			Invoice_total : 0
		}
		);
	}
	handleClick()
	{
		var did=this.state.id;
		did^=1;
		this.setState({id : did , sup : 0});
	}
	handleAdd(text)
	{
		console.log(text);
		if(text == '') return;
		var pid=Date.now();
		fetch('/api/invoices/add/{"id" : "' 
			+pid+'" , "name" : "'+text+'"}').then(res => res.json()).then(res => {
			console.log("hi",res);
		});

		this.setState({
			List : false,
			Invoice_id : pid,
			Invoice_name : text,
			Invoice_total: 0
		});
	}
	handleEdit(id,name,total)
	{
		this.setState({
			List : false,
			Invoice_id : id,
			Invoice_name : name,
			Invoice_total : total,
		})
		console.log("hi I am edit : ",id,name,total);
	}
	handleBack()
	{
		this.setState({
			List : true,
			Invoice_id : -1,
		})
	}
	handleDelete(id)
	{
		fetch('/api/invoices/delete/'+id).then(res => res.json()).then(res => {
			console.log("hi",res);
		});
		this.setState({
			List : true,
			Invoice_id : -1,
		});
	}
	genList()
	{
		return (	
			<div> <InvoiceList 
			handleAdd={(text)=>this.handleAdd(text)} 
			handleEdit={(id,b,c)=>this.handleEdit(id,b,c)} />
			</div>
		);
	}
	genInvoice()
	{
		return (	
			<div> <InvoiceField 
			handleBack = {()=>this.handleBack()} 
			handleDelete = {(a)=>this.handleDelete(a)} 
			invoice_id = {this.state.Invoice_id}
			invoice_name = {this.state.Invoice_name}
			invoice_total = {this.state.Invoice_total}
			/>
			</div>
		);
	}
	render()
	{
		console.log(this.state);

		const Fields=(	
			<div> Fields </div>
		);
		if(this.state.List == true) return this.genList();
		else return this.genInvoice();
	}
}

export default InvoiceHolder;