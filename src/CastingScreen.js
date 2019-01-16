import React, { Component } from 'react';
import './App.css';

export class CastingScreen extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		let allButtons = this.props.spellSlots.map((slots, level) => this.props.buttonMaker(slots, level));

		return (
			<div class='container'>
			<div className="no-select">
				<span>Click a spell slot to expend it</span>

				<div className='row spell-slot-container justify-content-center'>
					{allButtons}
				</div>
			</div>
			</div>
		)
	}
}