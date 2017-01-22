import React from 'react'

export default React.createClass({
	
	propTypes(){
		myFunc2:React.PropTypes.func
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
							return  <button 
												className={"btn btn-default btn-xs keyword-" + item}
						  					id={'keyword-' + item}
												key={item}
												value={false}
												onClick={this.handleClick}
											>
												{item}
											</button>
						}, this)
					}
			</div>
		)}
})
	