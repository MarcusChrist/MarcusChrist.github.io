
import React from 'react';
import '../assets/css/cards.css';
import { Route } from 'react-router-dom'
import { SuspenseImg } from './handleDecks';
import { unknownCard } from '../arrays/cards';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import FlashOnIcon from '@material-ui/icons/FlashOn';

export class InformationTian extends React.Component {
  render() {
    return (
      <div className="paused" onClick={this.props.handlePause}>
        <span className="pausedtext"><h1>Information</h1><h3>Game round</h3>
            Stress is quite special unlike other games. In Stress, both players play at the same time and as fast as they want. Color does not matter in this games.
            <br /><br /><h3>General rules</h3>
            Once the cards in the middle (1 from each deck) are dealt both players can deal their own cards on top of them. But this can only be done if the player's card is a denomination higher or lower than the game stack. So if there is a 4 in one pile and one player has a 5, 6 and a 9 then the player can first put a 5, then a 6. But the player may not add his 9 to the game pile becouse the 9 is not a denomination higher or lower of a 7. Ace counts as 14 and 1 so you can only add it on a king or a 2.
            <br /><br /><h3>Refilling of cards</h3>
            When you lay cards, new cards from the player's deck of cards will move to your action cards.
            <br /><br /><h3>Stress</h3>
            If both cards in the middle have equal numbers a "STRESS" button will be displayed at a random position. Hit the button and your enemy will gets both piles added to their deck.
            <br /><br /><h3>Goal</h3>
            To get rid of all your cards first.
            <br /><h2>Click anywhere to unpause.</h2>
            
          <br /><br /> <br /><br /></span>
      </div>
    )
  }
};

export class InformationStress extends React.Component {
  render() {
    return (
      <div className="paused" onClick={this.props.handlePause}>
        <span className="pausedtext"><h1>Information</h1><h3>Game round</h3>
            Stress is quite special unlike other games. In Stress, both players play at the same time and as fast as they want. Color does not matter in this games.
            <br /><br /><h3>General rules</h3>
            Once the cards in the middle (1 from each deck) are dealt both players can deal their own cards on top of them. But this can only be done if the player's card is a denomination higher or lower than the game stack. So if there is a 4 in one pile and one player has a 5, 6 and a 9 then the player can first put a 5, then a 6. But the player may not add his 9 to the game pile becouse the 9 is not a denomination higher or lower of a 7. Ace counts as 14 and 1 so you can only add it on a king or a 2.
            <br /><br /><h3>controls</h3>
            Click one of the 3 cards at the bottom. Then click one of the cards in the middle.
            <br /><br /><h3>Refilling of cards</h3>
            When you lay cards, new cards from the player's deck of cards will move to your action cards.
            <br /><br /><h3>Stress</h3>
            If both p in the middle have equal numbers a "STRESS" button will be displayed at a random position. Hit the button and your enemy will gets both piles added to their deck.
            <br /><br /><h3>Goal</h3>
            To get rid of all your cards.
            <br /><h2>Click anywhere to unpause.</h2>
          <br /><br /> <br /><br /></span>
      </div>
    )
  }
};

export class DeckCard extends React.Component {
  render() {
    return (
      <img id="card-3-2"
        src={this.props.card.src}
        className="deckcard"
        style={{ marginTop: "-" + (this.props.length * 2) + "px", marginLeft: "-" + this.props.length + "px", position: "absolute" }}
        alt="card" draggable="false"
      />
    )
  }
};

const ChangeGameToTian = () => (
  <Route render={({ history }) => (
    <button
      onClick={() => {
        alert("That game is not done yet! You have to keep playing stress.")
        history.push('/tian');
      }}
    >
      Play Tian
    </button>
  )} />
)
const ChangeGameToStress = () => (
  <Route render={({ history }) => (
    <button
      onClick={() => {
        history.push('/stress');
      }}
    >
      Play Stress
    </button>
  )} />
)

function valueLabelFormat(value) {
  const temp = marks.find(item => item.value === value)
  return temp.label;
}

const marks = [
  { value: 1, label: 'Easy', },
  { value: 2, label: 'Medium', },
  { value: 3, label: 'Hard', },
  { value: 4, label: 'Scary', },
];
const useStyles = makeStyles({
  customslider: {
        width: 234,
        color: "white",
        display: "inline-block",
    },
});
export const CardMenu = (props) => {
  const { botLevel, handleBotLevel, fullscreen, toggleFullScreen, paused, handlePause, stressGame } = props;
  const classes = useStyles();
  return (
    <div className="cardmenu">
      {/* <button onClick={showReport}>{"my s: " + deck.mySlop.length + " your s: " + deck.yourSlop.length + " my: " + deck.myDeck.length + " y: " + deck.yourDeck.length +
          " c: " + deck.cards.length + " total: " + (deck.mySlop.length + deck.yourSlop.length + deck.myDeck.length + deck.yourDeck.length + deck.cards.length)}</button> */}
      <div className={classes.customslider}>
        <Grid container spacing={2}>
          <Grid item>
            <ChildFriendlyIcon />
          </Grid>
          <Grid item xs>
            <Slider
              value={botLevel}
              onChange={handleBotLevel}
              aria-labelledby="continuous-slider"
              valueLabelFormat={valueLabelFormat}
              valueLabelDisplay="auto"
              min={1}
              max={4}
              color="secondary"
            />
          </Grid>
          <Grid item>
            <FlashOnIcon />
          </Grid>
        </Grid>
      </div>
      <div></div>
      <button className={fullscreen ? "btnpressed" : ""} onClick={toggleFullScreen}>Fullscreen</button>
      <button className={paused ? "btnpressed btnpaused" : ""} onClick={handlePause}>Information</button>
      {/* {stressGame ? <ChangeGameToTian /> : <ChangeGameToStress />} */}
    </div>
  )
}

// function Pull(props) {
//   const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
//   const bind = useGesture(({ down, delta, velocity }) => {
//     velocity = clamp(velocity, 1, 8)
//     set({ xy: down ? delta : [0, 0], config: { mass: velocity, tension: 500 * velocity, friction: 50 } })
//   })
//   return <animated.div {...bind()} className={"deckcard"} style={{marginLeft: props.left + "px", backgroundImage: 'url(' + props.src + ')', transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`) }}>
//           {/* <img src={props.src} {...props.rest}/> */}
//       </animated.div>
// }
// export const SuspenseImg = ({ src, movable, ...rest }) => {
//   imgCache.read(src);
//   console.log(rest);
//   if (movable) {
//       return <Pull src={src} left={rest.style.marginLeft}/>
//   } else {
//       return <img src={src} className ={"deckcard"} style={rest.style}/>
//   };
// };

export function Pile(defaultProps) {
  const { nr, pile, drag, enemy, myPile } = defaultProps;
  if (pile.length < 1) return null;

  if (myPile) {
    return pile.map((item, i) => {
      return <SuspenseImg
        src={item.src}
        key={"pile-" + nr + "-" + i}
        id={"pile-" + nr + "-" + i}
        className={"deckcard"}
        style={{ marginLeft: (i * 24) + "px", positon: "absolute" }}
        alt="card"
        draggable="false"
        onClick={drag}
      />
    })
  } else {
    return pile.map((item, i) => {
      if (drag && i !== 0) {
        return <SuspenseImg
          src={item.src}
          key={"pile-" + nr + "-" + i}
          id={"pile-" + nr + "-" + i}
          className={"deckcard"}
          style={{ marginLeft: (i < 2 ? 0 : i * 8) + "px", positon: "absolute" }}
          alt="card"
          draggable="false"
          onClick={drag}
        />
      } else {
        return <SuspenseImg
          src={i === 0 || enemy ? unknownCard.src : item.src}
          key={"pile-" + nr + "-" + i}
          id={"pile-" + nr + "-" + i}
          className={"deckcard"}
          style={{ marginLeft: (i < 2 && !enemy ? 0 : i * 8) + "px", positon: "absolute" }}
          alt="card"
          draggable="false"
          onClick={drag}
        />
      }
    })
  }
};

// export class Pile extends React.Component {
//   render() {
//     return (<>
//       {this.props.pile.length > 0 ? this.props.pile.map((item, i) => {
//         if (this.props.drag && i !== 0) {
//           return <SuspenseImg src={item.src} key={"pile-" + this.props.nr + "-" + i} id={"pile-" + this.props.nr + "-" + i} className="deckcard move invisible" style={{ marginLeft: (i * 8) + "px", positon: "absolute"}} alt="card" draggable="true" onDragStart={this.props.drag} onClick={this.props.drag} />
//         } else {
//           return <SuspenseImg src={i === 0 || this.props.enemy ? unknownCard.src : item.src} key={"pile-" + this.props.nr + "-" + i} id={"pile-" + this.props.nr + "-" + i} className="deckcard move invisible" style={{ marginLeft: (i * 8) + "px", positon: "absolute"}} alt="card" draggable="false" />
//         }
//       })
//         : ""}
//     </>)
//   }
// };

export class MyPile extends React.Component {
  render() {
    return (<>
      {this.props.pile.length > 0 ? this.props.pile.map((item, i) => {
        return <SuspenseImg
          src={item.src}
          key={"pile-" + this.props.nr + "-" + i}
          id={"pile-" + this.props.nr + "-" + i}
          className="deckcard move invisible"
          style={{
            marginLeft: (i * 24) + "px",
            positon: "absolute"
          }}
          alt="card"
          // draggable="true" 
          // onDragStart={this.props.drag} 
          onClick={this.props.drag}
        />
      })
        : ""}
    </>)
  }
};

export class Target extends React.Component {
  render() {
    return (
      <div id="card-target"
        className="card-element target"
        onDrop={this.props.drop}
        onDragOver={this.props.allowDrop}
        onClick={this.props.drop}>
        {this.props.target.length > 0 ? this.props.target.map((item, i) => {
          return <SuspenseImg
            src={item.src}
            key={"card-target-" + i}
            className="deckcard"
            style={{ marginTop: "-" + (i * 2) + "px", marginLeft: "-" + i + "px" }}
            alt="card"
            draggable="false"
          />
        })
          : ""}
      </div>
    )
  }
}


export class Stress extends React.Component {
  render() {
    const left = Math.random() * (window.innerWidth - 150);
    const top = Math.random() * (window.innerHeight - 260);
    return (
      <>
        <div className="stressBtn" onClick={this.props.handleMyStress} style={{ left: left + "px", top: top + "px" }}>S T R E S S</div>
        <img src={unknownCard.src} className="spinners top-left" alt="logo" />
        <img src={unknownCard.src} className="spinners top-right" alt="logo" />
        <img src={unknownCard.src} className="spinners bottom-left" alt="logo" />
        <img src={unknownCard.src} className="spinners bottom-right" alt="logo" />
      </>
    )
  }
};
