export function test(){
	console.log('test');
	return
}

export function getKeywords(string, cutOff) {
	 var ignore = ["the","of","th", "also", "such", "and","a","to","in","is","you","that","it","he","was","for","on","are","as","with","his","they","I","at","be","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","water","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part"];
   var cleanString = string.replace(/[^a-zA-Zñ ]/g,"").toLowerCase(),
       words = cleanString.split(' '),
       frequencies = {},
       word, frequency, i;
			 
			 //remove an elements with value of ""
			 while(words.indexOf("") > -1){
			 	var index = words.indexOf("")
				words.splice(index,1)}

   for( i=0; i<words.length; i++ ) {
     word = words[i];
		 if(ignore.indexOf(word) == -1){
	     frequencies[word] = frequencies[word] || 0;
	     frequencies[word]++;
		 }
    }
		
		words = Object.keys( frequencies );

		words.sort(function(a,b){
			return frequencies[b]- frequencies[a]
		})
				
		var words_frequency = []
		
		for(var i=0;i<words.length;i++){
			words_frequency[i] = frequencies[words[i]];
		}
		
		words = words.slice(0,cutOff);
		words_frequency = words_frequency.slice(0,cutOff)
		
		var sortable = [];
		
		for(var word in frequencies)
			sortable.push([word,frequencies[word]])
		
		sortable.sort(function(a,b){
			return b[1] - a[1]
		})
		
		return sortable
 }









