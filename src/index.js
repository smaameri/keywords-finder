

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'


import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import 'bootstrap/js/transition.js'
import 'bootstrap/js/affix.js'
import 'bootstrap/js/tooltip.js'
import 'bootstrap/js/collapse.js'


import App from './modules/App'

import Article1 from './modules/Article1'
import Article2 from './modules/Article2'
import Article3 from './modules/Article3'
import Article4 from './modules/Article4'
import Article5 from './modules/Article5'


render((
	<Router history={browserHistory}>
		<Route path='/' component={App}>
			<IndexRoute component={Article1} />
			<Route path='/Article1' component={Article1} />
			<Route path='/Article2' component={Article2} />
			<Route path='/Article3' component={Article3} />
	   	<Route path='/Article4' component={Article4} />
	   	<Route path='/Article5' component={Article5} />
		</Route>
	</Router>
), document.getElementById('app'))
