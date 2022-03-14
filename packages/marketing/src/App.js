import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

const generateClassname = createGenerateClassName({
  productionPrefix: 'ma', // instead of generating jss, it will be ma
})

export default ({ history }) => {
  return (
    <div>
      {/* StylesProvider is used to customise CSS and JS generation stuff */}
      <StylesProvider generateClassName={generateClassname}> 
        <Router history={history}>
          <Switch>
            <Route exact path="/pricing" component={Pricing}></Route>
            <Route path="/" component={Landing}></Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
