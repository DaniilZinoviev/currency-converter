import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link as RouterLink,
  Redirect,
} from "react-router-dom";
import { Home, CurrencyRate } from "../../pages";
import { AppStore, ActionCreator } from "../../store/models";
import { updateRates } from "../../store/actions";
import { Header } from "..";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CurrencyApiContext } from "../../contexts";


const App = ({ updateRates }: { updateRates: ActionCreator }) => {
  const apiService = useContext(CurrencyApiContext)

  useEffect(() => {
    apiService
      .getCurrencyRates()
      .then((result) => {
        updateRates(result.rates);
        console.log(`Rates was udpated. New rates are`, result.rates)
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, [apiService]);

  return (
      <Router>
        <CssBaseline>

          <Header />

          <Switch>
            <Route path="/currency-rate">
              <CurrencyRate />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
            <Redirect to="/" />
          </Switch>

        </CssBaseline>
      </Router>
  );
};

const mapStateToProps = (store: AppStore) => {
  return {
    baseCurrency: store.baseCurrency,
    rates: store.rates,
  };
};

export default connect(mapStateToProps, { updateRates })(App);
