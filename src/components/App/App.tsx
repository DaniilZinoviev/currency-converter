import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Home, CurrencyRate } from "../../pages";
import { AppState, ActionCreator } from "../../store/models";
import { updateRates } from "../../store/actions";
import { Header } from "..";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CurrencyApiContext } from "../../contexts";

interface AppProps {
  updateRates: ActionCreator;
}

const App = ({ updateRates }: AppProps) => {
  const apiService = useContext(CurrencyApiContext);

  useEffect(() => {
    /**
     * Get currency rates.
     * These rates will later be used on calculation and in the currency rates list
     */
    apiService
      .getCurrencyRates()
      .then((result) => {
        updateRates(result.rates);
        console.log(`Rates was udpated. New rates are`, result.rates);
      })
      .catch((e) => {
        /**
         * @todo A modal with error message
         */
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

const mapStateToProps = (state: AppState) => {
  return {
    baseCurrency: state.baseCurrency,
    rates: state.rates,
  };
};

export default connect(mapStateToProps, { updateRates })(App);
