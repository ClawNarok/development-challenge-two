import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

function CEditButton({ txtButton, callback }) {
  return (
    <Button
      variant="contained"
      onClick={ callback }
    >
      <Icon>create</Icon>
      { txtButton }
    </Button>
  );
}

CEditButton.propTypes = {
  txtButton: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default CEditButton;
