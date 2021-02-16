import React from 'react';

export const useInterval = (callback, delay) => {
    const savedCallback = React.useRef();

    // Remember the latest callback.
    React.useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    React.useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
}

export const botAction = (cards, moveCard, handleStress) => {
    var target1 = Number(cards[3].card);
    var target2 = Number(cards[4].card);
    if (target1 === target2) {
      handleStress(false);
    } else {
      let found;
      for (var i = 5; i < 8; i++) {
        if (!cards[i]) continue;
        let temp = Number(cards[i].card);
        if (temp + 1 === target1 || temp - 1 === target1 || (temp === 1 && target1 === 13) || (temp === 13 && target1 === 1)) {
          found = 3;
          break;
        } else if (temp + 1 === target2 || temp - 1 === target2 || (temp === 1 && target2 === 13) || (temp === 13 && target2 === 1)) {
          found = 4;
          break;
        }
      };
      if (found) {
        moveCard(i, "putYourCard", found);
      }
    }
}
