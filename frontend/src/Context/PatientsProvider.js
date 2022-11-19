import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import PatientsContext from './PatientsContext';

function PatientsProvider({ children }) {
  const [patients, setPatients] = useState([]);

  const memo = useMemo(() => {
    const values = {
      patients,
      setPatients,
    };
    return values;
  }, []);

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
