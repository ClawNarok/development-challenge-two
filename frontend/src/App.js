import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import PatientsProvider from './Context/PatientsProvider';
import PatientsList from './Pages/PatientsList';

function App() {
  return (
    <PatientsProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={ <PatientsList /> }
            exact
          />
        </Routes>
      </BrowserRouter>
    </PatientsProvider>
  );
}

export default App;
