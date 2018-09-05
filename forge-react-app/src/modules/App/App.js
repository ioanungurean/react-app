import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Title from 'components/Title/Title';

import Home from 'modules/Home/Home';
import About from 'modules/About/About';

import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <div className="header">
            <div className="icon-react" />
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>

            <a href="https://github.com/ioanungurean/forge-react-app">
              <Title title="Forge React App on Github" />
            </a>
          </div>

          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
