import React from 'react'

export default React.createClass({
	
	propTypes(){
		myFunc2:React.PropTypes.func
	},
	
	getInitialState(){
		return {
			showFrequency:this.props.showFrequency
		}
	},
	
	handleClick(event){
		console.log(event.target.value);
		this.props.myFunc2(event);
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
	