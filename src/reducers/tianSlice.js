
import { initialStateTian, unknownCard } from '../arrays/cards';

export default function tianReducer(state = initialStateTian, action) {
    switch (action.type) {
        case 'tian/shuffle':
            return {
                ...state,
                deck: action.deck,
                piles: [[unknownCard],[unknownCard],[unknownCard],[unknownCard],[unknownCard],[unknownCard],[unknownCard],[unknownCard]],
                play: false,
                eventMsg: null,
                score: {player: state.score.player + action.player, enemy: state.score.enemy + action.enemy}
            } 
        case 'tian/handlePause':
            return {
                ...state,
                paused: !state.paused
            }
        case 'tian/setEventMsg':
            return {
                ...state,
                eventMsg: action.eventMsg,
            }
        case 'tian/play':
            return {
                ...state,
                play: true,
            }
        case 'tian/moveToPile':
            return {
                ...state,
                piles: state.piles.map((item, x) => {
                    if (x === action.nr) {
                        if (item[0].card === "Unknown") {
                            return [state.deck[0]];
                        } else {
                            return item.concat(state.deck[0]);
                        }
                    } else {
                        return item;
                    }
                }),
                deck: state.deck.slice(1),
            }
        default:
            return state
    }
}