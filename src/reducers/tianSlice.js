
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
                piles: state.piles.map((pile, x) => {
                    if (x === Number(action.nr)) {
                        const temp = {...state.deck[0]};
                        temp.cn = "move-" + x;
                        if (pile[0].card === "Unknown") {
                            return [temp];
                        } else {
                            return pile.concat(temp);
                        }
                    } else {
                        return pile;
                    }
                }),
                deck: state.deck.slice(1),
            }
        case 'tian/movedToPile':
            return {
                ...state, 
                piles: state.piles.map((pile, x) => {
                    if (x === action.nr) {
                        const temp = [...state.piles[x]];
                        temp[action.last].cn = "";
                        return temp;
                    } else {
                        return pile;
                    }
                }),
                
            }
        case 'tian/test':
            return {
                ...state, 
                piles: state.piles.map((pile, x) => {
                    const temp = [...state.piles[x]];
                    temp[1].cn = "move-1";
                    return temp;
                }),
            }
        case 'tian/swapPile':
            console.log(action.liftedPile, action.liftedCard, action.targetPile, action.targetCard)
            return {
                ...state,
                piles: state.piles.map((pile, i) => {
                    if (i === Number(action.liftedPile)) {
                        //all cards remain in lifted thats not equal to lifted
                        const liftedPile = state.piles[action.liftedPile].filter((card, index) => {
                            if ((index === 0 || action.liftedPile === 6) && card.card !== state.piles[action.liftedPile][action.liftedCard].card) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                        console.log(liftedPile);
                        //add target cards to lifted
                        const liftedPileAdd = state.piles[action.targetPile].filter((card, index) => {
                            if (index !== 0 && card.card === state.piles[action.targetPile][action.targetCard].card) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                        console.log(liftedPileAdd);
                        return liftedPile.concat(liftedPileAdd);
                    } else if (i === Number(action.targetPile)) {
                        //all cards remain in target thats equal to index 0 (except if pile is player-hand) and equal to lifted
                        const targetPile = state.piles[action.targetPile].filter((card, index) => {
                            if ((index === 0 && action.targetPile !== 6) || card.card === state.piles[action.liftedPile][action.liftedCard].card) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                        console.log(targetPile)
                        //add target cards to lifted
                        const targetPileAdd = state.piles[action.liftedPile].filter((card, index) => {
                            if (index !== 0 || action.targetPile === 6 || card.card === state.piles[action.liftedPile][action.liftedCard].card) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                        console.log(targetPileAdd)
                        return targetPile.concat(targetPileAdd);
                    } else {
                        return pile;
                    }
                })
            }
        default:
            return state
    }
}
// if (i == action.liftedPile) {
//     const liftedPile = [...state.piles[action.liftedPile]];
//     console.log(liftedPile);
//     liftedPile[action.liftedCard] = state.piles[action.targetPile][action.targetCard];
//     console.log(liftedPile);
//     return liftedPile;
// } else if (i == action.targetPile) {
//     const targetPile = [...state.piles[action.targetPile]];
//     console.log(targetPile);
//     targetPile[action.targetCard] = state.piles[action.liftedPile][action.liftedCard];
//     console.log(targetPile);
//     return targetPile;
// } else {
//     console.log(i);
//     return pile;
// }