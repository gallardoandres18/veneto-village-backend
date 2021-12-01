export const getDateNowString = () => {
  return new Date()
    .toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
    .split(' ')[0];
};

export const findDuplicate = (array) =>
  array.filter((item, index) => array.indexOf(item) !== index);
