
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Slider from '@material-ui/core/Slider';
// import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
// import FlashOnIcon from '@material-ui/icons/FlashOn';
// const useStyles = makeStyles({
//     root: {
//         width: 234,
//         color: "white",
//         display: "inline-block",
//     },
// });


// function valueLabelFormat(value) {
//     const temp = marks.find(item => item.value === value)
//     return temp.label;
// }

// const marks = [
//     { value: 1, label: 'Easy', },
//     { value: 2, label: 'Medium', },
//     { value: 3, label: 'Hard', },
//     { value: 4, label: 'Scary', },
// ];

// export default function ContinuousSlider(props) {
//     const {botLevel, handleLevel} = props;
//     const classes = useStyles();

//     function handleChange(event, newValue) {
//         if (newValue === botLevel) return;
//         handleLevel(newValue);
//     };
    
//     return (
//         <div className={classes.root}>
//             {/* <Typography id="continuous-slider" gutterBottom>
//                 Difficulty
//             </Typography> */}
//             <Grid container spacing={2}>
//                 <Grid item>
//                     <ChildFriendlyIcon />
//                 </Grid>
//                 <Grid item xs>
//                     {/* <Slider
//                         value={botLevel}
//                         onChange={handleChange}
//                         aria-labelledby="continuous-slider"
//                         valueLabelFormat={valueLabelFormat}
//                         valueLabelDisplay="auto"
//                         min={1}
//                         max={4}
//                         color="secondary"
//                     /> */}
//                 </Grid>
//                 <Grid item>
//                     <FlashOnIcon />
//                 </Grid>
//             </Grid>
//         </div>
//     );
// }   


//     // <button className={this.props.botLevel === 5000 ? "btnpressed" : ""} onClick={this.props.handleLevel(5000)}>Easy</button>
//     // <button className={this.props.botLevel === 3700 ? "btnpressed" : ""} onClick={this.props.handleLevel(3700)}>Medium</button>
//     // <button className={this.props.botLevel === 2400 ? "btnpressed" : ""} onClick={this.props.handleLevel(2400)}>Hard</button>
//     // <button className={this.props.botLevel === 1100 ? "btnpressed" : ""} onClick={this.props.handleLevel(1100)}>Extreme</button>