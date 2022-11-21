import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';

function CDataGrid() {
  const columnName = [
    { field: 'name', headerName: 'Nome', width: 210 },
    { field: 'birthDate', headerName: 'Data de nascimento', width: 130 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'addressName', headerName: 'Endereço', width: 210 },
    { field: 'addressNumber', headerName: 'Número', width: 70 },
    { field: 'city', headerName: 'Cidade', width: 130 },
    { field: 'state', headerName: 'Estado', width: 70 },
    { field: 'postal', headerName: 'CEP', width: 130 },
  ];
  const rows = [];
  const COUNTROWS = 5;
  return (
    <Box style={ { height: 400, width: '100%' } }>
      <DataGrid
        columns={ columnName }
        rows={ rows }
        pageSize={ 5 }
        rowsPerPageOptions={ [COUNTROWS] }
      />
    </Box>
  );
}

export default CDataGrid;
