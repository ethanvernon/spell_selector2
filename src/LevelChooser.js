import React, { Component } from 'react';
import './App.css';

export class LevelChooser extends Component {
  	constructor(props) {
	    super(props);
	    this.handleLevel = this.handleLevel.bind(this);
	}

	//passes input value to Parent.js' changeCleric Level function which updates states
	handleLevel(e) {
    	this.props.onChange(parseInt(e.target.value));
	}


	render() {

		return (
			<div style={{marginLeft:'auto', marginRight:'auto', marginBottom:10}}>
				<div style={{fontSize:16, fontWeight:'bold'}}>Cleric level:</div>
				<input 
					style={{textAlign:'center', marginLeft:'auto', marginRight:'auto', width:75}}
		        	id="clericLevel"
		        	type="number"
		        	min="1"
		        	max="20"
		        	defaultValue={this.props.level} 
		        	onInput = {this.handleLevel}/> 
			</div>
		);
	}
}