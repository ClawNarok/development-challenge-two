import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

function CButton({ txtButton, callback }) {
  return (
    <Button
      variant="contained"
      onClick={ callback }
    >
      { txtButton }
    </Button>
  );
}

CButton.propTypes = {
  txtButton: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default CButton;
