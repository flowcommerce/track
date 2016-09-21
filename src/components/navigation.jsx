import React from 'react';
import BemHelper from '../utilities/bem-helper';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

const bem = new BemHelper('navigation');

export default function Navigation({}) {
  return (
    <section className={bem.block()}>
      <div className={bem.element('logo')}>
        Logo
      </div>
    </section>
  );
}
