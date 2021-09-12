export const INPUT_ID = 'INPUT_ID';
export const INPUT_PW = 'INPUT_PW';

export function inputIdValue (inputId) {
  return {
    type: INPUT_ID,
    payload: {
      inputId: inputId
    }
  };
}

export function inputPWValue (inputPW) {
  return {
    type: INPUT_PW,
    payload: {
      inputPW: inputPW
    }
  };
}
