import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { States, isPositiveNumber, formatDate } from '../Helpers/Utils';
import PatientsContext from '../Context/PatientsContext';
import { Box } from '@mui/system';

function AddPatients() {
  const [cadastro, setCadastro] = useState(true);
  const [notRequired, setNotRequired] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [email, setEmail] = useState('');
  const [addressName, setAddressName] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postal, setPostal] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [reqBody, setReqBody] = useState();
  const [patient, setPatient] = useState();
  const navigate = useNavigate();
  const { getById } = useContext(PatientsContext);
  const { createPatient } = useContext(PatientsContext);
  const { updatePatient } = useContext(PatientsContext);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setCadastro(false);
      getById(id, setPatient);
    }
  }, []);

  const handlePatient = (data) => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    const bDate = data.birthDate.split('/');
    setBirthDate(dayjs(`${bDate[1]}/${bDate[0]}/${bDate[2]}`));
    setEmail(data.email);
    setAddressName(data.addressName);
    setAddressNumber(data.addressNumber);
    setNeighborhood(data.neighborhood);
    setCity(data.city);
    setState(data.state);
    setPostal(data.postal);
    setComplement(data.complement);
  };

  useEffect(() => {
    if (!patient) return;
    handlePatient(patient);
  }, [patient]);

  const reqAddPatient = async () => {
    await createPatient(reqBody);
    navigate('/');
  };

  const reqEditPatient = async () => {
    await updatePatient(reqBody, id);
    navigate('/');
  };

  useEffect(() => {
    if (!reqBody) return;
    if (cadastro) reqAddPatient();
    else reqEditPatient();
    navigate('/');
  }, [reqBody]);

  const cadastrar = () => {
    const body = {
      firstName,
      lastName,
      birthDate: formatDate(birthDate),
      email,
      addressName,
      addressNumber,
      neighborhood,
      city,
      state,
      postal,
      complement: complement || '',
    };
    setReqBody(body);
  };

  const regexEmail = /\S+@\S+\.\S+/;
  const regexPostal = /[\d]{5}-[\d]{3}/g;
  const MINLENGTHNAME = 3;

  const handleChange = (setInput, value) => {
    setInput(value);
    setIsValid(true);
    setNotRequired(true);
  };

  const handleDate = (setInput, value) => {
    setInput(value);
    setIsValid(true);
    setNotRequired(true);
  };

  const validateText = (value, min = 0) => value && value.length > min;
  const validateRegex = (value, regex) => value && value.match(regex);
  const validateDate = (value) => value && value.isValid() && dayjs() - birthDate >= 0;

  const checkValidateFields = () => {
    let value = true;
    if (!validateText(firstName, MINLENGTHNAME)) value = false;
    if (!validateText(lastName, MINLENGTHNAME)) value = false;
    if (!validateRegex(email, regexEmail)) value = false;
    if (!validateRegex(postal, regexPostal)) value = false;
    if (!validateDate(birthDate)) value = false;
    return value;
  };

  const checkRequiredFields = () => {
    let valid = true;
    if (!validateText(addressName)) valid = false;
    if (!validateText(addressNumber)) valid = false;
    if (!validateText(neighborhood)) valid = false;
    if (!validateText(city)) valid = false;
    if (!validateText(state)) valid = false;
    return valid;
  };

  const validations = async () => {
    const req = checkRequiredFields();
    const val = checkValidateFields();
    setIsValid(val);
    setNotRequired(req);
    if (req && val) cadastrar();
  };

  return (
    <Container
      component="form"
      maxWidth="sm"
    >
      { cadastro && <h1>Cadastro de paciente</h1> }
      { !cadastro && <h1>Editar paciente</h1> }
      <Stack spacing={ 3 }>
        <TextField
          required
          label="Nome"
          variant="outlined"
          value={ firstName }
          onChange={ ({ target }) => handleChange(setFirstName, target.value) }
        />
        <TextField
          required
          label="Sobrenome"
          variant="outlined"
          value={ lastName }
          onChange={ ({ target }) => handleChange(setLastName, target.value) }
        />
        <DesktopDatePicker
          required
          id="date-picker"
          label="Data de nascimento"
          inputFormat="DD/MM/YYYY"
          value={ birthDate }
          onChange={ (newDate) => handleDate(setBirthDate, newDate) }
          renderInput={ (params) => <TextField { ...params } /> }
        />
        <TextField
          required
          label="Email"
          variant="outlined"
          value={ email }
          onChange={ ({ target }) => handleChange(setEmail, target.value) }
        />
        <TextField
          required
          label="Endereço"
          variant="outlined"
          value={ addressName }
          onChange={ ({ target }) => handleChange(setAddressName, target.value) }
        />
        <TextField
          required
          id="outlined-uncontrolled"
          label="Número"
          variant="outlined"
          value={ addressNumber }
          onChange={ ({ target }) => {
            if (target.value === '') setAddressNumber('');
            else if (isPositiveNumber(target.value)) setAddressNumber(target.value);
          } }
        />
        <TextField
          label="Complemento"
          variant="outlined"
          value={ complement }
          onChange={ ({ target }) => handleChange(setComplement, target.value) }
        />
        <TextField
          required
          label="Bairro"
          variant="outlined"
          value={ neighborhood }
          onChange={ ({ target }) => handleChange(setNeighborhood, target.value) }
        />
        <TextField
          required
          label="Cidade"
          variant="outlined"
          value={ city }
          onChange={ ({ target }) => handleChange(setCity, target.value) }
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
                <MenuItem key={ x } value={ item.acronym }>{ item.acronym }</MenuItem>))
            }
          </Select>
        </FormControl>
        <TextField
          required
          label="CEP"
          variant="outlined"
          value={ postal }
          onChange={ ({ target }) => handleChange(setPostal, target.value) }
        />
        { !notRequired && (
          <Alert severity="warning">Preencha todos os campos!</Alert>) }
        { !isValid && (
          <Alert severity="error">Dados inválidos!</Alert>) }
        <CButton
          txtButton={ cadastro ? 'Cadastrar' : 'Salvar' }
          callback={ () => validations() }
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
