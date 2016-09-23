import React from 'react';
import BemHelper from '../../utilities/bem-helper';
import SearchForm from '../search-form';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

const bem = new BemHelper('navigation');

export default function Navigation() {
  return (
    <section className={bem.block()}>
      <div className={bem.element('branding-title')}>
        <svg className={bem.element('logo-svg')}>
          <use xlinkHref="#icon-tracking-flow-branding-color" />
        </svg>
        <span className={bem.element('title')}>Tracking</span>
      </div>
      <div className={bem.element('search')}>
        <SearchForm />
      </div>
    </section>
  );
}
