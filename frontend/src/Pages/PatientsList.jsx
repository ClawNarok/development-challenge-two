import React, { useContext, useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import PatientsContext from '../Context/PatientsContext';
import CButton from '../Components/CButton';
import CDataGrid from '../Components/CDataGrid';
import Icons from '../Helpers/Icons';
import CFilter from '../Components/CFilter';

function PatientsList() {
  const navigate = useNavigate();
  const [patientId, setpatientId] = useState('');
  const { getPatients } = useContext(PatientsContext);
  const { deletePatient } = useContext(PatientsContext);

  useEffect(() => {
    getPatients();
  }, []);

  const reqDeletePatient = async (id) => {
    await deletePatient(id);
    setpatientId('');
  };

  return (
    <Container>
      <h1>Lista de pacientes</h1>
      <CButton
        txtButton="Adicionar paciente"
        callback={ () => navigate('/cadastrar') }
        icon={ Icons.Add }
      />
      <CButton
        txtButton="Editar paciente"
        callback={ () => navigate(`editar/${patientId}`) }
        disabled={ !patientId }
        icon={ Icons.Edit }
      />
      <CButton
        txtButton="Deletar paciente"
        callback={ () => reqDeletePatient(patientId) }
        disabled={ !patientId }
        icon={ Icons.Delete }
      />
      <CFilter />
      <Box style={ { height: 400, width: '100%' } }>
        <CDataGrid
          callback={ (value) => setpatientId(value) }
        />
      </Box>
    </Container>
  );
}

export default PatientsList;
