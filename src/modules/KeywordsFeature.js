import React from 'react'


import Options from './Options'

import Checkbox from './Checkbox'
import Keywords from './Keywords'
import Input from './Input'
import Frequency from './Frequency'

import ArticleLinks from './ArticleLinks'

import Article1 from './Articles/Article1'

import { getKeywords } from './Functions'


export default React.createClass({
	
	propTypes(){
		highlightAllCheckedFunction: React.PropTypes.func;
		singleKeywordHighlight:React.PropTypes.func;
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

	render(){
 		return(
			<div>
				<Options
					keywords={this.state.keywords}
					highlightAllCheckedFunction={this.props.highlightAllCheckedFunction}
					ref='checkboxFunctions'
					showFrequencyFunction={this.props.updateFrequencyFunction}
					numberKeywordsFunction={this.props.numberKeywordsFunction}
					 />	
				<Keywords 
					items={this.state.keywords} 
					singleKeywordHighlightFunction={this.props.singleKeywordHighlightFunction}
					showFrequency={this.props.showFrequencyFunction}
					/>
			</div>
		)}
})
	