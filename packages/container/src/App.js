import React, { lazy, Suspense, useState, useEffect } from "react"; // Lazily load different component inside of application
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import { createBrowserHistory } from 'history';

import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory()

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard')
    }
  },[isSignedIn])
  
  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true) }/>
              </Route>
              <Route path="/dashboard">
                {/* If user not signed in, redirect to landing page */}
                {!isSignedIn && <Redirect to="/" />} 
                <DashboardLazy />
              </Route>
              {/* path '/' must be at the bottom */}
              <Route path="/" component={MarketingLazy} /> 
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
