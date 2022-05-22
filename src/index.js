import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
import StressGame from './views/stress/StressGame';
// import reportWebVitals from './reportWebVitals';
import TianGame from './views/tian/TianGame';
// import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  // document.getElementById('root')
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/tian" render= {(props)=>{ return <TianGame {...props}/>}} /> */}
        <Route exact path="/" render= {(props)=>{ return <StressGame {...props}/>}}/>
        <Redirect from="*" to="/" render= {(props)=>{ return <StressGame {...props}/>}}/> 
        {/* <Route path="/admin" render={(props) => <Layout {...props} />} />
        <Redirect from="/" to="/admin/dashboard" /> */}
      </Switch>
    </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
