import React from 'react';

import './assets/css/cards.css';
import { unknownCard, initiateCards, deckArray, initialState } from './arrays/cards';
import { shuffle } from './views/stress/utils';
import deckReducer from './features/deck/deckSlice';

function App() {
  const [deck, dispatch] = React.useReducer(deckReducer, initialState);
  const [stress, setStress] = React.useState(false);
  const [liftedCard, setLiftedCard] = React.useState(null);
  const [draw, setDraw] = React.useState(false);
  const [eventMsg, setEventMsg] = React.useState(null);
  const [botLevel, setBotLevel] = React.useState(4000);
  const [play, setPlay] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [score, setScore] = React.useState({my: 0, your: 0});

  let cancelled = false;

  React.useEffect(() => {
    refresh();
    return () => {
      cancelled = true;
    }
  }, []);

  React.useEffect(() => {
    console.log("cancel:", cancelled, "stress:", stress, "play:", play)
    if (cancelled) return;
    if (stress) {
      setStress(false);
    }
    if (play) {
      checkCards(deck.cards);
    }
  }, [deck]);

  const refresh = () => {
    shuffle().then((result) => {
      if (cancelled) return;
      dispatch({type: 'deck/shuffle', payload: { myDeck: result[0], yourDeck: result[1], cards: result[2], sloppy: [], } });
    });
  }
  
  const handlePause = () => {
    setPlay(!play); 
    setPaused(!paused);
  }
  const handleLevel = (level) => (e) => {
    setBotLevel(level);
  }
  const handleLevelManual = (level) => {
    setBotLevel(level);
  }

  const useInterval = (callback, delay) => {
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

  useInterval(() => {
    if (!play || cancelled || (!deck.cards[3] && !deck.cards[4])) return;
    var target1 = Number(deck.cards[3].card);
    var target2 = Number(deck.cards[4].card);
    if (target1 === target2) {
      handleStress(false);
      return;
    }
    for (var i = 5; i < 8; i++) {
      if (!deck.cards[i]) continue;
      let temp = Number(deck.cards[i].card);
      if (temp + 1 === target1 || temp - 1 === target1 || (temp === 1 && target1 === 13) || (temp === 13 && target1 === 1)) {
        dispatch({ type: 'deck/putYourCard', lifted: i, target: 3 });
        break;
      } else if (temp + 1 === target2 || temp - 1 === target2 || (temp === 1 && target2 === 13) || (temp === 13 && target2 === 1)) {
        dispatch({ type: 'deck/putYourCard', lifted: i, target: 4 });
        break;
      }
    };
  }, botLevel);

  const handleMyStress = e => {
    handleStress(true);
  }

  const allowDrop = (e) => {
    e.preventDefault();
  }

  const drag = (e) => {
    setLiftedCard(e.target.id);
  }

  const drop = (e) => {
    console.log(liftedCard);
    e.preventDefault();
    if (!liftedCard) return;
    var lifted = deck.cards[liftedCard.substr(5, 1)];
    var target = deck.cards[e.target.id.substr(5, 1)];
    console.log(target);
    if (!target) return;
    var card1 = Number(lifted.card);
    var card2 = Number(target.card);
    if (card1 + 1 === card2 || card1 - 1 === card2 || (card1 === 1 && card2 === 13) || (card1 === 13 && card2 === 1)) {
      dispatch({ type: 'deck/putMyCard', lifted: Number(liftedCard.substr(5, 1)), target: Number(e.target.id.substr(5, 1)) });
    }
  }
  const handleStart = e => {
    newDraw("Starting...");
  }

  const checkCards = (list) => {
    console.log(list);
    //Checks if cards are valid for play or a draw needs to be set up.
    if (!list[3] || !list[4] || cancelled) return;
    var valid = false;
    var target1 = Number(list[3].card);
    var target2 = Number(list[4].card);
    if (target1 === target2 && target1 !== (undefined || null)) {
      //Stress starts if both targets are the same, BotStress is a timer for when the bot will "press the button"
      setStress(true);
    } else if (stress) {
      //Cancel stress if targets are not the same (no stress) and stress still active
      setStress(false);
    }
    for (var i = 0; i < 8; i++) {
      if (i === 3 || i === 4 || !list[i]) continue;
      let temp = Number(list[i].card);
      //Checks if any of the players have a card to put on any of the targets
      if (temp + 1 === target1 || temp - 1 === target1 || temp + 1 === target2 || temp - 1 === target2 ||
        (temp === 1 && (target1 === 13 || target2 === 13)) || (temp === 13 && (target1 === 1 || target2 === 1))) {
        valid = true;
      }
    };
    if (!valid && target1 !== target2) {
      if (!list[0] && !list[1] && !list[2]) {
        //Win
        gameOver("YOU WON", { myScore: 1, yourScore: 0 });
      } else if (!list[5] && !list[6] && !list[7]) {
        //Loose
        gameOver("EPIC FAIL", { myScore: 0, yourScore: 1 });
      } else if (deck.myDeck.length < 1 && deck.yourDeck.length < 1) {
        //No valid cards in play and no more cards to draw: undecided victory
        gameOver("Draw", { myScore: 0, yourScore: 0 });
      } else {
        //if no stress and no valid cards, execute new Draw
        newDraw("No valid cards");
      }
    }
  }
  const gameOver = (msg, points) => {
    console.log(points);
    setPlay(false);
    setEventMsg(msg);
    dispatch({type: 'deck/setScore', score: points });
    refresh();
    setTimeout(() => {
      setEventMsg(null);
    }, 5000);
  }

  const handleStress = (me) => {
    if (!stress || cancelled || !play) return;
    if (me) {
      dispatch({ type: 'deck/myStress' });
      newDraw("Success");
    } else {
      dispatch({ type: 'deck/yourStress' });
      newDraw("Fail");
    }
  }

  const newDraw = (msg) => {
    if (draw || eventMsg || cancelled) return;
    setEventMsg(msg);
    setTimeout(() => {
      setEventMsg(null);
      setDraw(true);
      setPlay(false); 
      setTimeout(() => {
        dispatch({type: 'deck/newDeal'});
        setTimeout(() => {
          setPlay(true);
          setDraw(null);
        }, 300);
      }, 2300);
    }, 2000);
  }

  // const showReport = () => {
  //   console.log(deck);
  // }

  return (
    <div className="container">
      {paused ? <div className="paused" onClick={handlePause}>
        <span className="pausedtext"><h3>Game round</h3>
          Stress is quite special unlike other games. In Stress, both players play at the same time and as fast as they want. Color does not matter in this games.
          <br/><h3>General rules</h3>
          Once the cards in the middle (1 from each deck) are dealt both players can deal their own cards on top of them. But this can only be done if the player's card is a denomination higher or lower than the game stack. So if there is a 4 in one pile and one player has a 5, 6 and a 9 then the player can first put a 5, then a 6. But the player may not add his 9 to the game pile becouse the 9 is not a denomination higher or lower of a 7. Ace counts as 14 and 1 so you can only add it on a king or a 2.
          <br/><h3>Refilling of cards</h3>
          When you lay cards, new cards from the player's deck of cards will move to your action cards.
          <br/><h3>Stress</h3>
          If both cards in the middle have equal numbers a "HIT" button will be displayed. Hit the button and your enemy will gets both piles added to their deck.
          <br/><h3>Goal</h3>
          To get rid of all your cards.
          <br/><br/><h2>Click anywhere to unpause.</h2></span>
      </div> : "" }
      {stress ? <>
        <div className="stressBtn" onClick={handleMyStress}>HIT</div>
        <img src={unknownCard.src} className="spinners top-left" alt="logo" />
        <img src={unknownCard.src} className="spinners top-right" alt="logo" />
        <img src={unknownCard.src} className="spinners bottom-left" alt="logo" />
        <img src={unknownCard.src} className="spinners bottom-right" alt="logo" />
      </> : ""}
      <div className="cardmenu">
        {/* <button onClick={showReport}>{"s: " + deck.sloppy.length + " my: " + deck.myDeck.length + " y: " + deck.yourDeck.length + 
          " c: " + deck.cards.length + " total: " + (deck.sloppy.length + deck.myDeck.length + deck.yourDeck.length + deck.cards.length)}</button> */}
        <button className={paused ? "btnpressed btnpaused" : ""} onClick={handlePause}>Information</button>
        <button className={botLevel === 4000 ? "btnpressed" : ""} onClick={handleLevel(4000)}>Easy</button>
        <button className={botLevel === 3000 ? "btnpressed" : ""} onClick={handleLevel(3000)}>Medium</button>
        <button className={botLevel === 2000 ? "btnpressed" : ""} onClick={handleLevel(2000)}>Hard</button>
        <button className={botLevel === 1000 ? "btnpressed" : ""} onClick={handleLevel(1000)}>Extreme</button>

        {/* <button onClick={newDraw("new Cards")}>New Cards</button> */}
      </div>
      {!play && !eventMsg && !draw ? <div className="startbtn" onClick={handleStart}><div className="startbtndiv"><a><p>
        <span className="bg"></span><span className="base"></span><span className="text">Click here to start</span></p></a></div></div> : "" }
    {eventMsg ? <div className="eventmsg">{eventMsg}</div> : ""}
    {draw ? <div className="countdown"></div> : ""}
      <div className="row">
        <div className="card-element yours">
          {deck.cards[5] ?
            <img id="card-5" src={deck.cards[5].src} className="deckcard" alt="card" draggable="false" />
            : ""}
        </div>
        <div className="card-element yours">
          {deck.cards[6] ?
            <img id="card-6" src={deck.cards[6].src} className="deckcard" alt="card" draggable="false" />
            : ""}
        </div>
        <div className="card-element yours">
          {deck.cards[7] ?
            <img id="card-7" src={deck.cards[7].src} className="deckcard" alt="card" draggable="false" />
            : ""}
        </div>
      </div>
      <div className="row">
        <div className="deck card-element target sidedecks">
          <div className="deck-amount">{deck.yourDeck.length}</div>
          {deck.yourDeck.length > 0 ?
            <img src={unknownCard.src} className="deckcard" alt="card" draggable="false" />
            : ""}
        </div>
        <div id="card-3-1" className="card-element target" onDrop={drop} onDragOver={allowDrop}>
          {deck.cards[3] && play ?
            <img id="card-3-2" src={deck.cards[3].src} className="deckcard" alt="card" draggable="false" />
            : ""}
        </div>
        <div id="card-4-1" className="card-element target" id={"target-2"} onDrop={drop} onDragOver={allowDrop}>
          {deck.cards[4] && play ?
            <img id="card-4-2" src={deck.cards[4].src} className="deckcard" alt="card" draggable="false" />
            : ""}
        </div>
        <div className="deck card-element target sidedecks">
          <div className="deck-amount">{deck.myDeck.length}</div>
          {deck.myDeck.length > 0 ?
            <img src={unknownCard.src} className="deckcard" alt="card" draggable="false" />
            : ""}
        </div>
      </div>
      <div className="row">
        <div className="card-element my">
          {deck.cards[0] ?
            <img id="card-0" src={deck.cards[0].src} className="deckcard" alt="card" draggable="true" onDragStart={drag} />
            : ""}
        </div>
        <div className="card-element my">
          {deck.cards[1] ?
            <img id="card-1" src={deck.cards[1].src} className="deckcard" alt="card" draggable="true" onDragStart={drag} />
            : ""}
        </div>
        <div className="card-element my">
          {deck.cards[2] ?
            <img id="card-2" src={deck.cards[2].src} className="deckcard" alt="card" draggable="true" onDragStart={drag} />
            : ""}
        </div>
      </div>
    </div>
  );
}

export default App;