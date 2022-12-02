import React, { useEffect, useState, useContext } from 'react';
import { FormControl, MenuItem, TextField } from "@mui/material";
import { Box } from '@mui/system';
import CFindTextField from './Filter/CFindTextField';
import CFindSelectDate from './Filter/CFindSelectDate';
import CFindNumberField from './Filter/CFindNumberField';
import CFindButton from './Filter/CFindButton';
import PatientsContext from '../Context/PatientsContext';

const comparisonFunc = {
  maior_que: (value, target) => (Number(value) > Number(target)),
  menor_que: (value, target) => (Number(value) < Number(target)),
  igual_a: (value, target) => (Number(value) === Number(target)),
};

function CFilter() {
  const [filter, setFilter] = useState('');
  const [filterList, setFilterList] = useState([]);
  const [usedFilters, setUsedFilters] = useState([]);
  const { patients, patientsFiltered, setPatientsFiltered } = useContext(PatientsContext);

  useEffect(() => {
    setFilter(allFilters[0]);
    setFilterList(allFilters);
  }, []);

  useEffect(() => {
    if (usedFilters.length === 0) {
      setPatientsFiltered(patients);
      setFilter(allFilters[0]);
      setFilterList(allFilters);
    } else {
      let newPatients = patients;
      usedFilters.forEach((item) => {
        newPatients = apllyFilter(item, newPatients);
      });
      setPatientsFiltered(newPatients);
      const newFilterList = allFilters.filter((item) => {
        if (usedFilters.every((used) => used.name !== item)) return item;
      });
      setFilterList(newFilterList);
      setFilter(newFilterList[0]);
    }
  }, [usedFilters]);

  const addFilter = (obj) => {
    setUsedFilters([...usedFilters, obj]);
  };

  const delFilter = (name) => {
    const newFilters = usedFilters.filter((item) => item.name != name);
    setUsedFilters(newFilters);
  };

  const apllyFilter = (opt, list) => {
    let newPatients = list;
    switch (opt.name) {
      case 'birthDate':
        if (opt.year) {
          newPatients = newPatients.filter((item) => {
            const pYear = item.birthDate.split('/')[2];
            return comparisonFunc[opt.comparison](pYear, opt.year);
          });
        }
        if (opt.month) {
          newPatients = newPatients.filter((item) => {
            const pMonth = item.birthDate.split('/')[1];
            return comparisonFunc[opt.comparison](pMonth, opt.month);
          });
        }
        if (opt.day) {
          newPatients = newPatients.filter((item) => {
            const pDay = item.birthDate.split('/')[1];
            return comparisonFunc[opt.comparison](pDay, opt.day);
          });
        }
        break;
      case 'addressNumber':
        newPatients = newPatients.filter((item) => parseInt(item[opt.name]) === parseInt(opt.value));
      case 'postal':
        newPatients = newPatients.filter((item) => item[opt.name] === opt.value);
      default:
        newPatients = newPatients.filter((item) => item[opt.name].toLowerCase().includes(opt.value.toLowerCase()));
        break;
    }
    return newPatients;
  };

  const addFilterOption = (option) => {
    const obj ={
      name: filter,
      ...option
    };
    addFilter(obj);
  };

  const listComponents = {
    'firstName': {
      name: 'Nome',
      component: <CFindTextField callback={ addFilterOption } />,
    },
    'lastName': {
      name: 'Sobrenome',
      component: <CFindTextField callback={ addFilterOption } />,
    },
    'birthDate': {
      name: 'Data de nascimento',
      component: <CFindSelectDate callback={ addFilterOption } />,
    },
    'email': {
      name: 'Email',
      component: <CFindTextField callback={ addFilterOption } />,
    },
    'addressName': {
      name: 'Endereço',
      component: <CFindTextField callback={ addFilterOption } />,
    },
    'addressNumber': {
      name: 'Número',
      component: <CFindNumberField callback={ addFilterOption } />,
    },
    'neighborhood': {
      name: 'Bairro',
      component: <CFindTextField callback={ addFilterOption } />,
    },
    'city': {
      name: 'Cidade',
      component: <CFindTextField callback={ addFilterOption } />,
    },
    'state': {
      name: 'Estado',
      component: <CFindTextField callback={ addFilterOption } />,
    },
    'postal': {
      name: 'CEP',
      component: <CFindTextField callback={ addFilterOption } />,
    },
  };

  const allFilters = Object.keys(listComponents);

  return(
    <>
      <Box
        component="form"
        sx={ {
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        } }
        noValidate
        autoComplete="off"
      >
        <FormControl>
          <TextField
            id="outlined"
            select
            size="small"
            label="Filtro"
            value={filter}
            onChange={ ({ target }) => setFilter(target.value) }
            helperText="Selecione o campo da busca"
          >
            { filterList.map((item, x) => 
              (<MenuItem key={x} value={ item }>
                { listComponents[item].name }
              </MenuItem>)
            ) }
          </TextField>
        </FormControl>
        { filter && listComponents[filter].component }
      </Box>
      <Box>
        { usedFilters.length !== 0 &&
          usedFilters.map((item, x) => (
            <CFindButton
              key={ x }
              txtButton={ `${listComponents[item.name].name}: ${item.value}` }
              callback={ () => delFilter(item.name) }
            />
          ))
        }
      </Box>
    </>
  );
}

export default CFilter;
