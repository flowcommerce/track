import React, { PropTypes, PureComponent } from 'react';
import BemHelper from '../../utilities/bem-helper';
import Icon from '../icon';

if (process.browser) {
  require('./styles.css'); // eslint-disable-line global-require
}

const bem = new BemHelper('search-form');

class SearchForm extends PureComponent {
  static displayName = 'SearchForm';

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const value = this.inputTracking.value;

    if (!value.trim()) {
      return;
    }

    this.props.onSubmit(value);
  }

  render() {
    return (
      <form className={bem.block()} onSubmit={this.handleSubmit} name="tracking_search">
        <input
          ref={(input) => { this.inputTracking = input; }}
          className={bem.element('text-input')}
          type="text"
          name="tracking_q"
          aria-required="true" />
        <button
          className={bem.element('button')}
          type="submit"
          name="submit_search">
          <Icon className={bem.element('button-icon')} name="icon-search-clear" />
        </button>
      </form>
    );
  }
}

export default SearchForm;
