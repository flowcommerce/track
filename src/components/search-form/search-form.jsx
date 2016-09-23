import React from 'react';
import BemHelper from '../../utilities/bem-helper';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

const bem = new BemHelper('search-form');

export default function SearchForm() {
  return (
    <form className={bem.block()} name="tracking_search">
      <input
        className={bem.element('text-input')}
        type="text"
        name="tracking_q"
        aria-required="true" />
      <button
        className={bem.element('button')}
        type="submit"
        name="submit_search">
        <svg className={bem.element('search-blue-svg')}>
          <use xlinkHref="#icon-tracking-icon-search-blue" />
        </svg>
      </button>
    </form>
  );
}
