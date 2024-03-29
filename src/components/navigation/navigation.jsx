import React from 'react';
import PropTypes from 'prop-types';
import BemHelper from '../../utilities/bem-helper';
import FlowLogo from '../icon/FlowIcon';
import SearchForm from '../search-form';
import Icon from '../icon';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

const bem = new BemHelper('navigation');

function Navigation() {
  return (
    <section className={bem.block()}>
        <FlowLogo className={bem.element('logo-svg')} name="flow-branding-color" />
    </section>
  );
}

Navigation.displayName = 'Navigation';

export default Navigation;
