import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

function CCreateButton({ txtButton, callback }) {
  return (
    <Button
      variant="contained"
      onClick={ callback }
    >
      <Icon>add</Icon>
      { txtButton }
    </Button>
  );
}

CCreateButton.propTypes = {
  txtButton: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default CCreateButton;
