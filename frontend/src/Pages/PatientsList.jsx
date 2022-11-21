import { Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CCreateButton from '../Components/CCreateButton';
import CDataGrid from '../Components/CDataGrid';

function PatientsList() {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Patients</h1>
      <CCreateButton
        txtButton="Adicionar paciente"
        callback={ () => navigate('/cadastro') }
      />
      <CDataGrid />
    </Container>
  );
}

export default PatientsList;
