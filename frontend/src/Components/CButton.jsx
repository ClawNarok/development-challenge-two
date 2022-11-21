import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { Icon } from '@mui/material';

function CButton({ txtButton, callback, disabled, icon }) {
  return (
    <Button
      variant="contained"
      onClick={ callback }
      disabled={ disabled }
    >
      { icon && <Icon>{ icon }</Icon> }
      { txtButton }
    </Button>
  );
}

CButton.propTypes = {
  txtButton: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
};

CButton.defaultProps = {
  icon: '',
  disabled: false,
};

export default CButton;
