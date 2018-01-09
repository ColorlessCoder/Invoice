import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Testing extends Component
{
componentDidMount()
{
	
	console.log(fetch('/api/users/0'));
}
render()
{

	//this.componentDidMount();
	return (
		<div>

		</div>
	);
}

}


export default Testing;