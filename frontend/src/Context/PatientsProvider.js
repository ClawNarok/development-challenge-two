import React, { useState } from 'react';
import PatientsContext from './PatientsContext';

function PatientsProvider({ children }) {
  const [patients, setPatients] = useState([]);

  const contextValue = {
    patients,
    setPatients,
  };

  return (
    <PatientsContext.Provider value={ contextValue }>
      { children }
    </PatientsContext.Provider>
  )
}

export default PatientsProvider;
