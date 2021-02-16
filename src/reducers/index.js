import { combineReducers } from 'redux'

import stressReducer from './deckSlice'
import tianReducer from './tianSlice'

const rootReducer = combineReducers({
    stress: stressReducer,
    tian: tianReducer
});

export default rootReducer;