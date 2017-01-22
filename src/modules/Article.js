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
	
	clearCheckbox(){
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
			<div className='article'>
				<ul onClick={this.clearCheckbox}>			
					<li><a onClick={this.handleClick} value={<Article1 />}>Article 1</a></li>
					<li><a onClick={this.handleClick} value={<Article2 />}>Article 2</a></li>
					<li><a onClick={this.handleClick} value={<Article3 />}>Article 3</a></li>
					<li><a onClick={this.handleClick} value={<Article4 />}>Article 4</a></li>
					<li><a onClick={this.handleClick} value={<Article5 />}>Article 5</a></li>
				</ul>
			</div>
		)
	}
	
})