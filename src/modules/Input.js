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
	
	componentDidMount(){
		var inputElement = document.getElementById('formInput');
		inputElement.value='10';
	},
		
	handleChange(event){
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
	
	handleKeyDown(event){
		console.log(event.keyCode);
    if (event.keyCode === 10 || event.keyCode === 13){
        event.preventDefault();
				event.target.blur();
			}
	},
	
	handleBlur(event){
		console.log('blur')
		console.log(event.target.value);
		var value = event.target.value
		if(value === "" || value == '0'){
			event.target.value=10;
			this.setState({lastValue:event.target.value})
			this.props.numberKeywordsFunction(event.target.value);
		}
		if(value == '0'){
			event.target.value=1;
			this.setState({lastValue:event.target.value})
			this.props.numberKeywordsFunction(event.target.value);
		}
		
	},
	
	render(){		
		return(
			<div >
				<form
				 className="form-inline"
				 id='frequencyInput'			
				  >
				  <div className="form-group">
				    <input
				 			type="text"
				 			id="formInput"
			 				className="form-control"
			 				onChange={this.handleChange}
							onKeyDown={this.handleKeyDown}
							onBlur={this.handleBlur}
							  />
				    <label>Number of results</label>
		 
				  </div>
				</form>
			</div>
		)
	}
})