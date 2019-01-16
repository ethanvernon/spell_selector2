import React, { Component } from 'react';
import {LevelChooser} from './LevelChooser';
import {WisModChooser} from './WisModChooser';
import {PrepareButton} from './PrepareButton';
import {SpellChoosing} from './SpellChoosing';
import 'bootstrap/dist/css/bootstrap.css';
import {Chosen} from './Chosen';
import {Begin} from './Begin';
import {CastingScreen} from './CastingScreen';
import {PreparedSpells} from './PreparedSpells';
import {ChoicesLeft} from './ChoicesLeft';
import {SpellInfo} from './SpellInfo';
import {AllSpells} from './AllSpells';
import {ClericLevels} from './ClericLevels';
import {LifeDomain} from './LifeDomain';
import {BackButton} from './BackButton';

export class Parent extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	spellList: 				[],
	      	spellChoices: 			[],
	      	bonusActionSpells: 		[],
			concentrationSpells: 	[],
			domainSpells: 			[],
	      	chosenSpells: [],
	      	levelNames: 		['Cantrips', '1<sup>st</sup> Level', '2<sup>nd</sup> Level', '3<sup>rd</sup> Level', '4<sup>th</sup> Level', '5<sup>th</sup> Level', 
	      						'6<sup>th</sup> Level', '7<sup>th</sup> Level', '8<sup>th</sup> Level', '9<sup>th</sup> Level'],
	      	activeSpell: {},
	      	clericLevel: 3,
	      	spellSlots: {},
	      	highestSpellLevel: 2,
	      	wisdomModifier: 3,
	      	numberToPrepare: 6,
	      	numberPrepared: 0,
	      	startScreenHide: "",
	      	chooseScreenHide: "hidden",
	      	castingScreenHide: "hidden"
	    };

	    this.changeClericLevel = this.changeClericLevel.bind(this);
	    //this.changeSpellSlots = this.changeSpellSlots.bind(this);
	    this.changeWisMod = this.changeWisMod.bind(this);
	    this.changeNumberToPrepare = this.changeNumberToPrepare.bind(this);
	    this.hideForChoosing = this.hideForChoosing.bind(this);
	    this.updateSpellChoiceNumber = this.updateSpellChoiceNumber.bind(this);
	    //this.convertToBaseName = this.convertToBaseName.bind(this);
	    this.removeChosen = this.removeChosen.bind(this);
	    this.startCasting = this.startCasting.bind(this);
	    this.spellWasCast = this.spellWasCast.bind(this);
	    this.selectMaker = this.selectMaker.bind(this);
	    this.handleClick = this.handleClick.bind(this);
	    this.chooseDomainSpells = this.chooseDomainSpells.bind(this);
	    this.makeSpellChoiceArray = this.makeSpellChoiceArray.bind(this);
	    this.setActiveSpell = this.setActiveSpell.bind(this);
	    this.buttonMaker = this.buttonMaker.bind(this);
	    this.showPrevious = this.showPrevious.bind(this);
	}

	//called by LevelChooser.js whenever cleric level input is changed
	//sets state, and calls functions to update spell slots and number of prepared spells
	changeClericLevel(newLevel) {
		this.setState({
			clericLevel: newLevel
		})

		//this.changeSpellSlots(newLevel);
		this.changeNumberToPrepare(this.state.wisdomModifier, newLevel);
	}

	//called by WisModChooser.js whenever wisdom mod input is changed
	//calls function changeSpellNumber to update number of prepared spells
	changeWisMod (newMod) {
		this.setState({
			wisdomModifier: newMod
		})

		this.changeNumberToPrepare(newMod, this.state.clericLevel);
	}

	//called by changeWisMod and changeClericLevel
	//updates number of prepared spells available
	changeNumberToPrepare(mod, level) {
		let total;

		(mod + level < 1) ? total=1 : total=level+mod;

		console.log(total);

		this.setState({
			numberToPrepare: total
		})
	}

	//called by PrepareButton.js whenever "Prepare Now" button is clicked
	//updates states which apply/remove hidden class from components
	//find array element with matching level value, copies spellcasting value
	hideForChoosing() {

		let level = 0;
		let spellcasting=Object.values(ClericLevels[this.state.clericLevel-1].spellcasting);
		let arr=[];
		console.log(spellcasting);

		for (let i=2; i<spellcasting.length; i++) {
			if (spellcasting[i] > 0) {
				level++;
			}
		}

		console.log(ClericLevels[this.state.clericLevel-1].spellcasting);
		console.log(level);

		arr=Object.values(ClericLevels[this.state.clericLevel-1].spellcasting);

		this.setState({
			spellSlots: arr,
			highestSpellLevel: level,
			startScreenHide: "hidden",
			chooseScreenHide: ""
		});

		this.makeSpellChoiceArray();
		this.chooseDomainSpells();
	}

	showPrevious(prev) {
		//if on choose screen
		if(prev==="home") {
			this.setState({
				chooseScreenHide: 'hidden',
				startScreenHide: '',
				numberPrepared: 0,
				chosenSpells: []
			});
		//if on cast screen
		} else {
			this.setState({
				castingScreenHide: 'hidden',
				chooseScreenHide: '',
				numberPrepared: 0,
				chosenSpells: []
			});
			this.makeSpellChoiceArray();
			this.chooseDomainSpells();
		}
	}

	//adds spell
	chooseDomainSpells() {
		//check LifeDomain array
		//check each element for level acquired value that matches current level
		//push that object to a new array
		//find the matching spells in AllSpells
		//push those to the array
		//auto choose domain spells by copying array to chosenSpells
		let arr=[];
		let domainSpellsArray=[];

		for (let i=0; i<LifeDomain.length; i++) {
			if (LifeDomain[i].level_acquired <= this.state.clericLevel) {
				arr.push(LifeDomain[i]);
			}
		}

		//check each spell in allspells
		//if the name matches a name in arr
		//push it to array
		for (let i=0; i<AllSpells.length; i++) {
			for (let j=0; j<arr.length; j++) {
				if (AllSpells[i].name===arr[j].name) {
					domainSpellsArray.push(AllSpells[i]);
				}
			}
		}

		//sort spells by level...they're already sorted alphabetically
		domainSpellsArray = domainSpellsArray.sort(function(a,b) {
			return a.level - b.level;
		})

		this.setState({
			domainSpells: domainSpellsArray,
			chosenSpells: domainSpellsArray,
			activeSpell: domainSpellsArray[0]
		});

		console.log(domainSpellsArray);
	}

	//makes choices list
	//checks AllSpells for spells that <= level
	//checks matching spells for cleric class
	//checks matching spells for those that aren't life domain
	//pushes matching spells to array for spell choices
	makeSpellChoiceArray() {
		let ignore=0;
		let arr=[];
		let allArr=[];

		console.log(this.state.domainSpells);

		for (let i=0; i<AllSpells.length; i++) {
			if (AllSpells[i].level <= this.state.highestSpellLevel && AllSpells[i].level>0) {
				console.log('matching level');
				for (let j=0;j<AllSpells[i].classes.length; j++) {
					if (AllSpells[i].classes[j].name === "Cleric") {
						console.log('matching class');
						for (let x=0;x<this.state.domainSpells.length; x++) {
							if (AllSpells[i].name === this.state.domainSpells[x].name) {
								ignore = 1;
								console.log('OMG THIS IS A DOMAIN SPELL');
							} 
						}
						if (ignore===0) {
							arr.push(AllSpells[i]);
							allArr.push(AllSpells[i]);
							console.log('spell added');
						} else {
							console.log("I'M IGNORING THIS ONE - " + AllSpells[i].name);
							allArr.push(AllSpells[i]);
							ignore=0;
						}
					}
				}
			}
		}

		console.log(arr);

		arr = arr.sort(function(a,b) {
			return a.level - b.level;
		})

		this.setState({
			spellList: allArr,
			spellChoices: arr
		});
	}


	//called by SpellChoosing.js whenever a spell is clicked
	//increases number of spells prepared by 1
	updateSpellChoiceNumber(spell) {
		let remaining = parseInt(this.state.numberPrepared);
		let arr = JSON.parse(JSON.stringify(this.state.spellChoices));
		let chosenArr = JSON.parse(JSON.stringify(this.state.chosenSpells));
		let index = arr.findIndex(x => x.name==spell);

		//removes the clicked spell from the choices array
		chosenArr.push((arr.splice(index, 1))[0]);

		//sorts chosenSpells alphabetically
		chosenArr.sort(function(a,b) {
			let textA = a.name;
			let textB = b.name;
			return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		});

		//re-sorts chosenSpells by level
		chosenArr.sort(function(a,b) {			
			console.log(a.level + " " + b.level)
			return a.level - b.level;
		});

		remaining++;

		//updates states to reflect remaining number of choices, choicees, and chosen spells	
		this.setState({
			numberPrepared: remaining,
			spellChoices: arr,
			chosenSpells: chosenArr
		});
	}

	//removes spell adds back to choices
	removeChosen(spell) {
		let chosenArr = JSON.parse(JSON.stringify(this.state.chosenSpells));
		let index = chosenArr.findIndex(x => x.name==spell);;    // <-- Not supported in <IE9
		let choicesArr = JSON.parse(JSON.stringify(this.state.spellChoices));
		let choiceNumber = this.state.numberPrepared;

		//removes the clicked spell from the chosen list
		choicesArr.push((chosenArr.splice(index, 1))[0]);

		//sorts spellChoices alphabetically
		choicesArr.sort(function(a,b) {
			let textA = a.name;
			let textB = b.name;
			return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		});

		//re-sorts spellChoices by level
		choicesArr.sort(function(a,b) {			
			console.log(a.level + " " + b.level)
			return a.level - b.level;
		});

		choiceNumber--;

		//updates states to reflect remaining number of choices, choicees, and chosen spells	
	    this.setState({
	    	chosenSpells: chosenArr,
	    	spellChoices: choicesArr,
	    	numberPrepared: choiceNumber
	    });		
	}

	//hides choose spell screen when begin is clicked
	startCasting() {
		console.log("start casting");

		//hides choose screen
		this.setState({
			chooseScreenHide: "hidden",
			castingScreenHide: ""
		})
	}

	//custom select multiple box due to mobile Safari constraints
	selectMaker(val, i, type) {

		console.log(this.state.domainSpells);

  		//check if spell is a domain spell
  		let domain = false;
			for(let i = 0; i < this.state.domainSpells.length; i++) {
			    if (this.state.domainSpells[i].name == val.name) {
			        domain = true;
			        console.log(val.name+' is a domain spell');
			        break;
			    }
			}

		//check if spell is a concentration spell
		let conc = false;
			for(i = 0; i < this.state.spellList.length; i++) {
			    if (this.state.spellList[i].concentration == 'yes' && this.state.spellList[i].name==val.name) {
			        conc = true;
			        break;
			    }
			}

		//check if spell is a bonus action
		let bonus = false;
			for(i = 0; i < this.state.spellList.length; i++) {
			    if (this.state.spellList[i].casting_time == '1 bonus action' && this.state.spellList[i].name==val.name) {
			        bonus = true;
			        break;
			    }
			}

  		return(
  			<div key={val.name} className='selectable' onClick={this.handleClick} val={val.name} data={type} style={{paddingLeft:18, width:'100%'}}>
  			{val.name}
  			{bonus||conc||domain?' (':null}
			{domain?'D':null}
			{bonus?'B':null}
			{conc?'C':null}
			{bonus||conc||domain?')':null}
			</div>
  		)
  	}

  	//handles various instances when a spell is clicked on
  	handleClick(e) {

		//get spell name and source
		let spell=e.currentTarget.getAttribute('val');
		let calledFrom=e.currentTarget.getAttribute('data');

		//if from chosen spells list on prepare page and not a domain spell
		if (!this.state.domainSpells.some(e => e.name === spell) && calledFrom=='chosen') {
			console.log("this is not a domain spell");
			this.removeChosen(spell);
			this.setActiveSpell(spell);
		} else if (this.state.domainSpells.some(e => e.name === spell) && calledFrom=='chosen') {
			console.log("this is a domain spell");
			this.setActiveSpell(spell);
		}

		//if from spell choices on prepare page and still have choices left
		if (this.state.numberPrepared != this.state.numberToPrepare && calledFrom=='choice') {
			console.log("choice");
			this.updateSpellChoiceNumber(spell);
			this.setActiveSpell(spell);
		} else if (this.state.numberPrepared == this.state.numberToPrepare && calledFrom=='choice') {
			console.log("choice");
			console.log("no more choices left");
			this.setActiveSpell(spell);
		}

		//if from prepared spells on casting page
		if (calledFrom=='prep') {
			this.setActiveSpell(spell);
		}
	}

	//updates active spell to last clicked one
	setActiveSpell(spell) {

		let spellData;

		for (let i=0;i<this.state.spellList.length;i++) {
			if (this.state.spellList[i].name===spell) {
				spellData=this.state.spellList[i];
			}
		}

		this.setState({
			activeSpell: spellData
		});
	}

	//makes a button for each spell level
	buttonMaker(slots, level) {

		let levelNames = this.state.levelNames;
		let spellSlots = this.state.spellSlots;

		if (level+1 <= this.state.highestSpellLevel) {
			return(
	  			<div key={"level-"+level+"-slot"} className='col-4 spell-slot text-center' onTouchStart="" onClick={this.spellWasCast} level={level+1}>  			
					<p style={{fontSize:14, weight:'bold', marginBottom:-3}}><b dangerouslySetInnerHTML={{__html: levelNames[level+1]}}/></p>
					<p style={{fontSize:9, weight:'bold', marginBottom:0}}>Spell Slot</p>
					<p style={{fontSize:35, weight:'bold', lineHeight:'1em', marginBottom:0}}>{this.state.spellSlots[level+2]}</p>
					<p style={{fontSize:10, weight:'bold', marginBottom:'.5em'}}>remaining</p>
				</div>
	  		)
		}


		//<b dangerouslySetInnerHTML={{__html: this.props.levelNames[j]}}/>		
		//{levelNames[level+1]}
	}

	//decreases spell slots remaining when clicked
	spellWasCast(e) {
		let level = parseInt(e.currentTarget.getAttribute('level'));
		let spellSlots=this.state.spellSlots;
		
		console.log(spellSlots[2]);

		if (spellSlots[level+1]-1 >= 0) {
			spellSlots[level+1]=spellSlots[level+1]-1;
			console.log("level "+level+ " spell was cast");
		} else {
			console.log("no more level "+level+ " slots left");
		}

		this.setState({
			spellSlots: spellSlots
		})
	}
	
	/*loops through AllSpells.js and makes an array with all Cleric spells
	componentDidMount() {
		let clericSpells = [];

		for (let i=0; i<AllSpells.length; i++) {
			for (let j=0; j<AllSpells[i].classes.length; j++) {
				if (AllSpells[i].classes[j].name==='Cleric') {
					clericSpells.push(AllSpells[i]);
				}
			}
		}

		//console.log(clericSpells);
		this.getSpellsByLevel(clericSpells, 1);
	}

	loops through an array of spells, and makes array of only certain level
	getSpellsByLevel(clericSpells, level) {
		let list = [];

		for (let i=0; i<clericSpells.length; i++) {
			if (clericSpells[i].level===level) {
				list.push(clericSpells[i]);
			}
		}

		//console.log(list);
		this.getSpellNames(list);
	}

	//takes a list of spells and makes an array with just the names
	getSpellNames(list) {
		let names=[];

		for (let i=0;i<list.length;i++) {
			names.push(list[i].name);
		}

		console.log(names);
	}

	//takes spell name gets spell url from API
	getSpellUrl(name) {
		let Http = new XMLHttpRequest();
		let url='http://www.dnd5eapi.co/api/spells/?name='+ name;
		Http.open("GET", url);
		Http.send();
		Http.onreadystatechange=(e)=>{
			this.getSpellData(JSON.parse(Http.responseText).results[0].url);
		}
	}

	//takes spell URL and gets data from API, saves to an object
	getSpellData(url) {
		let Http = new XMLHttpRequest();
		let data={};
		Http.open("GET", url);
		Http.send();
		Http.onreadystatechange=(e)=>{
			console.log(JSON.parse(Http.responseText).name);		
			console.log(JSON.parse(Http.responseText).casting_time);
			console.log(JSON.parse(Http.responseText).range);
			console.log(JSON.parse(Http.responseText).components);
			console.log(JSON.parse(Http.responseText).concentration);
			console.log(JSON.parse(Http.responseText).duration;
			console.log(JSON.parse(Http.responseText).desc[0]);			
			console.log(JSON.parse(Http.responseText).higher_level);
			console.log(JSON.parse(Http.responseText));

			data = {
				name: JSON.parse(Http.responseText).name,
				level: JSON.parse(Http.responseText).level,
				school: JSON.parse(Http.responseText).school.name,
				casting_time: JSON.parse(Http.responseText).casting_time,
				range: JSON.parse(Http.responseText).range,
				components: JSON.parse(Http.responseText).components,
				concentration: JSON.parse(Http.responseText).concentration,
				duration: JSON.parse(Http.responseText).duration,
				desc: JSON.parse(Http.responseText).desc[0].replace(/â€™/g, "'"),
				high_level: JSON.parse(Http.responseText).higher_level
			}

		this.setActiveSpell(data);
		}		
	}*/


	render() {

		return (
			<div>
				{ (this.state.chooseScreenHide==='' || this.state.castingScreenHide==='' ) &&
						<BackButton
							handleClick={this.showPrevious}
							chooseScreenHide={this.state.chooseScreenHide}/>
				}
				<h2 className='my-title'>Spell Selector</h2>
				
				

				{ this.state.startScreenHide==='' &&
					<div style={{textAlign:'center'}}>
						<LevelChooser
							onChange = {this.changeClericLevel}
							level={this.state.clericLevel}/>

						<WisModChooser
							onChange = {this.changeWisMod}
							wisMod={this.state.wisdomModifier}/>

						<PrepareButton
							handleClick = {this.hideForChoosing}/>					
					</div>
				}

				{ this.state.chooseScreenHide==='' &&
					<div style={{textAlign:'center'}}>

						<Begin 
							handleClick={this.startCasting}/>

						<b><span className="choose">Chosen (click to remove):</span></b><br/>
						<Chosen 
							spells={this.state.chosenSpells}
							highestSpellLevel = {this.state.highestSpellLevel}
							selectMaker={this.selectMaker}
							levelNames={this.state.levelNames}
							type='chosen'/>						

						<ChoicesLeft 
							numberToPrepare = {this.state.numberToPrepare}
							numberPrepared = {this.state.numberPrepared}/>
						
						<Chosen
							spells = {this.state.spellChoices}
							level={this.state.clericLevel}
							selectMaker={this.selectMaker}
							levelNames={this.state.levelNames}
							highestSpellLevel = {this.state.highestSpellLevel}
							makeSpellChoiceArray = {this.makeSpellChoiceArray}
							type='choice'/>
						
						<SpellInfo 
							spell={this.state.activeSpell}
							spells={this.state.chosenSpells}
							setActiveSpell={this.setActiveSpell}/>
					</div>
				}

				{ this.state.castingScreenHide==='' &&
					<div style={{textAlign:'center'}}>
						<CastingScreen 
							buttonMaker={this.buttonMaker}
							spellSlots={this.state.spellSlots}/>

						<div style={{marginTop:10}}><b><span className="choose">Prepared Spells (click for description):</span></b><br/></div>
						<Chosen 
							spells={this.state.chosenSpells}
							highestSpellLevel = {this.state.highestSpellLevel}
							selectMaker={this.selectMaker}
							levelNames={this.state.levelNames}
							type='prep'/>

						<SpellInfo
							spell={this.state.activeSpell}
							spells={this.state.chosenSpells}
							setActiveSpell={this.setActiveSpell}/>
					</div>
				}


			</div>
			)
	}
}