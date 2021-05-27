import React from 'react';
import PropTypes from 'prop-types';
import BemHelper from '../../utilities/bem-helper';
import DateFormat from '../../utilities/date-format';
import SearchForm from '../search-form';
import Icon from '../icon';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

const bem = new BemHelper('summary');

const propTypes = {
  event: PropTypes.shape({
    address: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
      province: PropTypes.string,
      text: PropTypes.string,
    }),
  }),
  estimatedDelivery: PropTypes.string,
  noResults: PropTypes.bool,
  notFound: PropTypes.bool,
};

const defaultProps = {
  noResults: false,
  notFound: false,
};

const ICONS = {
  pending: 'icon-confirmed',
  info_received: 'icon-confirmed',
  in_transit: 'icon-in-transit',
  out_for_delivery: 'icon-in-transit',
  attempt_fail: 'icon-in-transit-error',
  delivered: 'icon-delivered',
  exception: 'icon-error',
  expired: 'icon-unknown',
  no_results: 'icon-error',
};

const getIcon = (event) => {
  if (!event) {
    return 'icon-unknown';
  }

  return ICONS[event.status] || 'icon-unknown';
};

const STATUS_TEXT = {
  pending: 'Pending',
  info_received: 'Information Received',
  in_transit: 'In Transit',
  out_for_delivery: 'Out For Delivery',
  attempt_fail: 'Delivery Attempt Failed',
  delivered: 'Delivered',
  exception: 'Exception',
  expired: 'Expired',
  no_results: 'The tracking number entered is not valid.',
};

const getStatusText = (event) => {
  if (!event) {
    return undefined;
  }

  return STATUS_TEXT[event.status];
};

function Summary({ event, noResults, notFound, onSearch }) {
  return (
    <section className={bem.block()}>
      <div className={bem.element('container')}>
        <div className={bem.element('status')}>
          <Icon
            className={bem.element('status-icon')}
            name={noResults ? getIcon({ status: 'no_results' }) : getIcon(event)} />
        </div>

        <div className={bem.element('summary-text')}>
        {(() => {
          if (event) {
            if (event.status === 'delivered') {
              const fullDate = new DateFormat(event.timestamp).getDateYear();
              return (
                <div>
                  <span className={bem.element('date')}>
                    Delivered on {fullDate}
                  </span>

                  <span className={bem.element('text')}>
                    Your package was left in the mailbox.
                  </span>
                </div>
              );
            }

            return (
              <div>
                <span className={bem.element('date')}>
                  {getStatusText(event)}
                </span>
                <span className={bem.element('text')}>
                  {event.description}
                </span>
              </div>
            );
          }

          if (noResults || notFound) {
            return (
              <span className={bem.element('generic-text')}>
                {getStatusText({ status: 'no_results' })}
              </span>
            );
          }

          return (
            <span className={bem.element('generic-text')}>
              Looking for your package? <br />
              Enter a tracking number to begin.
            </span>
          );
        })()}
         <SearchForm onSubmit={onSearch} />
        </div>
      </div>
    </section>
  );
}

Summary.displayName = 'Summary';
Summary.propTypes = propTypes;
Summary.defaultProps = defaultProps;

export default Summary;
