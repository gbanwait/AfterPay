import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, BrowserRouter as Router, Switch} from 'react-router-dom';

import App from './container/app';
import Card from './container/card';
import NotFound from './container/404';
import Nav from './container/nav';

const Routing = (
    <Router>  
      <div>  
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/card" component={Card} />
            <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
) 

const root = document.getElementById('main');
ReactDOM.render(Routing, root);