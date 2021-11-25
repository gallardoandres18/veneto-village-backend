export const getDateNowString = () => {
  return new Date()
    .toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
    .split(' ')[0];
};
