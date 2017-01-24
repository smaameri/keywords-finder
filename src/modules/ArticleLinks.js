import React from 'react'

import NavLink from './NavLink'

import Article1 from './Articles/Article1'
import Article2 from './Articles/Article2'
import Article3 from './Articles/Article3'
import Article4 from './Articles/Article4'
import Article5 from './Articles/Article5'

export default React.createClass({
	
	propTypes(){
		loadArticle:React.PropTypes.func;
	},
	
	getInitialState(){
		return{
			article:<Article1 />
		}
	},
	
	handleClick(event){
		var article = event.target.value;
		this.props.loadArticle(article);
	},	
	
	render(){
		return(
			<div className='article'>
				<ul>			
					<li><NavLink to='/Article1'  onClick={this.handleClick} value={<Article1 />}>Article 1</NavLink></li>
					<li><NavLink to='/Article2'  onClick={this.handleClick} value={<Article2 />}>Article 2</NavLink></li>
					<li><NavLink to='/Article3'  onClick={this.handleClick} value={<Article3 />}>Article 3</NavLink></li>
					<li><NavLink to='/Article4'  onClick={this.handleClick} value={<Article4 />}>Article 4</NavLink></li>
					<li><NavLink to='/Article5'  onClick={this.handleClick} value={<Article5 />}>Article 5</NavLink></li>
				</ul>
			</div>
		)
	}
	
})