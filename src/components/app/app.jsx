/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import querystring from 'querystring';
import BemHelper from '../../utilities/bem-helper';
import Navigation from '../navigation';
import Summary from '../summary';
import Events from '../events';
import Footer from '../footer';
import api from '../../api';
import { groupEvents, getLabelEstimatedDeliveryDate } from '../../utilities/label-events';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

const bem = new BemHelper('tracking-app');

export default class App extends Component {
  state = {
    labels: [],
    dataLoaded: false,
    pageLoaded: false,
  };

  componentDidMount() {
    const trackingId = this.getTrackingIdentifier();

    if (trackingId) {
      this.doSearch(trackingId);
    } else {
      this.setPageLoaded();
    }
  }

  getTrackingIdentifier() {
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

    // https://track.flow.io/SF701318902181840
    if (pathParts.length === 2 && pathParts[1].toLowerCase().startsWith('sf70')) {
      return pathParts[1];
    }

    // no valid tracking ids provided
    return undefined;
  }

  getLastEvent() {
    const { labels } = this.state;
    if (!labels.length || !labels[0].events.length) {
      return undefined;
    }

    return labels[0].events[0];
  }

  setPageLoaded() {
    this.setState({ pageLoaded: true });
  }

  handleSearch = (identifier) => {
    this.doSearch(identifier);
  }

  doSearch(identifier) {
    api.trackings.getTrackingsByIdentifier(identifier, {
      params: {
        sort: '-timestamp',
      },
    }).then((response) => {
      switch (response.status) {
        case 200: {
          this.setState({
            labels: groupEvents(response.result.labels),
            estimatedDelivery: getLabelEstimatedDeliveryDate(response.result.labels),
            dataLoaded: true,
          });
          this.setPageLoaded();
          break;
        }
        case 404:
          this.setState({
            dataLoaded: true,
            notFound: true,
          });
          this.setPageLoaded();
          break;
        default:
          this.setPageLoaded();
          break;
      }
    });
  }

  render() {
    const {
      dataLoaded,
      estimatedDelivery,
      labels,
      notFound,
      pageLoaded,
    } = this.state;
    return (
      <main className={bem.block({ loaded: pageLoaded })}>
        <Navigation />
        <Summary
          onSearch={this.handleSearch}
          event={this.getLastEvent()}
          estimatedDelivery={estimatedDelivery}
          noResults={dataLoaded && labels.length === 0}
          notFound={notFound}
        />
        <Events
          labels={labels}
          noResults={labels.length === 0}
        />
        <Footer noResults={labels.length === 0} />
      </main>
    );
  }
}
