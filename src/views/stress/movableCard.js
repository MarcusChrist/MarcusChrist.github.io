import React from 'react';
import '../../assets/css/cards.css';

export const MovableCard = (props) => {
    const { startx, starty, card, cardNumber, drag, handleMovableCard } =  props;

    const handleMove = (box) => e => {
        // grab the location of touch
        var touchLocation = e.targetTouches[0];
        
        // assign box new coordinates based on the touch.
        box.style.left = touchLocation.pageX + 'px';
        box.style.top = touchLocation.pageY + 'px';
    }
    
    const handleEnd = (box, callback) => e => {
        box.removeEventListener('touchmove', handleMove(box));
        // current box position.
        var x = parseInt(box.style.left);
        var y = parseInt(box.style.top);

        box.style.left = startx + "px";
        box.style.top = starty + "px";

        callback(x, y);
    }
    const checkCard = (x, y) => {
        handleMovableCard(cardNumber, x, y);
    }
    if (document.getElementById('card-' + cardNumber)) {
        // find the element that you want to drag.
        var box = document.getElementById('card-' + cardNumber);
        /* listen to the touchMove event,
        every time it fires, grab the location
        of touch and assign it to box */
        box.addEventListener('touchmove', handleMove(box)); 
        
        /* record the position of the touch
        when released using touchend event.
        This will be the drop position. */
        box.addEventListener('touchend', handleEnd(box, checkCard));
    
    }
    return ( 
        <img id={"card-" + cardNumber} src={card.src} className="deckcard movable" alt="card" draggable="true" onDragStart={drag}/>
    );
};