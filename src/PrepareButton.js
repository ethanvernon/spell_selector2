import React, { Component } from 'react';
import './App.css';

export class PrepareButton extends Component {
  	constructor(props) {
	    super(props);
	    this.handleClick = this.handleClick.bind(this);
	}

	//calls Parent.js' hideForChoosing function which updates state to hide this page and show next one
	handleClick() {
		this.props.handleClick();
	}


	render() {
		return (
			<button onClick={this.handleClick} style={{marginTop:20}}>Prepare now</button>
		)
	}

}