import React from 'react';
import { useNavigate } from 'react-router-dom';
import CCreateButton from '../Components/CCreateButton';

function PatientsList() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Patients</h1>
      <CCreateButton
        txtButton="Adicionar paciente"
        callback={ () => navigate('/cadastro') }
      />
    </>
  );
}

export default PatientsList;
