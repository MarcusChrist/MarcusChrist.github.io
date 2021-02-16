import C1 from '../assets/images/cards/1C.png';
import C2 from '../assets/images/cards/2C.png';
import C3 from '../assets/images/cards/3C.png';
import C4 from '../assets/images/cards/4C.png';
import C5 from '../assets/images/cards/5C.png';
import C6 from '../assets/images/cards/6C.png';
import C7 from '../assets/images/cards/7C.png';
import C8 from '../assets/images/cards/8C.png';
import C9 from '../assets/images/cards/9C.png';
import C10 from '../assets/images/cards/10C.png';
import C11 from '../assets/images/cards/11C.png';
import C12 from '../assets/images/cards/12C.png';
import C13 from '../assets/images/cards/13C.png';
import D1 from '../assets/images/cards/1D.png';
import D2 from '../assets/images/cards/2D.png';
import D3 from '../assets/images/cards/3D.png';
import D4 from '../assets/images/cards/4D.png';
import D5 from '../assets/images/cards/5D.png';
import D6 from '../assets/images/cards/6D.png';
import D7 from '../assets/images/cards/7D.png';
import D8 from '../assets/images/cards/8D.png';
import D9 from '../assets/images/cards/9D.png';
import D10 from '../assets/images/cards/10D.png';
import D11 from '../assets/images/cards/11D.png';
import D12 from '../assets/images/cards/12D.png';
import D13 from '../assets/images/cards/13D.png';
import H1 from '../assets/images/cards/1H.png';
import H2 from '../assets/images/cards/2H.png';
import H3 from '../assets/images/cards/3H.png';
import H4 from '../assets/images/cards/4H.png';
import H5 from '../assets/images/cards/5H.png';
import H6 from '../assets/images/cards/6H.png';
import H7 from '../assets/images/cards/7H.png';
import H8 from '../assets/images/cards/8H.png';
import H9 from '../assets/images/cards/9H.png';
import H10 from '../assets/images/cards/10H.png';
import H11 from '../assets/images/cards/11H.png';
import H12 from '../assets/images/cards/12H.png';
import H13 from '../assets/images/cards/13H.png';
import S1 from '../assets/images/cards/1S.png';
import S2 from '../assets/images/cards/2S.png';
import S3 from '../assets/images/cards/3S.png';
import S4 from '../assets/images/cards/4S.png';
import S5 from '../assets/images/cards/5S.png';
import S6 from '../assets/images/cards/6S.png';
import S7 from '../assets/images/cards/7S.png';
import S8 from '../assets/images/cards/8S.png';
import S9 from '../assets/images/cards/9S.png';
import S10 from '../assets/images/cards/10S.png';
import S11 from '../assets/images/cards/11S.png';
import S12 from '../assets/images/cards/12S.png';
import S13 from '../assets/images/cards/13S.png';
import Unknown from '../assets/images/cards/purple_back.png';

export const initialState = {
  myDeck: [],
  yourDeck: [],
  mySlop: [],
  yourSlop: [],
  cards: [],
  score: { player: 0, enemy: 0 },
  play: false,
  paused: false,
  stress: false,
  draw: false,
  eventMsg: null,
};

export const initialStateTian = {
  piles: [],
  target: [],
  deck: [],
  play: false,
  paused: false,
  eventMsg: null,
  score: { player: 0, enemy: 0 },
}

export const initiateCards = [
  {
    suits: "Unknown",
    card: "Unknown",
    color: "Unknown",
    index: "0",
    src: Unknown,
  },
  {
    suits: "Unknown",
    card: "Unknown",
    color: "Unknown",
    index: "0",
    src: Unknown,
  },
  {
    suits: "Unknown",
    card: "Unknown",
    color: "Unknown",
    index: "0",
    src: Unknown,
  },
  {
    suits: "Unknown",
    card: "Unknown",
    color: "Unknown",
    index: "0",
    src: Unknown,
  },
  {
    suits: "Unknown",
    card: "Unknown",
    color: "Unknown",
    index: "0",
    src: Unknown,
  },
  {
    suits: "Unknown",
    card: "Unknown",
    color: "Unknown",
    index: "0",
    src: Unknown,
  },
  {
    suits: "Unknown",
    card: "Unknown",
    color: "Unknown",
    index: "0",
    src: Unknown,
  },
  {
    suits: "Unknown",
    card: "Unknown",
    color: "Unknown",
    index: "0",
    src: Unknown,
  },
];
export const unknownCard = {
  suits: "Unknown",
  card: "Unknown",
  color: "Unknown",
  index: "0",
  src: Unknown,
}
export const deckArray = [
    {
      suits: "Heart",
      card: "1",
      color: "red",
      index: "1",
      src: H1,
    },
    {
      suits: "Heart",
      card: "2",
      color: "red",
      index: "2",
      src: H2
    },
    {
      suits: "Heart",
      card: "3",
      color: "red",
      index: "3",
      src: H3
    },
    {
      suits: "Heart",
      card: "4",
      color: "red",
      index: "4",
      src: H4
    },
    {
      suits: "Heart",
      card: "5",
      color: "red",
      index: "5",
      src: H5
    },
    {
      suits: "Heart",
      card: "6",
      color: "red",
      index: "6",
      src: H6
    },
    {
      suits: "Heart",
      card: "7",
      color: "red",
      index: "7",
      src: H7
    },
    {
      suits: "Heart",
      card: "8",
      color: "red",
      index: "8",
      src: H8
    },
    {
      suits: "Heart",
      card: "9",
      color: "red",
      index: "9",
      src: H9
    },
    {
      suits: "Heart",
      card: "10",
      color: "red",
      index: "10",
      src: H10
    },
    {
      suits: "Heart",
      card: "11",
      color: "red",
      index: "11",
      src: H11
    },
    {
      suits: "Heart",
      card: "12",
      color: "red",
      index: "12",
      src: H12
    },
    {
      suits: "Heart",
      card: "13",
      color: "red",
      index: "13",
      src: H13
    },
    {
      suits: "Diamond",
      card: "1",
      color: "red",
      index: "14",
      src: D1
    },
    {
      suits: "Diamond",
      card: "2",
      color: "red",
      index: "15",
      src: D2
    },
    {
      suits: "Diamond",
      card: "3",
      color: "red",
      index: "16",
      src: D3
    },
    {
      suits: "Diamond",
      card: "4",
      color: "red",
      index: "17",
      src: D4
    },
    {
      suits: "Diamond",
      card: "5",
      color: "red",
      index: "18",
      src: D5
    },
    {
      suits: "Diamond",
      card: "6",
      color: "red",
      index: "19",
      src: D6
    },
    {
      suits: "Diamond",
      card: "7",
      color: "red",
      index: "20",
      src: D7
    },
    {
      suits: "Diamond",
      card: "8",
      color: "red",
      index: "21",
      src: D8
    },
    {
      suits: "Diamond",
      card: "9",
      color: "red",
      index: "22",
      src: D9
    },
    {
      suits: "Diamond",
      card: "10",
      color: "red",
      index: "23",
      src: D10
    },
    {
      suits: "Diamond",
      card: "11",
      color: "red",
      index: "24",
      src: D11
    },
    {
      suits: "Diamond",
      card: "12",
      color: "red",
      index: "25",
      src: D12
    },
    {
      suits: "Diamond",
      card: "13",
      color: "red",
      index: "26",
      src: D13
    },
    {
      suits: "Club",
      card: "1",
      color: "black",
      index: "27",
      src: C1
    },
    {
      suits: "Club",
      card: "2",
      color: "black",
      index: "28",
      src: C2
    },
    {
      suits: "Club",
      card: "3",
      color: "black",
      index: "29",
      src: C3
    },
    {
      suits: "Club",
      card: "4",
      color: "black",
      index: "30",
      src: C4
    },
    {
      suits: "Club",
      card: "5",
      color: "black",
      index: "31",
      src: C5
    },
    {
      suits: "Club",
      card: "6",
      color: "black",
      index: "32",
      src: C6
    },
    {
      suits: "Club",
      card: "7",
      color: "black",
      index: "33",
      src: C7
    },
    {
      suits: "Club",
      card: "8",
      color: "black",
      index: "34",
      src: C8
    },
    {
      suits: "Club",
      card: "9",
      color: "black",
      index: "35",
      src: C9
    },
    {
      suits: "Club",
      card: "10",
      color: "black",
      index: "36",
      src: C10
    },
    {
      suits: "Club",
      card: "11",
      color: "black",
      index: "37",
      src: C11
    },
    {
      suits: "Club",
      card: "12",
      color: "black",
      index: "38",
      src: C12
    },
    {
      suits: "Club",
      card: "13",
      color: "black",
      index: "39",
      src: C13
    }, 
    {
      suits: "Spade",
      card: "1",
      color: "black",
      index: "40",
      src: S1
    },
    {
      suits: "Spade",
      card: "2",
      color: "black",
      index: "41",
      src: S2
    },
    {
      suits: "Spade",
      card: "3",
      color: "black",
      index: "42",
      src: S3
    },
    {
      suits: "Spade",
      card: "4",
      color: "black",
      index: "43",
      src: S4
    },
    {
      suits: "Spade",
      card: "5",
      color: "black",
      index: "44",
      src: S5
    },
    {
      suits: "Spade",
      card: "6",
      color: "black",
      index: "45",
      src: S6
    },
    {
      suits: "Spade",
      card: "7",
      color: "black",
      index: "46",
      src: S7
    },
    {
      suits: "Spade",
      card: "8",
      color: "black",
      index: "47",
      src: S8
    },
    {
      suits: "Spade",
      card: "9",
      color: "black",
      index: "48",
      src: S9
    },
    {
      suits: "Spade",
      card: "10",
      color: "black",
      index: "49",
      src: S10
    },
    {
      suits: "Spade",
      card: "11",
      color: "black",
      index: "50",
      src: S11
    },
    {
      suits: "Spade",
      card: "12",
      color: "black",
      index: "51",
      src: S12
    },
    {
      suits: "Spade",
      card: "13",
      color: "black",
      index: "52",
      src: S13
    }
  ];