import React, { Component } from 'react';
import './App.css';

export class PreparedSpells extends Component {

	render() {
		
		let allOptions = this.props.chosenSpells.map((val, i) => this.props.selectMaker(val, i, 'chosen'));

		return (
			<div className="prep-label">
				Prepared Spells (click for description):<br/>


				<div className="my-custom-select">
					<b>Level One</b>
					{this.props.levelOneSpells.map((val, i) => this.props.selectMaker(val, i, 'prep'))}

					{this.props.level > 2 &&
						<div>
						<b>Level Two</b>
						{this.props.levelTwoSpells.map((val, i) => this.props.selectMaker(val, i, 'prep'))}
						</div>
					}
				</div>
			</div>
		)
	}
}