import React from 'react'

import Checkbox from './Checkbox'
import Input from './Input'
import Frequency from './Frequency'


export default React.createClass({
	
	propTypes(){
		highlightAllCheckedFunction: React.PropTypes.func;
		myFunc2:React.PropTypes.func;
		showFrequencyFunction: React.PropTypes.func;
		numberKeywordsFunction: React.PropTypes.func;
	},
	
	getInitialState(){
		return {
	    checked:this.props.checked,
			keywords:this.props.keywords,
			showFrequency:this.props.showFrequency
		}
	},
	
	//Toggles the 'Show'/'Hide' text in the 'Show 
	// advanced options' link in the Keywords Feature
	optionsTab(){
		var string = document.getElementById('options-tab')
		if(string.innerHTML==='Show')
			string.innerHTML='Hide'
		else string.innerHTML = 'Show'
	},
	
	handleClick(event){
		console.log(event.target.value);
		this.props.myFunc2(event);
	},
	
	checkboxTick(checked){
		this.setState({checked:checked})
		this.refs.checkboxFunctions.check(checked);
		console.log('ref');
	},
	
	render(){
 		return(
			<div>
				<Checkbox
					keywords= {this.state.keywords}
					checked = {this.state.checked}
					highlightAllCheckedFunction={this.props.highlightAllCheckedFunction}
					ref='checkboxFunctions'/>
				<div id="options">
					<a
					 data-toggle="collapse"
					 href="#collapseExample"
					 aria-expanded="false"
					 aria-controls="collapseExample"
					onClick={this.optionsTab}
					>
					 <span id="options-tab">Show</span> advanced options
					</a>
					<div className="collapse" id="collapseExample">
					  <div className="well">
							<Frequency
						 		showFrequencyFunction={this.props.showFrequencyFunction}/>
							<Input
						 		numberKeywordsFunction={this.props.numberKeywordsFunction}/>
					  </div>
					</div>
				</div>
			</div>
		)}
})
	