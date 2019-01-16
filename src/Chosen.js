import React, { Component } from 'react';
import './App.css';

export class Chosen extends Component {

	componentDidMount() {
		if (this.props.type==='choice') {			
			this.props.makeSpellChoiceArray();
		}
	}

	render() {
		let allOptions = this.props.spells.map((val, i) => this.props.selectMaker(val, i, this.props.type));
		
		//have array with level specific strings
		//search the list of spells for a level (based on iteration)
		//when found, use that index to insert the level specific string
		//iterator based on max spell level
		let index;
		let headings=this.props.levelNames;

		for (let j=this.props.highestSpellLevel; j>0;j--) {
			index = this.props.spells.findIndex(function findLevel (element) {return element.level==j});
			console.log(index);
			console.log(headings[j]);
			if (index>=0){
				allOptions.splice(index, 0, <b dangerouslySetInnerHTML={{__html: this.props.levelNames[j]}}/>);
			}
		}

		return (
			<div>				
				<div className="my-custom-select">
					{allOptions}
				</div>				
			</div>
		);
	}
}