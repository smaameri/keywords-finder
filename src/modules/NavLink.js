import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
	render(){
		return(
			<div className='navLink'>
				<Link {...this.props} activeClassName="active"/>
			</div>
		)
	}
})