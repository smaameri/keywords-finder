import React from 'react'

export default React.createClass({
	
	propTypes(){
		showFrequencyFunction: React.PropTypes.func
	},
	
  getInitialState() {          
    return {
	    checked:this.props.checked,
			keys:this.props.keywords,
		
		};
  },
	
	highlightText(){
		if(this.state.checked == true){
			this.setState({checked: false})
			this.props.myFunc(false);
		}
		else{
			this.setState({checked: true});
			this.props.myFunc(true);
		}
	
	},
	
	check(checked){
		console.log('checked state to put');
		console.log(checked);
		this.setState({checked:checked});
	},
	
	handleChange(event){
		console.log(event.target.checked);
		this.props.showFrequencyFunction(event.target.checked);
	},
	
	render(){		
		return(
			<div>
				<form>
				  <div className="checkbox">
				    <label>
							<input
						 		type="checkbox"
						 		id="frequency"
						 		value={this.state.checked}
							  onChange={this.handleChange}/>
								Show keyword frequency
				    </label>
				  </div>
				</form>
			</div>
		)
	}
})