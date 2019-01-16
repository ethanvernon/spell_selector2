import React, { Component } from 'react';
import './App.css';

export class BackButton extends Component {
  	constructor(props) {
	    super(props);
	    this.handleClick = this.handleClick.bind(this);
	}

	//calls Parent.js' goBack function which updates state to hide this page and show previous one
	handleClick() {
		if(this.props.chooseScreenHide==='') {
			this.props.handleClick('home');
		} else {
			this.props.handleClick('choose');
		}
	}


	render() {

		return (
			<div className="back-button no-select" onClick={this.handleClick}>
				Home
			</div>
		);
	}
}