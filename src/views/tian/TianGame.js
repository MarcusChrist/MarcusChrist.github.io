import React from 'react';

import '../../assets/css/tian.css';
import { unknownCard, initialStateTian, deckArray } from '../../arrays/cards';
import { CardMenu, Information, MyPile, Pile, Target } from './utils';
import { loadCache, SuspenseImg, shuffle } from '../../shared/handleDecks';
import tianReducer from '../../reducers/tianSlice';
// import { botAction, useInterval } from './bot';

function TianGame() {
  const [deck, dispatch] = React.useReducer(tianReducer, initialStateTian) 
  const [liftedCard, setLiftedCard] = React.useState(null);
  const [botLevel, setBotLevel] = React.useState(5000);
  const [loading, setLoading] = React.useState(null);

  let cancelled = false;

  React.useEffect(() => {
    const tempImgs = deckArray.map((item) => {
      return ( item.src );
    });
    tempImgs.push(unknownCard.src);
    loadCache(tempImgs);
  
    refresh(0,0);
    return () => {
      cancelled = true;
      // const temp = document.getElementsByClassName("move");
      // console.log(temp);
      // temp.map(() => {
      //   return temp.className.concat(' invisible');
      // });
    };
  }, []);
  

  //validade cards in play for stress, new draw or gameover.
  React.useEffect(() => { 
    if (cancelled) return;
    if (deck.play && !deck.stress && !deck.draw && !deck.eventMsg) {
      // checkCards(deck.cards);
    }
  });

  const refresh = (player, enemy) => {
    shuffle().then((result) => {
      if (cancelled) return;
      dispatch({ type: 'tian/shuffle', deck: result, player: player, enemy: enemy });
    }).then(() => {
      if (cancelled) return;
      setLoading(1);
    })
  }

  // useInterval(() => {
  //   if (deck.play && !deck.draw && !deck.eventMsg && deck.cards[3] && deck.cards[4]) {
  //     botAction(deck.cards, moveCard, handleStress);
  //   }
  // }, botLevel);

  const moveDeckCard = (nr, last) => {
    dispatch({ type: 'tian/moveToPile', nr: nr });
    // console.log("pile-" + nr + "-" + (last - 1));
    const temp = document.getElementById("pile-" + nr + "-" + last);
    if (temp) {
      temp.className = temp.className.concat(' move-' + nr).replace("invisible","");
    }
    console.log(temp);
    setTimeout(() => {
      const faked = document.getElementsByClassName("move-" + nr);
      if (faked && faked[0]) {
          faked[0].classList.remove('move-' + nr);
      }
    }, 90);
  }

  const drop = (e) => {
    e.preventDefault();
    removeFakedHover();
    if (!liftedCard || !deck.play) return;
    var lifted = deck.cards[liftedCard.substr(5, 1)];
    var target = deck.cards[e.target.id.substr(5, 1)];
    if (!target) return;
    var card1 = Number(lifted.card);
    var card2 = Number(target.card);
    if (card1 + 1 === card2 || card1 - 1 === card2 || (card1 === 1 && card2 === 13) || (card1 === 13 && card2 === 1)) {
      // moveCard(Number(liftedCard.substr(5, 1)), "putMyCard", Number(e.target.id.substr(5, 1)));
    }
  }

  const checkCards = (list) => {
    //Checks if cards are valid for play or a draw needs to be set up.
    if (!list[3] || !list[4]) return;
    var target1 = Number(list[3].card);
    var target2 = Number(list[4].card);
    if (target1 === target2 && target1 !== (undefined || null)) {
      //Stress starts if both targets are the same
      dispatch({ type: 'deck/setStress', stress: true });
      return;
    } else if (deck.stress) {
      dispatch({ type: 'deck/setStress', stress: false });
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
    dispatch({ type: 'deck/setEventMsg', eventMsg: msg });
    setTimeout(() => {
      for (var i = 0; i < 8; i++) {
        if (i === 3) i = 5;
        const temp = document.getElementById("card-" + i);
        if (temp) {
          temp.className = temp.className.concat(" invisible");
        }
      }
      refresh(score.player, score.enemy);
    }, 3000);
  }

  const handleStress = (me) => {
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
    dispatch({ type: 'deck/setEventMsg', eventMsg: msg });
    setTimeout(() => {
      dispatch({ type: 'deck/newDeal' });
      setTimeout(() => {
        dispatch({ type: 'deck/play' });
        const temp = document.getElementById("card-3-2")
        const temp2 = document.getElementById("card-4-2")
        if (temp) {
          temp.className = temp.className.concat(' move-3');
        }
        if (temp2) {
          temp2.className = temp2.className.concat(' move-4');
          console.log(temp2);
        }
        setTimeout(() => {
          const faked = document.getElementsByClassName("move-3");
          const faked2 = document.getElementsByClassName("move-4");
          if (faked && faked[0]) {
            while(faked.length > 0){
              console.log(faked);
              faked[0].classList.remove('move-3');
            }
          }
          if (faked2 && faked2[0]) {
            while(faked2.length > 0){
              console.log(faked2);
              faked2[0].classList.remove('move-4');
            }
          }
        }, 100);
      }, 2600);
    }, 2000);
  }
  
  const handlePause = () => {
    dispatch({ type: 'tian/handlePause' });
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
  const removeFakedHover = () => {
    const faked = document.getElementsByClassName("fakedhover");
    if (faked && faked[0]) {
      while(faked.length > 0){
        faked[0].classList.remove('fakedhover');
      }
    }
  }
  const drag = (e) => {
    removeFakedHover();
    e.target.className = e.target.className.concat(' fakedhover');
    setLiftedCard(e.target.id);
  }
  const showReport = () => {
    console.log(deck);
  }
  const handleStart = e => {
    setLoading(2);
    dispatch({ type: 'deck/setEventMsg', eventMsg: "Phase One" });
    setTimeout(() => {
      var z = 0;
      for (let i = 0; i < 18; i++) {
        setTimeout(function() {
          var x = i;
          var y = 0;
          if (x > 11 && x%2 === 0) {
            x = 6;
            y = z;
          } else if (x > 11) {
            x = 7;
            y = z;
            z += 1;
          } else if (x > 5) {
            x = x - 6;
            y = 1;
          }
          moveDeckCard(x, y);
        }, i * 300);
      }
      setTimeout(() => {
        setLoading(3);
      }, 5200);
    }, 2000);
  }
  console.log(deck);
  return (
    <div className="container">
      {!loading ? "" : <>
      { deck.paused ? <Information handlePause={handlePause} /> : "" }
      <CardMenu botLevel={botLevel} paused={deck.paused} handleLevel={handleLevel} handlePause={handlePause}/>
      <div className="scoreboard">{deck.score.player + " - " + deck.score.enemy}</div>
      {loading === 1 || loading === 3 ? <div className="startbtn" onClick={handleStart}><div className="startbtndiv"><button><p>
        <span className="bg"></span><span className="base"></span><span className="text">{loading === 1 ? "Start phase one" : "Start phase two"} </span></p></button></div></div> : ""}
      {deck.eventMsg ? <div className="eventmsg">{deck.eventMsg}</div> : ""}
      <div className="row">
        <div className="card-element">
          {deck.piles[3] ?
            <Pile nr="3" pile={deck.piles[3]}/>
            : ""}
        </div>
        <div className="card-element">
          {deck.piles[4] ?
            <Pile nr="4" pile={deck.piles[4]}/>
            : ""}
        </div>
        <div className="card-element">
          {deck.piles[5] ?
            <Pile nr="5" pile={deck.piles[5]}/>
            : ""}
        </div>
        <div className="card-element">
          {deck.piles[7] ?
            <Pile nr="7" pile={deck.piles[7]} enemy={true}/>
            : ""}
        </div>
      </div>
      <div className="row">
        <div className="deck card-element sidedecks">
          {deck.deck.length > 0 ? deck.deck.map((item, i) => {
            return <SuspenseImg src={unknownCard.src} key={"deck-" + i} id={"deck-" + i} className="deckcard" style={{marginTop: "-" + (i * 2) + "px", marginLeft: "-" + i + "px"}} alt="card" draggable="false" />
            })
          : ""}
        </div>
        <Target allowDrop={allowDrop} drop={drop} target={deck.target}/>
        <div className="card-element">
        </div>
        <div className="card-element">
        </div>
      </div>
      <div className="row">
        <div className="card-element my" id="myPile-0">
          {deck.piles[0] ?
            <Pile nr="0" pile={deck.piles[0]} drag={drag}/>
            : ""}
        </div>
        <div className="card-element my" id="myPile-1">
          {deck.piles[1] ?
            <Pile nr="1" pile={deck.piles[1]} drag={drag}/>
            : ""}
        </div>
        <div className="card-element my" id="myPile-2">
          {deck.piles[2] ?
            <Pile nr="2" pile={deck.piles[2]} drag={drag}/>
            : ""}
        </div>
        <div className="card-element my" id="myPile-6">
          {deck.piles[6] ?
            <MyPile nr="6" pile={deck.piles[6]} drag={drag}/>
            : ""}
        </div>
      </div>
      {/* {deck.draw ? <div className="countdown"></div> : ""}
      <div className="row">
        <div className="card-element">
          {deck.cards[5] ?
          <SuspenseImg id="card-5" src={deck.cards[5].src} className="deckcard move invisible" alt="card" draggable="false" />
            : ""}
        </div>
        <div className="card-element">
          {deck.cards[6] ?
          <SuspenseImg id="card-6" src={deck.cards[6].src} className="deckcard move invisible" alt="card" draggable="false" />
            : ""}
        </div>
        <div className="card-element">
          {deck.cards[7] ?
          <SuspenseImg id="card-7" src={deck.cards[7].src} className="deckcard move invisible" alt="card" draggable="false" />
            : ""}
        </div>
      </div>
      <div className="row">
        <div className="deck card-element sidedecks">
          {deck.yourDeck.length > 0 ? deck.yourDeck.map((item, i) => {
              return <SuspenseImg src={unknownCard.src} key={"yourdeck-" + i} id={"yourdeck-" + i} className="deckcard" style={{marginTop: "-" + (i * 2) + "px", marginLeft: "-" + i + "px", position: "absolute"}} alt="card" draggable="false" />
            })
            : ""}
        </div>
        <MiddleCards/>
        <div className="deck card-element sidedecks">
          {deck.myDeck.length > 0 ? deck.myDeck.map((item, i) => {
              return <SuspenseImg src={unknownCard.src} key={"mydeck-" + i} id={"mydeck-" + i} className="deckcard" style={{marginTop: "-" + (i * 2) + "px", marginLeft: "-" + i + "px", position: "absolute"}} alt="card" draggable="false" />
            })
            : ""}
        </div>
      </div>
      <div className="row">
        <div className="card-element my">
          {deck.cards[0] ?
          <SuspenseImg id={"card-0"} src={deck.cards[0].src} className="deckcard move invisible" alt="card" draggable="true" onDragStart={drag} onClick={drag} />
            : ""}
        </div>
        <div className="card-element my">
          {deck.cards[1] ?
          <SuspenseImg id={"card-1"} src={deck.cards[1].src} className="deckcard move invisible" alt="card" draggable="true" onDragStart={drag} onClick={drag} />
             : ""} 
        </div>
        <div className="card-element my">
          {deck.cards[2] ?
          <SuspenseImg id={"card-2"} src={deck.cards[2].src} className="deckcard move invisible" alt="card" draggable="true" onDragStart={drag} onClick={drag} />
            : ""}
        </div> */}
      {/* </div> */}
      </> } 
    </div>
  );
}

export default TianGame;