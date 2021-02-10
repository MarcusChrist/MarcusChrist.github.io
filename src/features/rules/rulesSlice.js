
// import { initialState } from '../../arrays/cards';
const initialState = {
    stress: false,
    draw: false,
    eventMsg: null,
    botLevel: 4000,
    play: false,
    paused: false,
}

export default function rulesReducer(state = initialState, action) {
    switch (action.type) {
        case 'rules/stress':
            return { ...state,
                stress: action.stress
            }
        case 'rules/pause':
            return { ...state,
                paused: action.paused,
                play: action.play
            }
        case 'rules/botLevel':
            return { ...state,
                botLevel: action.botLevel
            }
        case 'rules/gameOver':
            return { ...state,
                eventMsg: action.eventMsg,
                play: false
            }
        case 'rules/eventMsg':
            return { ...state,
                eventMsg: action.eventMsg
            }
        case 'rules/getReady':
            return { ...state,
                eventMsg: null,
                draw: true,
                play: false
            }
        case 'rules/go':
            return { ...state,
                draw: null,
                play: true
            }
        default:
            return state
    }
}