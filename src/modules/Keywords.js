import React from 'react'

export default React.createClass({
	
	propTypes(){
		highlightFunction:React.PropTypes.func
	},
	
	getInitialState(){
		return {
		}
	},
	
	handleClick(event){
		console.log(event.target.value);
		this.props.highlightFunction(event);
	},
	
	render(){
 		return(
			<div id="keywords">
				{
					this.props.items.map(function(item){
						return (
						  <button 
								className={"keywords btn btn-default btn-xs keyword-" + item[0]}
		  					id={'keyword-' + item[0]}
								key={item[0]}
								value={false}
								onClick={this.handleClick} > 
							</button>)
					}, this)
				}
			</div>
		)}
})
	