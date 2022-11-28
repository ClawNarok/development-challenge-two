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

  const getPatients = async () => {
    const retorno = await getAllPatients();
    setPatients(retorno);
  };

  const deletePatient = async (id) => {
    await deletePatientById(id);
    const retorno = await getAllPatients();
    setPatients(retorno);
  };

  const createPatient = async (body) => {
    await addPatient(body);
    const retorno = await getAllPatients();
    setPatients(retorno);
  };

  const updatePatient = async (body, id) => {
    await updatePatientById(body, id);
    const retorno = await getAllPatients();
    setPatients(retorno);
  };

  const getById = async (id, callback) => {
    const retorno = await getPatientById(id);
    callback(retorno);
  };

  const memo = useMemo(() => {
    const values = {
      patients,
      setPatients,
      getPatients,
      getById,
      createPatient,
      updatePatient,
      deletePatient,
    };
    return values;
  }, [patients]);

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
