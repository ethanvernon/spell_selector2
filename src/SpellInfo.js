import React, { Component } from 'react';
import './App.css';

export class SpellInfo extends Component {

	//resets slide position on update
	componentDidUpdate() {
		document.getElementById('spell-info-box').scrollTop = 0;
	}

	render() {

		return (

		<div style={{marginTop:20}}><b><span className="choose">Spell description:</span></b>
		<div id='spell-info-box' className='spell-info-box'>			
			<b style={{fontSize:26, letterSpacing:1, lineHeight:'1em'}}>{this.props.spell.name}</b><br/>
			<i>Level {this.props.spell.level} {this.props.spell.school.name}</i><br/>
			<b>Casting Time:</b> {this.props.spell.casting_time}<br/>
			<b>Range:</b> {this.props.spell.range}<br/>
			<b>Components:</b> {this.props.spell.components}<br/>
			<b>Duration:</b> 	{this.props.spell.concentration==='yes'?'Concentration, ':null}
								{this.props.spell.concentration==='yes'?this.props.spell.duration.toLowerCase():this.props.spell.duration}<br/><br/>

			{this.props.spell.desc[0].replace(/â€™/g, "'")}<br/><br/>

			<b>Higher level:</b> {this.props.spell.higher_level?this.props.spell.higher_level[0]:'None'}<br/><br/>


		</div></div>
		);
	}

}