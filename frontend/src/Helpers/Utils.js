const States = [
  {
    acronym: 'AC',
  },
  {
    acronym: 'AL',
  },
  {
    acronym: 'AP',
  },
  {
    acronym: 'AM',
  },
  {
    acronym: 'BA',
  },
  {
    acronym: 'CE',
  },
  {
    acronym: 'DF',
  },
  {
    acronym: 'ES',
  },
  {
    acronym: 'GO',
  },
  {
    acronym: 'MA',
  },
  {
    acronym: 'MT',
  },
  {
    acronym: 'MS',
  },
  {
    acronym: 'MG',
  },
  {
    acronym: 'PA',
  },
  {
    acronym: 'PB',
  },
  {
    acronym: 'PR',
  },
  {
    acronym: 'PE',
  },
  {
    acronym: 'PI',
  },
  {
    acronym: 'RJ',
  },
  {
    acronym: 'RN',
  },
  {
    acronym: 'RS',
  },
  {
    acronym: 'RO',
  },
  {
    acronym: 'RR',
  },
  {
    acronym: 'SC',
  },
  {
    acronym: 'SP',
  },
  {
    acronym: 'SE',
  },
  {
    acronym: 'TO',
  },
];

const formatDate = (bDate) => `${('0'+ bDate.date()).slice(-2)}/${bDate.month() + 1}/${bDate.year()}`;

const isPositiveNumber = (n) => (!Number.isNaN(n)
  && parseInt(n, 10) > 0 && parseInt(n, 10) === Number(n)
  && (parseInt(n, 10)).toString() === n);

export { States, formatDate, isPositiveNumber };
