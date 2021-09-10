export const INPUT_ID = 'INPUT_ID';

export function inputId (idValue) {
  return {
    type: INPUT_ID,
    payload: {
      idValue
    }
  };
}
