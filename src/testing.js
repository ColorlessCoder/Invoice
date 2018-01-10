import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Testing extends Component
{
	componentDidMount()
	{
		// nothing :p	
	}
	render()
	{
		fetch('/api/users/delete/44').then(res => res.json()).then(res => {
			console.log(res);
		});
		
		return (
			<div>
				testing thing
			</div>
		);
	}

}


export default Testing;