import React, { useEffect } from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Signin from "./components/Signin";
import Signup from "./components/Signup";

const generateClassname = createGenerateClassName({
  productionPrefix: "au", // instead of generating jss, it will be ma
});

export default ({ history, onSignIn }) => {
  useEffect(() => {
    console.log(onSignIn);
  }, [onSignIn]);
  return (
    <div>
      {/* StylesProvider is used to customise CSS and JS generation stuff */}
      <StylesProvider generateClassName={generateClassname}>
        <Router history={history}>
          <Switch>
            <Route path="/auth/signin">
              <Signin onSignIn={onSignIn} />
            </Route>
            <Route path="/auth/signup">
              <Signup onSignIn={onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
