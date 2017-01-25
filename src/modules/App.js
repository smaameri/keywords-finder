import jQuery from 'jquery'
import $ from 'jquery'


import React from 'react'
import Mark from 'mark.js'

import Keywords from './Keywords'
import Options from './Options'

import ArticleLinks from './ArticleLinks'

import Article1 from './Articles/Article1'

import { getKeywords } from './Functions'

export default React.createClass({
	
	getInitialState: function() {
	    return {
				keywords: [], //keywords to be displayed
				keywordsRaw:[], //array of all words in document
				cutOff:10, //number keywords to display
				markInstance:'',
				article:'1',
				checked:false,//highlight option checked
				orange:'#fbba00',
				display:<Article1 />,
				showFrequency:false,//show frequency of keywords
				
			};
	  },                                               
	
	  componentDidMount(){
			//text is the conten in the article
			this.loadKeywords();
			this.setState({markInstance:new Mark(document.querySelector(".context"))});			
	  },
		
		//gets the keywords from the article text
		loadKeywords(){
			var text = document.getElementById('text').textContent;
			var keywords_frequencies = getKeywords(text, this.state.cutOff);
			keywords_frequencies=keywords_frequencies.slice(0, 19);
			
			var keywords = [];
			
			for(var i=0;i<keywords_frequencies.length;i++){
				keywords[i] = keywords_frequencies[i][0];
			}
			
			this.setState({keywordsRaw:keywords_frequencies}, function(){
				this.setState({keywords:keywords_frequencies.slice(0,this.state.cutOff)}, function(){
					this.getCheckboxStatus();
					this.showFrequency(this.state.showFrequency)
				});
			});
	},
	
	//displays the number keywords as requested on the
	// 'Number of results' options
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
	
	//updates status of 'Show keywords frequency' checkbox
	updateFrequency(checked){
		this.setState({showFrequency:checked});
		this.showFrequency(checked);
	},
	
	//toggles the display of the keywords frequency in the browser
	showFrequency(checked){
		var keywords = document.getElementsByClassName('keywords');
		var i;
		if(checked){
			for(i=0; i < keywords.length; i++){
				keywords[i].innerHTML = this.state.keywords[i][0] + " | " + this.state.keywords[i][1]
			}}
			else{
				for(i=0; i < keywords.length; i++){
					keywords[i].innerHTML = this.state.keywords[i][0] 
			}}			
	},
	 	 
	 //highlights the keywords in the article. Activated by
	 // pressing one of the keyword tags
	 singleKeywordHighlight(e){
		 var element = e.target;
		 var keyword = element.id.substring(8);
		 var options = {
			 "className":"highlighted-" + keyword,
		 	 "accuracy":{
				 "value":'exactly',
				 "limiters": [",", ".","°","(", ")"]}};
		 
		 if(element.value === 'false'){
			 this.buttonElementUpdate(element, true, this.state.orange)				 
			 this.state.markInstance.mark(keyword, options);}
		 else{
			 this.buttonElementUpdate(element, false, 'white')				 
			 this.state.markInstance.unmark(options);}
			 
			 this.updateCheckbox();
	 },
	
	 //updates the 'Highlight All' all checkbox when all the 
	 // keyword tags are (un)highlighted individually. When 
	 // they are all highlighted, it checks the 'Highlight All'
	 //checbox, and when they are all unhighlighted it removes the 	 //check from the checkbox
	 updateCheckbox(){
		 console.log('up');
		 var keywords = document.getElementById('keywords').childNodes;
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
		console.log('equal')
		console.log(equal)
		
		if(equal){
			if(initialValue === 'false'){
				this.refs.checkboxFunctions.checkboxTick(false);}
			else{this.refs.checkboxFunctions.checkboxTick(true)}
		}
	 },
	
	 //function actived when the 'Highlight All' checkbox is  	 	 	 //clicked
	 highlightAllChecked(checked){
		 this.highlightText(checked);
		 if(checked){this.highlightKeywords(true, this.state.orange);}
		 else{this.highlightKeywords(false, 'white');}		 
	},
	
	//highlights all the keywords in the text
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
	
	//highlights the keyword tag buttons
	highlightKeywords(checked, color){
		var buttonElementUpdate = this.buttonElementUpdate;
		this.state.keywords.map(function(keyword){
			 var button = document.getElementById('keyword-' + keyword[0])
			 buttonElementUpdate(button, checked, color)})
	},
	
 //updates the style of the keyword button tags
 buttonElementUpdate(button, value, color){
	 button.value = value;
	 button.style.backgroundColor = color;
 },
	
 //checks the 'Highlight All' checkbox status and highlights
 // text accordingly. Called whenever a new article is loaded.
 getCheckboxStatus(){
	 if(this.state.checked){
			this.highlightText(true);
			this.highlightKeywords(true, this.state.orange);
		}
	},
	
	//Called whenever one of the Article Links is clicked 
	// in <ArticleLinks />. Loads the clicked article.
	loadArticle(article){
		this.setState({display:article},function(){
			this.loadKeywords();
			this.getCheckboxStatus();
		})
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
							<ArticleLinks
								loadArticle={this.loadArticle}
								/>
						</div>
						<div className='col-xs-9 context' id='text'>
							{this.props.children}
						</div>
						<div className='col-xs-3'>
							<div id="keywordsDiv" data-spy="affix" data-offset-top="305">
								<h2>Keywords</h2>
								<Options
									keywords={this.state.keywords}
									highlightAllCheckedFunction={this.highlightAllChecked}
					 				showFrequencyFunction={this.updateFrequency}
					 				numberKeywordsFunction={this.numberKeywords}
									ref='checkboxFunctions'
									 />	
								<Keywords 
									items={this.state.keywords} 
									highlightFunction={this.singleKeywordHighlight}
									/>
							</div>
						</div>
					</div>
				</div>	
			</div>
		)
	}
})




