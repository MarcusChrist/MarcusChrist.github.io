
import { initialStateLifted } from '../../arrays/cards';

export default function liftedReducer(state = initialStateLifted, action) {
    switch (action.type) {
        case 'lifted/start':
            return {
                ...state,
                startPos: {
                    x: action.startPos.x,
                    y: action.startPos.y,
                }
            }
        case 'lifted/end':
            return {
                ...state,
                endPos: {
                    x: action.endPos.x,
                    y: action.endPos.y,
                }
            }
        default:
            return state
    }
}