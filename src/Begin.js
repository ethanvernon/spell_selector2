import React, { Component } from 'react';
import './App.css';

export class Begin extends Component {

	render() {
		return (
			<div className='center' style={{marginBottom:15}}>
				<button onClick={this.props.handleClick}>
				Begin Adventuring
				</button>
			</div>
		)
	}
}