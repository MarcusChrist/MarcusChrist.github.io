import React from 'react';
import '../../assets/css/cards.css';
import { initialStateLifted } from '../../arrays/cards';
import liftedReducer from '../../features/lifted/liftedSlice';

export const MovableCard = (props) => {
    const { card, cardNumber, drag, handleMovableCard } =  props;
    const [lifted, dispatch] = React.useReducer(liftedReducer, initialStateLifted);

    const handleMove = (box) => e => {
        // grab the location of touch
        var touchLocation = e.targetTouches[0];
        
        // assign box new coordinates based on the touch.
        box.style.left = touchLocation.pageX + 'px';
        box.style.top = touchLocation.pageY + 'px';
    }

    const handleEnd = (box) => e => {
        box.removeEventListener('touchmove', handleMove(box));
        // current box position.
        dispatch({type: 'lifted/end', endPos: {x: parseInt(box.style.left), y: parseInt(box.style.top)} });
        box.style.left = lifted.startPos.x;
        box.style.top = lifted.startPos.y;
        const temp = handleMovableCard(cardNumber, lifted.endPos.x, lifted.endPos.y);
        // console.log(temp);
        // if (temp) {
        //     box.style.left = temp.x;
        //     box.style.top = temp.y;
        // } else {
        //     box.style.left = startPos.x;
        //     box.style.top = startPos.y;
        // }
    }
    // document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('card-' + cardNumber)) {
        // find the element that you want to drag.
        var box = document.getElementById('card-' + cardNumber);
        if (lifted.startPos.x === 0) {
            console.log(lifted.startPos.x);
            dispatch({type: 'lifted/start', startPos: {x: parseInt(box.style.left), y: parseInt(box.style.top)} });
        }
        
        /* listen to the touchMove event,
        every time it fires, grab the location
        of touch and assign it to box */
        box.addEventListener('touchmove', handleMove(box)); 
        
        /* record the position of the touch
        when released using touchend event.
        This will be the drop position. */
        box.addEventListener('touchend', handleEnd(box));
    }
    // }, false);
    return ( 
        <img id={"card-" + cardNumber} src={card.src} className="deckcard movable" alt="card" draggable="true" onDragStart={drag}/>
    );
};