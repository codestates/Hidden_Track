import { createStore } from 'redux';
import inputIdReducer from './reducers';

const store = createStore(inputIdReducer);

export default store;
