import { createStore } from 'redux'
import rootReducer from './reducer'

let preloadedState;
const persistedTodosString = localStorage.getItem('stress-game');

if (persistedTodosString) {
    // const answer = window.confirm('Do you want to start where you left off?');
    const answer = false;
    if (answer) {
        var temp = JSON.parse(persistedTodosString);
        preloadedState = {
            deck: temp.deck,
            rules: temp.rules
        }
        localStorage.removeItem('stress-game');
    }
}

const store = createStore(rootReducer, preloadedState)

export default store