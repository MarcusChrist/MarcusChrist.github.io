import { combineReducers } from 'redux'

import deckReducer from './features/deck/deckSlice'
import rulesReducer from './features/rules/rulesSlice'

const rootReducer = combineReducers({
    deck: deckReducer,
    rules: rulesReducer
});

export default rootReducer;