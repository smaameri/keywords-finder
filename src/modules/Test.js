import React from 'react'

export default React.createClass({
	
	propTypes(){
		testFunction: React.PropTypes.func
	},
	
	test(){
		this.props.testFunction();
		console.log('test 1')
	},

	render(){
		return(
			<div>
			<button onClick={this.test}>Test</button>
			</div>
		)
	}
	
})