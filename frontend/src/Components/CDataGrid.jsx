import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import PatientsContext from '../Context/PatientsContext';

function CDataGrid({ callback }) {
  const { patients } = useContext(PatientsContext);
  const columnName = [
    { field: 'firstName', headerName: 'Nome', width: 210 },
    { field: 'lastName', headerName: 'Sobrenome', width: 210 },
    { field: 'birthDate', headerName: 'Data de nascimento', width: 130 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'addressName', headerName: 'Endereço', width: 210 },
    { field: 'addressNumber', headerName: 'Número', width: 70 },
    { field: 'complement', headerName: 'Complemento', width: 90 },
    { field: 'neighborhood', headerName: 'Bairro', width: 100 },
    { field: 'city', headerName: 'Cidade', width: 130 },
    { field: 'state', headerName: 'Estado', width: 70 },
    { field: 'postal', headerName: 'CEP', width: 100 },
  ];

  // const rows = [];
  const COUNTROWS = 5;
  return (
    <DataGrid
      columns={ columnName }
      rows={ patients }
      pageSize={ 5 }
      rowsPerPageOptions={ [COUNTROWS] }
      onCellClick={ (cell) => callback(cell.id) }
      hideFooterSelectedRowCount
    />
  );
}

CDataGrid.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default CDataGrid;
