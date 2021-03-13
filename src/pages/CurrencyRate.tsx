import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { CurrencyApiContext } from "../contexts";
import { currencies } from "../mock";
import { CurrencyApi } from "../services";
import { Rate } from "../services/CurrencyApi/models";
import { AppState } from "../store/models";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid, { GridSpacing } from "@material-ui/core/Grid";

interface CurrencyRateProps {
  rates: Rate;
  baseCurrency: string;
}

const CurrencyRate = ({ rates, baseCurrency }: CurrencyRateProps) => {
  const apiService = useContext(CurrencyApiContext)

  const relatedRates: Rate = {};
  currencies
    .filter(currency => currency !== baseCurrency)
    .forEach(currency => {
      relatedRates[currency] = apiService.convert(rates, baseCurrency, currency, 1)
    });

  return (
    <List>
      <Grid container>
        {Object.keys(relatedRates).map((key) => {
          const val = relatedRates[key];
          let text = `1 ${baseCurrency} = ${val} ${key}`;
          if (val < 1) {
            text = `1 ${key} = ${(1 / val).toFixed(2)} ${baseCurrency}`;
          }
          return (
            <Grid item xs={12} md={12} key={key}>
              <ListItem key={key}>
                <ListItemText>{text}</ListItemText>
              </ListItem>
            </Grid>
          );
        })}
      </Grid>
    </List>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    rates: state.rates,
    baseCurrency: state.baseCurrency,
  };
};

export default connect(mapStateToProps)(CurrencyRate);
