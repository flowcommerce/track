import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

function Icon({ className, name }) {
  const svgKey = `icon-tracking-${name}`;

  if (!name) {
    return null;
  }

  return (
    <svg className={`${className} ${svgKey}`}>
      <use xlinkHref={`#${svgKey}`} />
    </svg>
  );
}

Icon.displayName = 'Icon';
Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
