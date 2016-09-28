import React from 'react';
import BemHelper from '../../utilities/bem-helper';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

const bem = new BemHelper('footer');


export default function Footer() {
  return (
    <footer className={bem.block()}>
      <a className={bem.element('link')} href="https://www.flow.io">©{new Date().getFullYear()} Flow Commerce Inc.</a>
    </footer>
  );
}
