
import { initialState } from '../../arrays/cards';

export default function deckReducer(state = initialState, action) {
    switch (action.type) {
        case 'deck/shuffle':
            return {
                ...state,
                myDeck: action.myDeck,
                yourDeck: action.yourDeck,
                mySlop: [],
                yourSlop: [],
                cards: action.cards,
                play: false,
                eventMsg: null,
                score: {player: state.score.player + action.player, enemy: state.score.enemy + action.enemy}
            }
        case 'deck/putMyCard':
            return {
                ...state,
                mySlop: action.target === 4 ? [...state.mySlop, state.cards[action.target]] : [...state.mySlop],
                yourSlop: action.target === 3 ? [...state.yourSlop, state.cards[action.target]] : [...state.yourSlop],
                // sloppy: [...state.sloppy, state.cards[action.target]],
                cards: state.cards.map((item, x) => {
                    if (x === action.lifted) {
                        return state.myDeck[0];
                    } else if (x === action.target) {
                        return state.cards[action.lifted];
                    } else {
                        return item;
                    }
                }),
                myDeck: state.myDeck.slice(1),
            }
        case 'deck/putYourCard':
            return {
                ...state,
                mySlop: action.target === 4 ? [...state.mySlop, state.cards[action.target]] : [...state.mySlop],
                yourSlop: action.target === 3 ? [...state.yourSlop, state.cards[action.target]] : [...state.yourSlop],
                // sloppy: [...state.sloppy, state.cards[action.target]],
                cards: state.cards.map((item, x) => {
                    if (x === action.lifted) {
                        return state.yourDeck[0];
                    } else if (x === action.target) {
                        return state.cards[action.lifted];
                    } else {
                        return item;
                    }
                }),
                yourDeck: state.yourDeck.slice(1)
            }
        case 'deck/newDeal':
            return {
                ...state,
                mySlop: state.cards[4] ? [...state.mySlop, state.cards[4]] : [...state.mySlop],
                yourSlop: state.cards[3] ? [...state.yourSlop, state.cards[3]] : [...state.yourSlop],
                // sloppy: state.cards[3] && state.cards[4] ? [...state.sloppy, state.cards[3], state.cards[4]] : [...state.sloppy],
                cards: state.cards.map((item, x) => {
                    if (x === 3) {
                      return state.yourDeck[0];
                    } if (x === 4) {
                        return state.myDeck[0];
                    } else {
                      return item;
                    }
                }),
                myDeck: state.myDeck.slice(1),
                yourDeck: state.yourDeck.slice(1),
                draw: true,
                eventMsg: null,
            }
        case 'deck/myStress':
            return {
                ...state,
                yourDeck: [...state.yourDeck, ...state.mySlop, ...state.yourSlop, state.cards[3], state.cards[4]],
                mySlop: [],
                yourSlop: [],
                stress: false,
                play: false,
                cards: state.cards.map((item, x) => {
                    if (x === 3 || x === 4) {
                      return null;
                    } else {
                      return item;
                    }
                })
            }
        case 'deck/yourStress':
            return {
                ...state,
                myDeck: [...state.myDeck, ...state.mySlop, ...state.yourSlop, state.cards[3], state.cards[4]],
                mySlop: [],
                yourSlop: [],
                stress: false,
                play: false,
                cards: state.cards.map((item, x) => {
                    if (x === 3 || x === 4) {
                      return null;
                    } else {
                      return item;
                    }
                })
            }
        case 'deck/handlePause':
            return {
                ...state,
                play: !state.play,
                paused: !state.paused
            }
        case 'deck/setStress':
            return {
                ...state,
                stress: action.stress
            }
        case 'deck/setEventMsg':
            return {
                ...state,
                play: false,
                eventMsg: action.eventMsg,
            }
        case 'deck/play':
            return {
                ...state,
                play: true,
                draw: false,
            }
        case 'deck/dealMyCard':
            return {
                ...state,
                cards: state.cards.map((item, x) => {
                    if (x === action.card) {
                        return state.myDeck[0];
                    } else {
                      return item;
                    }
                }),
                myDeck: state.myDeck.slice(1),
            }
        case 'deck/dealYourCard':
            return {
                ...state,
                cards: state.cards.map((item, x) => {
                    if (x === action.card) {
                        return state.yourDeck[0];
                    } else {
                        return item;
                    }
                }),
                yourDeck: state.yourDeck.slice(1),
            }
        default:
            return state
    }
}