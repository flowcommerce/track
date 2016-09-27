import React, { Component } from 'react';
import querystring from 'querystring';
import BemHelper from '../../utilities/bem-helper';
import Navigation from '../navigation';
import Summary from '../summary';
import Events from '../events';
import Footer from '../footer';
import api from '../../api';
import LabelEvents from '../../utilities/label-events';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

const bem = new BemHelper('tracking-app');

export default class App extends Component {
  state = {
    eventGroups: [],
    loaded: false,
  }

  componentDidMount() {
    const trackingId = this.getTrackingId();

    if (trackingId) {
      this.doSearch(trackingId);
    }
  }

  getTrackingId() {
    const qs = querystring.parse(window.location.search.replace('?', ''));
    const pathParts = window.location.pathname.split('/');

    // https://track.flow.io?number=F701318902181840
    if (qs.number) {
      return qs.number;
    }

    // https://track.flow.io/F701318902181840
    if (pathParts.length === 2 && pathParts[1].toLowerCase().startsWith('f70')) {
      return pathParts[1];
    }

    // no valid tracking ids provided
    return undefined;
  }

  getLastEvent() {
    const groups = this.state.eventGroups;
    if (!groups.length || !groups[0].length) {
      return undefined;
    }

    return groups[0][0];
  }

  doSearch(trackingId) {
    api.trackings.getTrackingsById(trackingId, {
      params: {
        sort: '-timestamp',
      },
    }).then((response) => {
      const events = new LabelEvents(response.result.labels);
      this.setState({
        eventGroups: events.getEventGroups(),
        estimatedDelivery: events.getLabelEstimatedDeliveryDate(),
        loaded: true,
      });
    });
  }

  handleSearch = (trackingId) => {
    this.doSearch(trackingId);
  }

  render() {
    return (
      <main className={bem.block({ loaded: this.state.loaded })}>
        <Navigation onSearch={this.handleSearch} />
        <Summary
          event={this.getLastEvent()}
          estimatedDelivery={this.state.estimatedDelivery}
          noResults={this.state.loaded && this.state.eventGroups.length === 0} />
        <Events eventGroups={this.state.eventGroups} />
        <Footer />
      </main>
    );
  }
}
