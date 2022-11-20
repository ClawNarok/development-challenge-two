import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

function CTextField({ txtLabel, callback }) {
  const [value, setValue] = useState('');

  const onInputChange = (setInput, target) => {
    setInput(target.value);
  };

  return (
    <TextField
      required
      id="outlined-uncontrolled"
      label={ txtLabel }
      variant="outlined"
      value={ value }
      onChange={ ({ target }) => {
        onInputChange(setValue, target);
        callback(target.value);
      } }
    />
  );
}

CTextField.propTypes = {
  txtLabel: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default CTextField;
