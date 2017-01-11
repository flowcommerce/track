import React, { PropTypes } from 'react';
import formatAddress from '../../utilities/address-format';
import api from '../../api';
import BemHelper from '../../utilities/bem-helper';
import DateFormat from '../../utilities/date-format';
import Icon from '../icon';
import getTrackingLink from '../../utilities/tracking-link';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

const bem = new BemHelper('events');

const propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    labels: PropTypes.arrayOf(PropTypes.shape({
      carrier: PropTypes.string.isRequired,
      carrier_tracking_number: PropTypes.string.isRequired,
      delivery_estimate: PropTypes.string.isRequired,
      eventGroups: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        address: PropTypes.shape({
          city: PropTypes.string,
          country: PropTypes.string,
          province: PropTypes.string,
          text: PropTypes.string,
        }).isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.oneOf[api.enums.trackingStatus],
        timestamp: PropTypes.string.isRequired,
      }))),
      id: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    })),
    status: PropTypes.string.isRequired,
  })),
  noResults: PropTypes.bool,
};

const defaultProps = {
  noResults: true,
};

function Events({ labels, noResults }) {
  const trackingLink = (label) => {
    const linkInfo = getTrackingLink(label.carrier, label.carrier_tracking_number);

    if (linkInfo) {
      return (
        <div className={bem.element('tracking-link')}>
          <a
            className={bem.element('tracking-link-a-icon')}
            href={linkInfo.url}
            target="_blank"
            rel="noopener noreferrer">
            <Icon
              className={bem.element('tracking-link-icon')}
              name="icon-arrow-right" />
          </a>

          <a
            className={bem.element('tracking-link-a-text')}
            href={linkInfo.url}
            target="_blank"
            rel="noopener noreferrer">
            {linkInfo.text}
          </a>
        </div>
      );
    }

    return label.carrier_tracking_number;
  };

  return (
    <section className={bem.block()}>
      {labels.map((label, labelIndex) =>
        (
        <div className={bem.element('label')} key={labelIndex}>
          <section
            className={bem.element('carrier-info', { first: labelIndex === 0 })} key={labelIndex}>
            <div className={bem.element('tracking-number')}>
              {label.carrier} Tracking #:&nbsp;{trackingLink(label)}
            </div>
          </section>
          {label.eventGroups.map((events, groupIndex) => {
            const dayFormat = new DateFormat(events[0].timestamp);
            return (
              <section className={bem.element('event-group')} key={groupIndex}>
                <div
                  className={bem.element('day', { first: labelIndex === 0 && groupIndex === 0 })}>
                  {dayFormat.getDate()}
                </div>
                <div className={bem.element('events')}>
                  {events.map((event, eventIndex) => {
                    const timeFormat = new DateFormat(event.timestamp);
                    return (
                      <section
                        className={bem.element(
                          'event',
                          { first: labelIndex === 0 && groupIndex === 0 && eventIndex === 0 }
                        )}
                        key={eventIndex}>
                        <div className={bem.element('time')}>{timeFormat.getTime()}</div>
                        <section className={bem.element('details')}>
                          <div className={bem.element('status')}>{event.status}</div>
                          <div className={bem.element('message')}>{event.description}</div>
                          <div className={bem.element('location')}>
                            {formatAddress(event.address)}
                          </div>
                        </section>
                      </section>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      ))}


      {(() => {
        if (noResults) {
          return (
            <section className={bem.element('no-results')}>
              Tracking details will be displayed here once available.
            </section>
          );
        }

        return (
          <section className={bem.element('disclaimer')}>
            *Date & time are usually in the local time of the checkpoint location.
          </section>
        );
      })()}
    </section>
  );
}

Events.propTypes = propTypes;
Events.defaultProps = defaultProps;

export default Events;
