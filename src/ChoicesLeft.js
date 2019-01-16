import React, { Component } from 'react';
import './App.css';

export class ChoicesLeft extends Component {

	render() {

		let number = parseInt(this.props.numberToPrepare) - parseInt(this.props.numberPrepared);
		console.log(this.props.numberToPrepare);
		console.log(this.props.numberPrepared);

		return (
			<div className='choose'>
				Choose <span className='blue'>{number}</span> more (click to add):
			</div>
		)
	}
}