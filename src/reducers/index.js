import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import cards from './cards';

export default combineReducers({
    cards,
    form: formReducer,
})