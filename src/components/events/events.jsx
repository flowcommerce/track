import React, { PropTypes } from 'react';
import formatAddress from '../../utilities/address-format';
import api from '../../api';
import BemHelper from '../../utilities/bem-helper';
import DateFormat from '../../utilities/date-format';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

const bem = new BemHelper('events');

const propTypes = {
  eventGroups: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
      province: PropTypes.string,
      text: PropTypes.string,
    }).isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf[api.enums.trackingStatus],
    timestamp: PropTypes.string.isRequired,
  }))).isRequired,
};

function Events({ eventGroups }) {
  return (
    <section className={bem.block()}>
      {eventGroups.map((events, groupIndex) => {
        const dayFormat = new DateFormat(events[0].timestamp);
        return (
          <section className={bem.element('event-group')} key={groupIndex}>
            <div className={bem.element('day')}>
              {dayFormat.getDate()}
            </div>
            <div className={bem.element('events')}>
              {events.map((event, eventIndex) => {
                const timeFormat = new DateFormat(event.timestamp);
                return (
                  <section className={bem.element('event')} key={eventIndex}>
                    <div className={bem.element('time')}>{timeFormat.getTime()}</div>
                    <section className={bem.element('details')}>
                      <div className={bem.element('status')}>{event.status}</div>
                      <div className={bem.element('message')}>{event.description}</div>
                      <div className={bem.element('location')}>{formatAddress(event.address)}</div>
                    </section>
                  </section>
                );
              })}
            </div>
          </section>
        );
      })}
      <section className={bem.element('disclaimer')}>
        *Date & time are usually in the local time of the checkpoint location.
      </section>
    </section>
  );
}

Events.propTypes = propTypes;

export default Events;
