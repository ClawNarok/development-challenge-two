import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { isPositiveNumber } from '../../Helpers/Utils';
import { TextField } from '@mui/material';
import CButton from '../CButton';

function CFindNumberField({ callback }) {
  const [value, setValue] = useState('');
  const [disable, setDisable] = useState(true);

  const handleChange = (number) => {
    if (number) setDisable(false);
    else setDisable(true);
    setValue(number);
  };

  return(
    <div>
      <TextField
        id="outlined-uncontrolled"
        label="Número"
        size="small"
        variant="outlined"
        value={ value }
        onChange={ ({ target }) => {
          if (target.value === '') handleChange('');
          else if (isPositiveNumber(target.value)) handleChange(target.value);
        } }
      />
      <CButton
        disabled={ disable }
        txtButton="Adicionar"
        callback={ () => {
          callback({ value });
          setValue('');
        } }
      />
    </div>
  );
}

CFindNumberField.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default CFindNumberField;
