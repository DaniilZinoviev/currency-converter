import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  },
  titleLink: {
    color: 'white',
    textDecoration: 'none'
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: 'white'
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          <RouterLink to="/" className={classes.titleLink}>
            ConvertMe
          </RouterLink>
        </Typography>
        <nav>
          <Link variant="button" to="/" component={RouterLink} className={classes.link}>
            Home
          </Link>
          <Link variant="button" to="/currency-rate" component={RouterLink} className={classes.link}>
          Currency Rate
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
/**
 * <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      News
    </Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar>
 */
