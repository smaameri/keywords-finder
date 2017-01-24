import React from 'react'

export default React.createClass({
	
	propTypes(){
		highlightAllCheckedFunction: React.PropTypes.func
	},
	
  getInitialState() {          
    return {
	    checked:this.props.checked,
			keys:this.props.keywords,
		};
  },
	
	highlightText(){
		if(this.state.checked === true){
			this.setState({checked: false})
			this.props.highlightAllCheckedFunction(false);
		}
		else{
			this.setState({checked: true});
			this.props.highlightAllCheckedFunction(true);
		}
	
	},
	
	check(checked){
		this.setState({checked:checked});
	},
	
	render(){		
		return(
			<div>
				<form id="myform">
					<div className="checkbox">
					  <label>
							<input
							  type="checkbox"
								id="checkbox"
							  checked={this.state.checked}
								value={this.state.checked}
								onChange={this.highlightText}/>
								Highlight All
					  </label>
					</div>
				</form>
			</div>
		)
	}
})