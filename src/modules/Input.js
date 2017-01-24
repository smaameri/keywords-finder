import React from 'react'

export default React.createClass({
	
	propTypes(){
		numberKeywordsFunction: React.PropTypes.func
	},
	
  getInitialState() {          
    return {
	    checked:this.props.checked,
			keys:this.props.keywords,
			lastValue:''
		
		};
  },
	
		
	handleChange(event){
		console.log(event.target.value);
	
		var value = event.target.value
    var regex=/^[0-9]+$/;
    if (!value.match(regex) && (value !== "")){
        console.log("Must input numbers");
				event.target.value = this.state.lastValue
				return
    }
		
		if(value > 20)
			event.target.value = 20;
		
		this.setState({lastValue:event.target.value})
		
		this.props.numberKeywordsFunction(event.target.value);
		
	},
	
	render(){		
		return(
			<div >
				<form
				 className="form-inline"
				 id='frequencyInput'
				  >
				  <div className="form-group">
				    <label>Number of results</label>
				    <input
				 			type="text"
				 			id="formInput"
			 				className="form-control"
			 				onChange={this.handleChange}  />
		 
				  </div>
				</form>
			</div>
		)
	}
})