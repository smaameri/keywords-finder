import React from 'react'
import { Link } from 'react-router'


import Article1 from './Article1'
import Article2 from './Article2'
import Article3 from './Article3'
import Article4 from './Article4'
import Article5 from './Article5'


export default React.createClass({
	
	propTypes(){
		articleFunction: React.PropTypes.func;
		clearCheckboxFunction:React.PropTypes.func;
		loadArticle:React.PropTypes.func;
	},
	
	getInitialState(){
		return{
			article:<Article1 />
		}
	},
		
	handleClick(event){
		var article = event.target.value;
		//this.setState({article:article}, function(){
			//this.props.articleFunction();
		//})
			this.props.loadArticle(article);
	},	
	
	render(){
		return(
			<div>
					{this.state.article}
			</div>
		)
	}
	
})