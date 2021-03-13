import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import { ActionCreator, AppState } from "../../store/models";
import { currencies } from "../../mock";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";
import CloseIcon from '@material-ui/icons/Close';
import Fab from "@material-ui/core/Fab";
import Paper from "@material-ui/core/Paper";
import { FormHelperText, InputLabel } from "@material-ui/core";
import { updateBaseCurrency } from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  titleLink: {
    color: "white",
    textDecoration: "none",
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: "white",
  },
  modalWrap: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  modal: {
    position: 'relative',
    width: 600,
    maxWidth: "100%",
    margin: theme.spacing(2),
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalTitle: {
    textAlign: 'center',
    margin: theme.spacing(1, 1, 4),
  },
  modalClose: {
    position: 'absolute',
    right: '1rem',
    top: '1rem'
  }
}));

interface HeaderProps {
  baseCurrency: string;
  updateBaseCurrency: ActionCreator;
}

const Header = ({ baseCurrency, updateBaseCurrency }: HeaderProps) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    {
      path: '/',
      label: 'Home'
    },
    {
      path: '/currency-rate',
      label: 'Currency Rate'
    },
  ];

  const changeBaseCurrency = (e: React.ChangeEvent<{ value: unknown }>) => {
    console.log(`changeBaseCurrency to ${e.target.value}`);
    updateBaseCurrency(e.target.value as string);
  };

  const modalContent = (
    <div className={classes.modalWrap}>
      <Paper className={classes.modal}>
        <div>
          <Typography variant="h5" className={classes.modalTitle}>Settings</Typography>
        </div>

        <FormControl variant="outlined">
          <InputLabel id="settings-baseCurrency">
            Base Currency
          </InputLabel>
          <Select
            labelId="settings-baseCurrency"
            id="from-currency"
            value={baseCurrency}
            onChange={changeBaseCurrency}
            label="Base Currency"
          >
            {currencies.map((value, i) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            Here you can choose a base currency. This will update currency rates based on new base currency
          </FormHelperText>
        </FormControl>

        
        <Fab
          size="medium"
          color="secondary"
          className={classes.modalClose}
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon />
        </Fab>
      </Paper>
    </div>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          <RouterLink to="/" className={classes.titleLink}>
            ConvertMe
          </RouterLink>
        </Typography>
        <nav>
          {routes.map(({ label, path }) => (
            <Link
              key={path}
              variant="button"
              to={path}
              component={RouterLink}
              className={classes.link}
            >
              {label}
            </Link>
          ))}
          <Fab
            size="medium"
            color="primary"
            className={classes.link}
            onClick={() => setIsOpen(true)}
          >
            <SettingsIcon />
          </Fab>
        </nav>
      </Toolbar>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="Settings"
      >
        {modalContent}
      </Modal>
    </AppBar>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    baseCurrency: state.baseCurrency,
  };
};

export default connect(mapStateToProps, { updateBaseCurrency })(Header);
