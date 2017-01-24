import React from 'react'
import Mark from 'mark.js'

import Checkbox from './Checkbox'
import Keywords from './Keywords'
import Input from './Input'
import Frequency from './Frequency'



import ArticleLink from './ArticleLink'

import Article1 from './Article1'

import { getKeywords } from './Functions'

export default React.createClass({
	
	getInitialState: function() {
	    return {
				keywords: [],
				keywordsRaw:[],
				cutOff:10,
				markInstance:'',
				article:'1',
				checked:false,
				orange:'#fbba00',
				display:<Article1 />,
				showFrequency:false,
				
			};
	  },                                               
	
	  componentDidMount(){
			
      console.log("component did mount");
			var text = document.getElementById('text').textContent;
			this.keywordTags();
			//set states after page load
			this.setState({markInstance:new Mark(document.querySelector(".context"))});			
	  },
		
		componentDidUpdate(){
			console.log('root updated');
		},

		keywordTags(){
			console.log('article');
			var text = document.getElementById('text').textContent;
			var keywords_frequencies = getKeywords(text, this.state.cutOff);
			keywords_frequencies=keywords_frequencies.slice(0, 19);
			console.log('keywords_frequencies');
			console.log(keywords_frequencies);
			
			var keywords = [];
			
			console.log('boo')
			for(var i=0;i<keywords_frequencies.length;i++){
				keywords[i] = keywords_frequencies[i][0];
				console.log(keywords_frequencies[i][0])
			}
			
			console.log('keywords')
			console.log(keywords);
			
			this.setState({keywordsRaw:keywords_frequencies}, function(){
				this.setState({keywords:keywords_frequencies.slice(0,this.state.cutOff)}, function(){
					this.clearCheckbox();
					this.showFrequency(this.state.showFrequency)
				});
			});
	},
	
	numberKeywords(value){
		var keywords = this.state.keywordsRaw.slice(0, value);
		this.setState({cutOff:value}, function(){
			this.setState({keywords:keywords}, function(){
			 	var instance = this.state.markInstance;
				instance.unmark();
				this.highlightAllChecked(this.state.checked);
				this.showFrequency(this.state.showFrequency);
			})
		})
	},
	
	updateFrequency(checked){
		this.setState({showFrequency:checked});
		this.showFrequency(checked);
	},
	
	showFrequency(checked){
		var frequencyElements = document.getElementsByClassName('frequency');
		var keywords = document.getElementsByClassName('keywords');
		console.log(keywords[0].childNodes[6]);
		var display, i
		if(checked){
			for(var i=0; i < keywords.length; i++){
				console.log(this.state.keywords[i])
				keywords[i].innerHTML = this.state.keywords[i][0] + " | " + this.state.keywords[i][1]
				//keywords[i].childNodes[6].style.display=display;
			}}
			else{
				for(var i=0; i < keywords.length; i++){
					console.log(this.state.keywords[i])
					keywords[i].innerHTML = this.state.keywords[i][0] 
					//keywords[i].childNodes[6].style.display=display;
				
			}}			
	},
	 	 
	 singleKeywordHighlight(e){
		 var element = e.target;
		 var keyword = element.id.substring(8);
		 var options = {
			 "className":"highlighted-" + keyword,
		 	 "accuracy":{
				 "value":'exactly',
				 "limiters": [",", ".","°","(", ")"]}};
		 
		 if(element.value == 'false'){
			 this.buttonElementUpdate(element, true, this.state.orange)				 
			 this.state.markInstance.mark(keyword, options);}
		 else{
			 this.buttonElementUpdate(element, false, 'white')				 
			 this.state.markInstance.unmark(options);}
			 
			 this.updateCheckbox();
	 },
	
	 updateCheckbox(){
		 var keywords = document.getElementById('keywords').childNodes;
		 var checkbox = document.getElementById('checkbox');
		 var initialValue = keywords[0].value;
		 function allValuesSame(){
			 var allSame = true
			 keywords.forEach(function(keyword){
				 if(keyword.value !== initialValue){
					 allSame = false}
				 })
			return allSame
	 	};
		var equal = allValuesSame();
		if(equal){
			console.log('All values equal')
			console.log(initialValue);
			if(initialValue == 'false'){
				this.refs.checkboxFunctions.check(false);}
			else{this.refs.checkboxFunctions.check(true)}
		}
	 },
	
	 highlightAllChecked(checked){
		 this.highlightText(checked);
		 if(checked){this.highlightKeywords(true, this.state.orange);}
		 else{this.highlightKeywords(false, 'white');}		 
	},
	
	highlightText(checked){
		this.setState({checked:checked});
	 	var instance = this.state.markInstance;
	 	if(checked){
		 this.state.keywords.map(function(keyword){
 	  	 var options = {
				 "className":"highlighted-" + keyword[0],
			 	 "accuracy":{
					 "value":'exactly',
					 "limiters": [",", ".", "°", "(", ")"]}};
			 instance.mark(keyword[0], options);})}
	else{
	 instance.unmark();}
	},
	
	highlightKeywords(checked, color){
		var buttonElementUpdate = this.buttonElementUpdate;
		this.state.keywords.map(function(keyword){
			 var button = document.getElementById('keyword-' + keyword[0])
			 buttonElementUpdate(button, checked, color)})
	},
	
 buttonElementUpdate(button, value, color){
	 button.value = value;
	 button.style.backgroundColor = color;
 },
	
	
	test(){
		console.log('test')
	},
	
	clearCheckbox(){
		//this.refs.checkboxFunctions.check(false)
		console.log(this.state.checked);
		if(this.state.checked){
			this.highlightText(true);
			this.highlightKeywords(true, this.state.orange);
		}
	},
	
	loadArticle(article){
		console.log(article);
		this.setState({
			display:article
		}, function(){
			this.keywordTags();
		})
	},
	
	optionsTab(){
		console.log('options');
		var string = document.getElementById('options-tab')
		console.log(string);
		if(string.innerHTML=='Show')
			string.innerHTML='Hide'
		else string.innerHTML = 'Show'
		
	},
	
	
	render(){
		return(
			<div>
				<div className="container">					
					<div className='row'>
						<div className='col-xs-12' id="header">
							<h2>Demo Page for 'Keywords Finder'</h2>
							<p>The 'Keywords Finder' feature lists the 10 most used words in the article, and gives the user the ability
				 				to highlight each of these keywords. The aim of the feature is to help the reader
								get a quick overview of the article by displaying the most used words, as well as to help
								the reader scan the article by highlighting the keywords in the text.
				 			</p>
							<p>The feature could also be useful in terms of storing the keywords for each
									article, and then using the keywords to find similar and related articles.
									The method could help increase the relevance of articles found in 'related article'
				 					suggestions.</p>
						</div>
						
						<div className='col-xs-12 nopadding'>
							<ArticleLink
								articleFunction={this.keywordTags}
								clearCheckboxFunction={this.clearCheckbox}
								loadArticle={this.loadArticle}
								/>
						</div>
						<div className='col-xs-9 context' id='text'>
							{this.props.children}
						</div>
						<div className='col-xs-3'>
							<div id="keywordsDiv" data-spy="affix" data-offset-top="0">
								
								<h2>Keywords</h2>
								<Checkbox
									keywords={this.state.keywords}
									myFunc={this.highlightAllChecked}
									ref='checkboxFunctions'/>
								<div id="options">
									<a
									 data-toggle="collapse"
									 href="#collapseExample"
									 aria-expanded="false"
									 aria-controls="collapseExample"
									onClick={this.optionsTab}
									>
									 <span id="options-tab">Show</span> advanced options
									</a>
									<div className="collapse" id="collapseExample">
									  <div className="well">
											<Frequency
										 		showFrequencyFunction={this.updateFrequency}/>
											<Input numberKeywordsFunction={this.numberKeywords}/>
									  </div>
									</div>
								</div>
								<Keywords 
									items={this.state.keywords} 
									myFunc2={this.singleKeywordHighlight}
									showFrequency={this.state.showFrequency}
									/>
							</div>
						</div>
					</div>
				</div>	
			</div>
		)
	}
})




