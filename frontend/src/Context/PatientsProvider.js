import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import PatientsContext from './PatientsContext';
import {
  getAllPatients,
  getPatientById,
  addPatient,
  updatePatientById,
  deletePatientById } from '../Services/Requests';

function PatientsProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [patientsFiltered, setPatientsFiltered] = useState([]);

  const getPatients = async () => {
    const retorno = await getAllPatients();
    setPatients(retorno);
    setPatientsFiltered(retorno);
  };

  const deletePatient = async (id) => {
    await deletePatientById(id);
    await getPatients();
  };

  const createPatient = async (body) => {
    await addPatient(body);
    await getPatients();
  };

  const updatePatient = async (body, id) => {
    await updatePatientById(body, id);
    await getPatients();
  };

  const getById = async (id, callback) => {
    const retorno = await getPatientById(id);
    callback(retorno);
  };

  const memo = useMemo(() => {
    const values = {
      patients,
      setPatients,
      patientsFiltered,
      setPatientsFiltered,
      getPatients,
      getById,
      createPatient,
      updatePatient,
      deletePatient,
    };
    return values;
  }, [patients, patientsFiltered]);

  return (
    <PatientsContext.Provider value={ memo }>
      { children }
    </PatientsContext.Provider>
  );
}

PatientsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PatientsProvider;
