import { createStore } from 'redux';
import authReducer from '../reducers/reducer';

const store = createStore(authReducer);

export default store;