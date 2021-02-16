import { deckArray, unknownCard } from "../arrays/cards";


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
    return (tempDeck);
  }

const imgCache = {
    __cache: {},
    read(src) {
    if (!this.__cache[src]) {
        this.__cache[src] = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            this.__cache[src] = true;
            resolve(this.__cache[src]);
        };
        img.src = src;
        }).then((img) => {
            console.log("nu!")
            this.__cache[src] = true;
        });
    }
    // if (this.__cache[src] instanceof Promise) {
    //   throw this.__cache[src];
    // }
    return this.__cache[src];
    }
};
  
export const loadCache = (images) => {
    images.forEach((img) => imgCache.read(img));
    return true;
}

export const SuspenseImg = ({ src, ...rest }) => {
    imgCache.read(src);
    return <img src={src} {...rest} />;
};