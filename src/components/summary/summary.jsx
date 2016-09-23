import React from 'react';
import BemHelper from '../../utilities/bem-helper';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

const bem = new BemHelper('summary');

export default function Summary() {
  return (
    <section className={bem.block()}>
      <div className={bem.element('container')}>
        <div className={bem.element('status')}>
          <svg className={bem.element('status-icon')}>
            <use xlinkHref="#icon-tracking-icon-delivered" />
          </svg>
        </div>

        <div className={bem.element('summary-text')}>
          <span className={bem.element('date')}>
            Delivered on Sep 12, 2016
          </span>

          <span className={bem.element('text')}>
            Your package was left in the mailbox.
          </span>
        </div>
      </div>
    </section>
  );
}
