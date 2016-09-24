import React, { PropTypes } from 'react';
import BemHelper from '../../utilities/bem-helper';
import DateFormat from '../../utilities/date-format';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

const bem = new BemHelper('summary');

const propTypes = {
  event: PropTypes.shape({
    address: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
      provence: PropTypes.string,
      text: PropTypes.string,
    }),
  }),
  noResults: PropTypes.bool,
};

const defaultProps = {
  noResults: false,
};

const ICONS = {
  pending: 'icon-tracking-icon-confirmed',
  info_received: 'icon-tracking-icon-confirmed',
  in_transit: 'icon-tracking-icon-in-transit',
  out_for_delivery: 'icon-tracking-icon-in-transit',
  attempt_fail: 'icon-tracking-icon-in-transit-error',
  delivered: 'icon-tracking-icon-delivered',
  exception: 'icon-tracking-icon-error',
  expired: 'icon-tracking-icon-unknown',
  no_results: 'icon-tracking-icon-error',
};

const getIcon = (event) => {
  if (!event) {
    return undefined;
  }

  return ICONS[event.status] || 'icon-tracking-icon-unknown';
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
  no_results: 'Tracking Number Not Found',
};

const getStatusText = (event) => {
  if (!event) {
    return undefined;
  }

  return STATUS_TEXT[event.status];
};

function Summary({ event, noResults }) {
  return (
    <section className={bem.block()}>
      <div className={bem.element('container')}>
        <div className={bem.element('status')}>
          <svg className={bem.element('status-icon')}>
            <use xlinkHref={`#${noResults ? getIcon({ status: 'no_results' }) : getIcon(event)}`} />
          </svg>
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

          if (noResults) {
            return (
              <span className={bem.element('date')}>
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
        </div>
      </div>
    </section>
  );
}

Summary.displayName = 'Summary';
Summary.propTypes = propTypes;
Summary.defaultProps = defaultProps;

export default Summary;
