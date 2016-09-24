import React, { PropTypes } from 'react';
import BemHelper from '../../utilities/bem-helper';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

const bem = new BemHelper('search-form');

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

function SearchForm({ onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    const className = bem.element('text-input');
    const value = e.target.querySelector(`.${className}`).value;
    onSubmit(value);
  }
  return (
    <form className={bem.block()} onSubmit={handleSubmit} name="tracking_search">
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

SearchForm.displayName = 'SearchForm';
SearchForm.propTypes = propTypes;

export default SearchForm;
