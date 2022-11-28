import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PatientsProvider from './Context/PatientsProvider';
import PatientsList from './Pages/PatientsList';
import AddPatients from './Pages/AddPatients';

function App() {
  return (
    <PatientsProvider>
      <LocalizationProvider dateAdapter={ AdapterDayjs }>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={ <PatientsList /> }
              exact
            />
            <Route
              path="/cadastrar"
              element={ <AddPatients /> }
              exact
            />
            <Route
              path="/editar/:id"
              element={ <AddPatients /> }
              exact
            />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </PatientsProvider>
  );
}

export default App;
