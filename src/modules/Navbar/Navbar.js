import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(4),
    fontSize: '2rem'
  },
  title: {
    flexGrow: 1,
    fontSize: '1rem'
  },
  linkStyle: {
    color: '#fff',
    textDecoration: 'none',
    transition: 'all 0.3s',
    padding: '1rem',
    textTransform: 'uppercase',
    borderRadius: '5px',
    '&:hover': {
      color: '#eee',
      backgroundColor: '#7d8eee4b'
    }
  },
  button: {
    color: '#fff',
    textDecoration: 'none',
    padding: theme.spacing(1),
    borderRadius: '5px'
  }
}))

function Navbar({ isLoggedIn, logoutButtonHandler }) {
  const classes = useStyles()

  return (
    <div>
      <Paper>
        <AppBar position='static'>
          <Toolbar>
            <Typography
              variant='h6'
              color='inherit'
              noWrap
              className={classes.menuButton}
            >
              <Link to='/' className={classes.linkStyle}>
                Record book
              </Link>
            </Typography>
            <Typography variant='h6' className={classes.title}>
              <Link to='/dashboard' className={classes.linkStyle}>
                Dashboard
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Paper>
    </div>
  )
}

export default Navbar
