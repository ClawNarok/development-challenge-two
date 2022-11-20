import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Container from '@mui/material/Container';
import CButton from '../Components/CButton';
import CTextField from '../Components/CTextField';
import States from '../Helpers/Utils';

function AddPatients() {
  const [required, setRequired] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postal, setPostal] = useState('');
  const navigate = useNavigate();

  const cadastrar = () => {
    console.log('campos');
    console.log(name);
    console.log(birthDate.format('DD/MM/YYYY'));
    console.log(email);
    console.log(address);
    console.log(addressNumber);
    console.log(city);
    console.log(state);
    console.log(postal);
  };

  const regexEmail = /\S+@\S+\.\S+/;
  const regexPostal = /[\d]{5}-[\d]{3}/g;
  const MINLENGTHNAME = 10;

  const handleChange = (setInput, value) => {
    setInput(value);
    setIsValid(true);
    setRequired(false);
  };

  const checkRequiredPersonalFields = () => {
    let valid = false;
    if (!name || name.length === 0) valid = true;
    if (!birthDate || !birthDate.isValid()) valid = true;
    if (!email || email.length === 0) valid = true;
    return valid;
  };

  const checkRequiredAddressFields = () => {
    let valid = false;
    if (!address || address.length === 0) valid = true;
    if (!addressNumber || addressNumber.length === 0) valid = true;
    if (!city || city.length === 0) valid = true;
    if (!state || state.length === 0) valid = true;
    if (!postal || postal.length === 0) valid = true;
    return valid;
  };

  const checkRequiredFields = () => {
    const validPerson = checkRequiredPersonalFields();
    const validAdress = checkRequiredAddressFields();
    setRequired((validPerson || validAdress));
  };

  const checkValidFields = () => {
    let valid = true;
    if (name.length < MINLENGTHNAME) valid = false;
    if (dayjs() - birthDate < 0) valid = false;
    if (!email.match(regexEmail)) valid = false;
    if (!postal.match(regexPostal)) valid = false;
    setIsValid(valid);
    if (valid) cadastrar();
    else console.log('não cadastrar');
  };

  return (
    <Container maxWidth="sm">
      <Stack spacing={ 3 }>
        <CTextField
          txtLabel="Nome"
          callback={ (value) => handleChange(setName, value) }
        />
        <DesktopDatePicker
          required
          id="date-picker"
          label="Data de nascimento"
          inputFormat="DD/MM/YYYY"
          value={ birthDate }
          onChange={ (newDate) => setBirthDate(newDate) }
          renderInput={ (params) => <TextField { ...params } /> }
        />
        <CTextField
          txtLabel="Email"
          callback={ (value) => handleChange(setEmail, value) }
        />
        <CTextField
          txtLabel="Endereço"
          callback={ (value) => handleChange(setAddress, value) }
        />
        <TextField
          required
          type="number"
          label="Número"
          variant="outlined"
          value={ addressNumber }
          // inputProps={ { inputMode: 'numeric', pattern: '[0-9]' } }
          onChange={ ({ target }) => handleChange(setAddressNumber, target.value) }
        />
        <CTextField
          txtLabel="Cidade"
          callback={ (value) => handleChange(setCity, value) }
        />
        <FormControl>
          <InputLabel required id="select-state">Estado</InputLabel>
          <Select
            labelId="select-state"
            value={ state }
            label="Estado"
            onChange={ ({ target }) => setState(target.value) }
          >
            {
              States.map((item, x) => (
                <MenuItem key={ x } value={ item.acronym }>{ item.name }</MenuItem>))
            }
          </Select>
        </FormControl>
        <CTextField
          txtLabel="CEP"
          callback={ (value) => handleChange(setPostal, value) }
        />
        { required && (
          <Alert severity="warning">Preencha todos os campos!</Alert>) }
        { !isValid && (
          <Alert severity="error">Dados inválidos!</Alert>) }
        <CButton
          txtButton="Adicionar"
          callback={ () => {
            checkRequiredFields();
            checkValidFields();
          } }
        />
        <CButton
          txtButton="Voltar"
          callback={ () => navigate('/') }
        />
      </Stack>
    </Container>
  );
}

export default AddPatients;
