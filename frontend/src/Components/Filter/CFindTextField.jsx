import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import CButton from '../CButton';

function CFindTextField({ callback }) {
  const [value, setValue] = useState('');
  return (
    <div>
      <TextField
        size="small"
        variant="outlined"
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
      />
      <CButton
        txtButton="Adicionar"
        callback={ () => {
          callback({ value });
          setValue('');
        } }
      />
    </div>
  );
}

CFindTextField.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default CFindTextField;