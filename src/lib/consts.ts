export const Days = [
  { id: 1, name: 'ראשון' },
  { id: 2, name: 'שני' },
  { id: 3, name: 'שלישי' },
  { id: 4, name: 'רביעי' },
  { id: 5, name: 'חמישי' },
  { id: 6, name: 'שישי' },
  { id: 7, name: 'שבת' }
] as const;

const URL_LENGTH = 8;

export const getRandomString = (length: number = URL_LENGTH) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
