import React from "react";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import Nav from "./components/Nav";
import NoMatch from "./pages/NoMatch";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path={["/", "/search"]}>
          <Search />
        </Route>
        <Route exact path="/saved">
          <Saved />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;