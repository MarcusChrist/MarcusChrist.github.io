import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  // document.getElementById('root')
    <BrowserRouter>
      <Switch>
        <App />
        {/* <Route path="/admin" render={(props) => <Layout {...props} />} />
        <Redirect from="/" to="/admin/dashboard" /> */}
      </Switch>
    </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
