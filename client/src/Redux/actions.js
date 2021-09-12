export const INPUT_ID = 'INPUT_ID';

export function inputId (inputId) {
  return {
    type: INPUT_ID,
    payload: {
      inputId: inputId
    }
  };
}
