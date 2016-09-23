import React, { Component } from 'react';
import Navigation from '../navigation';
import Summary from '../summary';
import Events from '../events';

export default class App extends Component {
  render() {
    return (
      <div className="tracking-app-container">
        <Navigation />
        <Summary />
        <Events />
      </div>
    );
  }
}
