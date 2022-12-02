import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { makeArray } from '../../Helpers/Utils';
import CButton from '../CButton';
import { FormControl, MenuItem, TextField } from '@mui/material';

const convertNameFilter = (name) => name.toLowerCase().replace(' ', '_');
const filters = ['Igual a', 'Maior que', 'Menor que'];

function CFindSelectDate({ callback }) {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [comparison, setComparison] = useState('');

  useEffect(() => {
    setComparison(convertNameFilter(filters[0]));
  }, []);

  const makeOption = () => {
    const obj = {
      day,
      month,
      year,
      value: `${day || '00'}/${month || '00'}/${year || '0000'}`,
      comparison: comparison
    };
    setDay('');
    setMonth('');
    setYear('');
    return { ...obj };
  };

  const START_YEAR = dayjs().get('year');
  const END_YEAR = 1900;

  return (
    <div>
      <FormControl>
        <TextField
          id="outlined"
          select
          size="small"
          label="Ano"
          value={year}
          onChange={ ({ target }) => setYear(target.value) }
        >
          {makeArray(START_YEAR, END_YEAR).map((item, x) => (
            <MenuItem key={x} value={ item }>
              { item }
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <FormControl>
        <TextField
          id="outlined"
          select
          size="small"
          label="Mês"
          value={month}
          onChange={ ({ target }) => setMonth(target.value) }
        >
          {makeArray(1, 12).map((item, x) => (
            <MenuItem key={x} value={ item }>
              { item }
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <FormControl>
        <TextField
          id="outlined"
          select
          size="small"
          label="Dia"
          value={day}
          onChange={ ({ target }) => setDay(target.value) }
        >
          {makeArray(1, 31).map((item, x) => (
            <MenuItem key={x} value={ item }>
              { item }
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <FormControl>
        <TextField
          label="Comparador"
          id="outlined"
          select
          size="small"
          value={comparison}
          onChange={ ({ target }) => setComparison(target.value) }
        >
          { filters.map((item, x) => (
            <MenuItem key={x} value={ convertNameFilter(item) }>
              { item }
            </MenuItem>
          )) }
        </TextField>
      </FormControl>
      <CButton
        txtButton="Adicionar"
        callback={ () => callback(makeOption()) }
      />
    </div>
  );
}

CFindSelectDate.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default CFindSelectDate;
