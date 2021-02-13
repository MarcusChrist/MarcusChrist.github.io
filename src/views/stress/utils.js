
import React from 'react';
import { deckArray, unknownCard } from '../../arrays/cards';
import '../../assets/css/cards.css';

const cacheImages = async (srcArray) => {
    
  const promises = await srcArray.map((card) => {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.src = card.src;
      img.onload = resolve();
      img.onerror = reject();
    });
  });

  await Promise.all(promises);
};
export const shuffle = async () => {
    let tempDeck = [...deckArray];
    let randomCard;
    let tempX;
    for (let i = tempDeck.length - 1; i > -1; i -= 1) {
      randomCard = Math.floor(Math.random() * i);
      tempX = tempDeck[i];
      tempDeck[i] = tempDeck[randomCard];
      tempDeck[randomCard] = tempX;
    }
    cacheImages(tempDeck);
    var cards = [unknownCard, unknownCard, unknownCard, null, null, unknownCard, unknownCard, unknownCard];
    var deck1 = tempDeck.slice(0, 26);
    var deck2 = tempDeck.slice(26,52);

    // cards.splice(3, 0, null, null);
    return ([deck1, deck2, cards]);
  }

export class CardMenu extends React.Component {
  render(){
    return (
      <div className="cardmenu">
        {/* <button onClick={showReport}>{"my s: " + deck.mySlop.length + " your s: " + deck.yourSlop.length + " my: " + deck.myDeck.length + " y: " + deck.yourDeck.length +
          " c: " + deck.cards.length + " total: " + (deck.mySlop.length + deck.yourSlop.length + deck.myDeck.length + deck.yourDeck.length + deck.cards.length)}</button> */}
        
        <button className={this.props.paused ? "btnpressed btnpaused" : ""} onClick={this.props.handlePause}>Information</button>
        <button className={this.props.botLevel === 5000 ? "btnpressed" : ""} onClick={this.props.handleLevel(5000)}>Easy</button>
        <button className={this.props.botLevel === 3700 ? "btnpressed" : ""} onClick={this.props.handleLevel(3700)}>Medium</button>
        <button className={this.props.botLevel === 2400 ? "btnpressed" : ""} onClick={this.props.handleLevel(2400)}>Hard</button>
        <button className={this.props.botLevel === 1100 ? "btnpressed" : ""} onClick={this.props.handleLevel(1100)}>Extreme</button>

      </div> 
    )
  }
}

export class Information extends React.Component {
  render(){
    return (
      <div className="paused" onClick={this.props.handlePause}>
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
      </div>
    )
  }
};

export class Stress extends React.Component {
  render(){
    return (
      <>
        <div className="stressBtn" onClick={this.props.handleMyStress}>HIT</div>
        <img src={unknownCard.src} className="spinners top-left" alt="logo" />
        <img src={unknownCard.src} className="spinners top-right" alt="logo" />
        <img src={unknownCard.src} className="spinners bottom-left" alt="logo" />
        <img src={unknownCard.src} className="spinners bottom-right" alt="logo" />
      </>
    )
  }
};

export class DeckCard extends React.Component {
  render(){
    return (
      <img id="card-3-2" src={this.props.card.src} className="deckcard" style={{marginTop: "-" + (this.props.length * 2) + "px", marginLeft: "-" + this.props.length + "px",position: "absolute"}} alt="card" draggable="false" />
    )
  }
};