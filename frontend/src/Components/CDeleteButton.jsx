import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

function CDeleteButton({ txtButton, callback }) {
  return (
    <Button
      variant="contained"
      onClick={ callback }
    >
      <Icon>delete</Icon>
      { txtButton }
    </Button>
  );
}

CDeleteButton.propTypes = {
  txtButton: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default CDeleteButton;
