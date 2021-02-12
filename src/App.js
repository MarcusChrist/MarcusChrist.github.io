import React from 'react';

import './assets/css/cards.css';
import { unknownCard, initialState } from './arrays/cards';
import { shuffle } from './views/stress/utils';
import deckReducer from './features/deck/deckSlice';
// import { MovableCard } from './views/stress/movableCard';

function App() {
  const [deck, dispatch] = React.useReducer(deckReducer, initialState) 
  const [liftedCard, setLiftedCard] = React.useState(null);
  const [botLevel, setBotLevel] = React.useState(5000);


  //setup the game on component did mount
  React.useEffect(() => {
    refresh(0,0);
    return () => {
    }
  }, []);

  //validade cards in play for stress, new draw or gameover.
  React.useEffect(() => { 
    if (deck.play && !deck.stress && !deck.draw && !deck.eventMsg) {
      checkCards(deck.cards);
    }
  });

  const refresh = (player, enemy) => {
    shuffle().then((result) => {
      dispatch({ type: 'deck/shuffle', myDeck: result[0], yourDeck: result[1], cards: result[2], player: player, enemy: enemy });
    });
  }

  const useInterval = (callback, delay) => {
    // console.log("useInterval 1")
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
    // console.log("useInterval 2")
    if (!deck.play || deck.draw || deck.eventMsg || (!deck.cards[3] && !deck.cards[4])) return;
    console.log("useinterval körs (play, ej draw och kort finns)")
    var target1 = Number(deck.cards[3].card);
    var target2 = Number(deck.cards[4].card);
    if (target1 === target2) {
      handleStress(false);
    } else {
      for (var i = 5; i < 8; i++) {
        if (!deck.cards[i]) continue;
        let temp = Number(deck.cards[i].card);
        if (temp + 1 === target1 || temp - 1 === target1 || (temp === 1 && target1 === 13) || (temp === 13 && target1 === 1)) {
          dispatch({ type: 'deck/putYourCard', lifted: i, target: 3 })
          break;
        } else if (temp + 1 === target2 || temp - 1 === target2 || (temp === 1 && target2 === 13) || (temp === 13 && target2 === 1)) {
          dispatch({ type: 'deck/putYourCard', lifted: i, target: 4 });
          break;
        }
      };
    }
  }, botLevel);

  const drop = (e) => {
    console.log("drop");
    e.preventDefault();
    if (!liftedCard || !deck.play) return;
    console.log(liftedCard);
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

  const checkCards = (list) => {
    console.log("checkCards börjar")
    console.log(list);
    //Checks if cards are valid for play or a draw needs to be set up.
    if (!list[3] || !list[4]) return;
    var target1 = Number(list[3].card);
    var target2 = Number(list[4].card);
    if (target1 === target2 && target1 !== (undefined || null)) {
      //Stress starts if both targets are the same
      dispatch({ type: 'deck/setStress', stress: true });
      return;
    }
    let valid = false;  
    for (var i = 0; i < 8; i++) {
      if (i === 3 || i === 4 || !list[i]) continue;
      let card = Number(list[i].card);
      //Checks if any of the players have a card to put on any of the targets
      if (card + 1 === target1   // left is higher
        || card - 1 === target1  // left is lower
        || card + 1 === target2  // right is higher
        || card - 1 === target2  // right is lower
        || (card === 1 && (target1 === 13 || target2 === 13)) // left/right ace on king
        || (card === 13 && (target1 === 1 || target2 === 1))) // left/right king on ace
      {
        //valid cards in play
        valid = true;
        break;
      }
    }
    if (!valid) {
      if (!list[0] && !list[1] && !list[2]) {
        //player have 0 cards left
        gameOver("YOU WON", {player: 1, enemy: 0});
      } else if (!list[5] && !list[6] && !list[7]) {
        //enemy has 0 cards left
        gameOver("EPIC FAIL", {player: 0, enemy: 1});
      } else if (deck.myDeck.length < 1 && deck.yourDeck.length < 1) {
        //No valid cards in play and no more cards to draw: undecided victory //%% maybe change to replay?
        gameOver("Draw", {player: 0, enemy: 0});
      } else if (deck.myDeck.length < 1) {
        //no more cards to play and player deck is empty //%% should be changed to take 2 from enemy deck?
        gameOver("YOU WON", {player: 1, enemy: 0});
      } else if (deck.yourDeck.length < 1) {
        //no more cards to play and enemy deck is empty //%% should be changed to take 2 from player deck?
        gameOver("EPIC FAIL", {player: 0, enemy: 1});
      } else {
        //if no stress, no valid cards and game can still be played, execute new Draw
        newDraw("No valid cards");
      };
    };
  };

  const gameOver = (msg, score) => {
    console.log("gameOver");
    dispatch({ type: 'deck/setEventMsg', eventMsg: msg });
    setTimeout(() => {
      refresh(score.player, score.enemy);
    }, 3000);
  }

  const handleStress = (me) => {
    console.log("handleStress");
    if (!deck.stress || !deck.play) return;
    if (me) {
      dispatch({ type: 'deck/myStress' });
      newDraw("Success");
    } else {
      dispatch({ type: 'deck/yourStress' });
      newDraw("Fail");
    }
  }

  const newDraw = (msg) => {
    console.log("newDraw")
    dispatch({ type: 'deck/setEventMsg', eventMsg: msg });
    setTimeout(() => {
      console.log("1")
      dispatch({ type: 'deck/newDeal' });
      setTimeout(() => {
        console.log("2")
        dispatch({ type: 'deck/play' });
      }, 2600);
    }, 3000);
  }
  
  const handlePause = () => {
    dispatch({ type: 'deck/handlePause' });
  }
  const handleLevel = (level) => (e) => {
    setBotLevel(level);
  }
  const handleMyStress = e => {
    handleStress(true);
  }
  const allowDrop = (e) => {
    e.preventDefault();
  }
  const drag = (e) => {
    setLiftedCard(e.target.id);
  }
  const showReport = () => {
    console.log(deck);
  }
  const handleStart = e => {
    newDraw("Starting...");
  }
  return (
    <div className="container">
      {deck.paused ? <div className="paused" onClick={handlePause}>
        <span className="pausedtext"><h1>Information</h1><h3>Game round</h3>
          Stress is quite special unlike other games. In Stress, both players play at the same time and as fast as they want. Color does not matter in this games.
          <br /><br /><h3>General rules</h3>
          Once the cards in the middle (1 from each deck) are dealt both players can deal their own cards on top of them. But this can only be done if the player's card is a denomination higher or lower than the game stack. So if there is a 4 in one pile and one player has a 5, 6 and a 9 then the player can first put a 5, then a 6. But the player may not add his 9 to the game pile becouse the 9 is not a denomination higher or lower of a 7. Ace counts as 14 and 1 so you can only add it on a king or a 2.
          <br /><br /><h3>Refilling of cards</h3>
          When you lay cards, new cards from the player's deck of cards will move to your action cards.
          <br /><br /><h3>Stress</h3>
          If both cards in the middle have equal numbers a "HIT" button will be displayed. Hit the button and your enemy will gets both piles added to their deck.
          <br /><br /><h3>Goal</h3>
          To get rid of all your cards.
          <br /><h2>Click anywhere to unpause.</h2></span>
      </div> : ""}
      {deck.stress ? <>
        <div className="stressBtn" onClick={handleMyStress}>HIT</div>
        <img src={unknownCard.src} className="spinners top-left" alt="logo" />
        <img src={unknownCard.src} className="spinners top-right" alt="logo" />
        <img src={unknownCard.src} className="spinners bottom-left" alt="logo" />
        <img src={unknownCard.src} className="spinners bottom-right" alt="logo" />
      </> : ""}
      <div className="cardmenu">
        {/* <button onClick={showReport}>{"my s: " + deck.mySlop.length + " your s: " + deck.yourSlop.length + " my: " + deck.myDeck.length + " y: " + deck.yourDeck.length +
          " c: " + deck.cards.length + " total: " + (deck.mySlop.length + deck.yourSlop.length + deck.myDeck.length + deck.yourDeck.length + deck.cards.length)}</button> */}
        
        <button className={deck.paused ? "btnpressed btnpaused" : ""} onClick={handlePause}>Information</button>
        <button className={botLevel === 5000 ? "btnpressed" : ""} onClick={handleLevel(5000)}>Easy</button>
        <button className={botLevel === 3700 ? "btnpressed" : ""} onClick={handleLevel(3700)}>Medium</button>
        <button className={botLevel === 2400 ? "btnpressed" : ""} onClick={handleLevel(2400)}>Hard</button>
        <button className={botLevel === 1100 ? "btnpressed" : ""} onClick={handleLevel(1100)}>Extreme</button>

      </div>
      <div className="scoreboard">{deck.score.player + " - " + deck.score.enemy}</div>
      {!deck.play && !deck.eventMsg && !deck.draw ? <div className="startbtn" onClick={handleStart}><div className="startbtndiv"><button><p>
        <span className="bg"></span><span className="base"></span><span className="text">Click here to start</span></p></button></div></div> : ""}
      {deck.eventMsg ? <div className="eventmsg">{deck.eventMsg}</div> : ""}
      {deck.draw ? <div className="countdown"></div> : ""}
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
        <div className="deck card-element sidedecks">
          {deck.yourDeck.length > 0 ? deck.yourDeck.map((item, i) => {
              return <img src={unknownCard.src} key={"yourdeck-" + i} className="deckcard" style={{marginTop: "-" + (i * 2) + "px", marginLeft: "-" + i + "px", position: "absolute"}} alt="card" draggable="false" />
            })
            : ""}
        </div>
        <div id="card-3-1" className="card-element target" onDrop={drop} onDragOver={allowDrop} onClick={drop}>
          {deck.yourSlop.length > 0 ? deck.yourSlop.map((item, i) => {
              return <img src={unknownCard.src} key={"yourslop-" + i} className="deckcard" style={{marginTop: "-" + (i * 2) + "px", marginLeft: "-" + i + "px",position: "absolute"}} alt="card" draggable="false" />
            })
            : ""}
          {deck.cards[3] && (deck.play || deck.eventMsg) ? 
            <img id="card-3-2" src={deck.cards[3].src} className="deckcard" style={{marginTop: "-" + (deck.yourSlop.length * 2) + "px", marginLeft: "-" + deck.yourSlop.length + "px",position: "absolute"}} alt="card" draggable="false" />
            : ""}
        </div>
        <div id="card-4-1" className="card-element target" onDrop={drop} onDragOver={allowDrop} onClick={drop}>
          {deck.mySlop.length > 0 ? deck.mySlop.map((item, i) => {
              return <img src={unknownCard.src} key={"myslop-" + i} className="deckcard" style={{marginTop: "-" + (i * 2) + "px", marginLeft: "-" + i + "px",position: "absolute"}} alt="card" draggable="false" />
            })
            : ""}
          {deck.cards[4] && (deck.play || deck.eventMsg) ? 
            <img id="card-4-2" src={deck.cards[4].src} className="deckcard" style={{marginTop: "-" + (deck.mySlop.length * 2) + "px", marginLeft: "-" + deck.mySlop.length + "px",position: "absolute"}} alt="card" draggable="false" />
            : ""}
        </div>
        <div className="deck card-element sidedecks">
          {deck.myDeck.length > 0 ? deck.myDeck.map((item, i) => {
              return <img src={unknownCard.src} key={"mydeck-" + i} className="deckcard" style={{marginTop: "-" + (i * 2) + "px", marginLeft: "-" + i + "px",position: "absolute"}} alt="card" draggable="false" />
            })
            : ""}
        </div>
      </div>
      <div className="row">
        <div className="card-element my">
          {deck.cards[0] ?
            <img id={"card-0"} src={deck.cards[0].src} className="deckcard movable" alt="card" draggable="true" onDragStart={drag} onClick={drag} />
            // <MovableCard key="0" startx={340} starty={487} card={deck.cards[0]} cardNumber={"0"} drag={drag} handleMovableCard={handleMovableCard}/>
            : ""}
        </div>
        <div className="card-element my">
          {deck.cards[1] ?
            <img id={"card-1"} src={deck.cards[1].src} className="deckcard movable" alt="card" draggable="true" onDragStart={drag} onClick={drag}/>
            // <MovableCard key="1" startx={460} starty={487} card={deck.cards[1]} cardNumber={"1"} drag={drag} handleMovableCard={handleMovableCard} />
            : ""}
        </div>
        <div className="card-element my">
          {deck.cards[2] ?
            <img id={"card-2"} src={deck.cards[2].src} className="deckcard movable" alt="card" draggable="true" onDragStart={drag} onClick={drag}/>
            // <MovableCard key="2" startx={580} starty={487} card={deck.cards[2]} cardNumber={"2"} drag={drag} handleMovableCard={handleMovableCard} />
            : ""}
        </div>
      </div>
    </div>
  );
}

export default App;