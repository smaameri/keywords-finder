import React from 'react'

export default React.createClass({
	
	propTypes(){
		myFunc: React.PropTypes.func
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
	
	render(){		
		return(
			<div>
				<form id="myform">
					<input type="checkbox" id="checkbox" checked={this.state.checked} value={this.state.checked} onChange={this.highlightText}/> Highlight All
				</form>
			</div>
		)
	}
})