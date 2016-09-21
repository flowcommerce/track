import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Navigation from './components/navigation';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

injectTapEventPlugin();

ReactDOM.render(
  <div>
    <Navigation />
    The track.flow.io page!
    <p> an update </p>
  </div>,
  document.getElementById('react-markup')
);
