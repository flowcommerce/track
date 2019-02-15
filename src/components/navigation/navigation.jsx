import React from 'react';
import PropTypes from 'prop-types';
import BemHelper from '../../utilities/bem-helper';
import SearchForm from '../search-form';
import Icon from '../icon';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

const bem = new BemHelper('navigation');

const propTypes = {
  onSearch: PropTypes.func.isRequired,
};

function Navigation({ onSearch }) {
  return (
    <section className={bem.block()}>
      <div className={bem.element('branding-title')}>
        <Icon className={bem.element('logo-svg')} name="flow-branding-color" />
        <span className={bem.element('title')}>Tracking</span>
      </div>
      <div className={bem.element('search')}>
        <SearchForm onSubmit={onSearch} />
      </div>
    </section>
  );
}

Navigation.displayName = 'Navigation';
Navigation.propTypes = propTypes;

export default Navigation;
