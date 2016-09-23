import React from 'react';
import BemHelper from '../../utilities/bem-helper';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

const bem = new BemHelper('events');

export default function Events() {
  return (
    <section className={bem.block()}>
      <section className={bem.element('event-group')}>
        <div className={bem.element('day')}>
          Monday, Sep 12
        </div>
        <section className={bem.element('event')}>
          <div className={bem.element('time')}>11:36 AM</div>
          <section className={bem.element('details')}>
            <div className={bem.element('status')}>Delivered</div>
            <div className={bem.element('message')}>Your package was left in the mailbox. </div>
            <div className={bem.element('location')}>Hoboken, NJ, US</div>
          </section>
        </section>
      </section>
      <section className={bem.element('event-group')}>
        <div className={bem.element('day')}>
          Sunday, Sep 11
        </div>
        <section className={bem.element('event')}>
          <div className={bem.element('time')}>6:17 AM</div>
          <section className={bem.element('details')}>
            <div className={bem.element('status')}>Attempt Failed</div>
            <div className={bem.element('message')}>Delivery attempted - Business closed</div>
            <div className={bem.element('location')}>Hoboken, NJ, US</div>
          </section>
        </section>
        <section className={bem.element('event')}>
          <div className={bem.element('time')}>6:07 AM</div>
          <section className={bem.element('details')}>
            <div className={bem.element('status')}>Out for Delivery</div>
            <div className={bem.element('message')}>Out for delivery </div>
            <div className={bem.element('location')}>Hoboken, NJ, US</div>
          </section>
        </section>
        <section className={bem.element('event')}>
          <div className={bem.element('time')}>1:50 AM</div>
          <section className={bem.element('details')}>
            <div className={bem.element('status')}>Delivered</div>
            <div className={bem.element('message')}>Package arrived at a carrier facility </div>
            <div className={bem.element('location')}>Hoboken, NJ, US</div>
          </section>
        </section>
        <section className={bem.element('event')}>
          <div className={bem.element('time')}>1:41 AM</div>
          <section className={bem.element('details')}>
            <div className={bem.element('status')}>Delivered</div>
            <div className={bem.element('message')}>
              Package has been transferred to the USPS and will be
              delivered by your local postal office
            </div>
            <div className={bem.element('location')}>Hoboken, NJ, US</div>
          </section>
        </section>
      </section>
      <section className={bem.element('disclaimer')}>
        *Date & time are usually in the local time of the checkpoint location.
      </section>
    </section>
  );
}
