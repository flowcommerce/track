import React, { Component } from 'react';
import querystring from 'querystring';
import Navigation from '../navigation';
import Summary from '../summary';
import Events from '../events';
import Footer from '../footer';
import api from '../../api';
import LabelEvents from '../../utilities/label-events';


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
    if (pathParts.length === 2 && pathParts[1].toLowerCase().startsWith('fl')) {
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
    api.label_events.get('demo', {
      params: {
        tracking_id: trackingId,
        sort: '-timestamp',
      },
    }).then((response) => {
      const events = new LabelEvents(response.result);
      this.setState({ eventGroups: events.getEventGroups(), loaded: true });
    });
  }

  handleSearch = (trackingId) => {
    this.doSearch(trackingId);
  }

  render() {
    return (
      <div className="tracking-app-container">
        <Navigation onSearch={this.handleSearch} />
        <Summary
          event={this.getLastEvent()}
          noResults={this.state.loaded && this.state.eventGroups.length === 0} />
        <Events eventGroups={this.state.eventGroups} />
        <Footer />
      </div>
    );
  }
}
