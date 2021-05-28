import React from 'react';
import PropTypes from 'prop-types';
import { FlowLogo } from 'react-icons-emotion';
import MetaLogo from './MetaLogo'

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
    <>
      <FlowLogo fill='white' width='110px' />
      <MetaLogo style={{ marginBottom: '2px', marginLeft: '2px'} } height={40} width={115} />
    </>
  );
}

Icon.displayName = 'Icon';
Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
