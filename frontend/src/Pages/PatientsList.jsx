import { Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CButton from '../Components/CButton';
import CDataGrid from '../Components/CDataGrid';
import Icons from '../Helpers/Icons';

function PatientsList() {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Patients</h1>
      <CButton
        txtButton="Adicionar paciente"
        callback={ () => navigate('/cadastro') }
        icon={ Icons.Add }
      />
      <CDataGrid />
    </Container>
  );
}

export default PatientsList;
