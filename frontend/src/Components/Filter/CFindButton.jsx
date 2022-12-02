import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { Icon } from '@mui/material';
import icons from '../../Helpers/Icons'

function CFindButton({ txtButton, callback, disabled,  }) {
  const [over, setOver] = useState(false);

  return (
    <Button
      variant="outlined"
      onClick={ callback }
      disabled={ disabled }
    >
      <Icon>{ icons.DeleteOutlined }</Icon>
      { txtButton }
    </Button>
  );
}

CFindButton.propTypes = {
  txtButton: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

CFindButton.defaultProps = {
  disabled: false,
};

export default CFindButton;
