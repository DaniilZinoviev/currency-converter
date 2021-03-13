import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { CurrencyApiContext } from "../contexts";
import { AppStore } from "../store/models";
import { connect } from "react-redux";
import { Rate } from "../services/CurrencyApi/models";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    margin: theme.spacing(2, 3),
  },
  inputGroupContainer: {
    margin: theme.spacing(2, 3),
  },
}));

const Home = ({ rates }: { rates: Rate }) => {
  const classes = useStyles();

  const apiService = useContext(CurrencyApiContext)
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [quantity, setQuantity] = useState(0);

  //rates: Rate, from: string, to: string, qty: numbe
  const result = apiService.convert(rates, fromCurrency, toCurrency, quantity);

  console.log(`Result is ${result}`, fromCurrency, toCurrency, quantity, typeof quantity);
  var currenciesList = ["RUB", "EUR", "USD"];

  const handleFromCurrencyChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFromCurrency(e.target.value as string);
  }

  const handleToCurrencyChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setToCurrency(e.target.value as string);
  }


  /**
   * @todo
   * 2 inputs and 2 dropdowns.
   */
  return (
    <section>
      <Typography variant="h6" className={classes.text}>
        Convert one currency to another
      </Typography>
      <Box className={classes.inputGroupContainer}>
        <FormControl variant="outlined">
          <Select
            labelId="from-currency-label"
            id="from-currency"
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
          >
            {currenciesList.map((value, i) => (
              <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="quantity"
          label="Quantity"
          type="number"
          value={quantity.toString()}
          onChange={e => setQuantity(+e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </Box>
      <Box className={classes.inputGroupContainer}>
        <FormControl variant="outlined">
          <Select
            labelId="to-currency-label"
            id="to-currency"
            value={toCurrency}
            onChange={handleToCurrencyChange}
          >
            {currenciesList.map((value) => (
              <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="result"
          label="Result"
          type="number"
          value={result}
          InputProps={{
            readOnly: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </Box>
    </section>
  );
};

const mapStateToProps = (state: AppStore) => {
  return {
    rates: state.rates
  }
}

export default connect(mapStateToProps)(Home);
