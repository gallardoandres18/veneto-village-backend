export const getDateNowString = () => {
  return new Date()
    .toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
    .split(' ')[0];
};

export const findDuplicate = (array) =>
  array.filter((item, index) => array.indexOf(item) !== index);

export const NUMBER_OF_STADIUM = {
  PADDLE_A: 1,
  PADDLE_B: 2,
  FOOTBALL: 1,
  TENNIS: 1,
  BOWLING_A: 1,
  BOWLING_B: 1,
};
