import React, { Component } from 'react';
import './App.css';

export class WisModChooser extends Component {
  	constructor(props) {
	    super(props);
	    this.handleMod = this.handleMod.bind(this);
	}

	//passes value of input to Parent.js changeWisMod function which updats states
	handleMod(e) {
    	this.props.onChange(parseInt(e.target.value));
	}


	render() {

		return (
			<div style={{marginLeft:'auto', marginRight:'auto'}}>

				<div style={{fontSize:16, fontWeight:'bold'}}>Wisdom modifier:</div>
				<input 
					style={{textAlign:'center', marginLeft:'auto', marginRight:'auto', width:75}}
		        	id="wisMod"
		        	type="number"
		        	min="-3"
		        	max="5"
		        	defaultValue={this.props.wisMod} 
		        	onInput = {this.handleMod}/> 
			</div>
		);
	}
}