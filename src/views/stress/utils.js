
import { deckArray } from '../../arrays/cards';

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
    var cards = tempDeck.slice(0, 8);
    var deck1 = tempDeck.slice(8, 30);
    var deck2 = tempDeck.slice(30,52);
    return ([deck1, deck2, cards]);
  }