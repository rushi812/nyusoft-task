import React from 'react'
import PropTypes from 'prop-types'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import { noop } from '../../../../utils'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: '1.3rem',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  body: {
    fontSize: '1rem',
    textAlign: 'center'
  }
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow)

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  profileImage: {
    width: '10rem',
    height: 'auto'
  },
  actionBtnContainer: {
    display: 'flex'
  },
  actionBtn: {
    width: '100%',
    margin: '5px'
  },
  spinner: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  searchContainer: {
    display: 'flex',
    marginBottom: '1.5rem'
  },
  searchBtn: {
    marginLeft: '1rem'
  },
  showMoreBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem'
  },
  showMoreBtn: {}
}))

function RecordList({
  records,
  editRecordsBtnHandler,
  deleteRecordsBtnHandler,
  getRecordsLoading,
  searchInputHandler,
  clearSearchBtnHandler,
  searchText,
  showMoreBtnHandler,
  isMoreData
}) {
  const classes = useStyles()

  return (
    <Container component='main' maxWidth='xl' className={classes.root}>
      <CssBaseline />
      <form noValidate autoComplete='off'>
        <Grid container spacing={3}>
          <Grid item xs={8} className={classes.searchContainer}>
            <TextField
              id='outlined-basic'
              label='Search'
              variant='outlined'
              fullWidth
              value={searchText}
              onChange={(e) => searchInputHandler(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            <Button
              className={classes.searchBtn}
              variant='contained'
              color='primary'
              size='large'
              onClick={clearSearchBtnHandler}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>
      <Paper className={classes.root}>
        {getRecordsLoading ? (
          <div className={classes.spinner}>
            <CircularProgress color='secondary' />
          </div>
        ) : (
          <>
            <TableContainer className={classes.container}>
              <Table
                stickyHeader
                className={classes.table}
                aria-label='simple table'
              >
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Hobby</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>Picture</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {records &&
                    records.length > 0 &&
                    records.map((record, index) => {
                      return (
                        <StyledTableRow key={record.id}>
                          <StyledTableCell component='th' scope='row'>
                            {record.name}
                          </StyledTableCell>
                          <StyledTableCell>{record.hobby}</StyledTableCell>
                          <StyledTableCell>{record.email}</StyledTableCell>
                          <StyledTableCell>
                            <img
                              className={classes.profileImage}
                              src={record.profileimg}
                              alt='user profile'
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <div className={classes.actionBtnContainer}>
                              <Button
                                className={classes.actionBtn}
                                variant='contained'
                                color='primary'
                                size='large'
                                onClick={(e) =>
                                  editRecordsBtnHandler(e, record)
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                className={classes.actionBtn}
                                variant='contained'
                                color='primary'
                                size='large'
                                onClick={(e) =>
                                  deleteRecordsBtnHandler(e, record.id)
                                }
                              >
                                Delete
                              </Button>
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Paper>
      {records && records.length > 0 && isMoreData && (
        <div className={classes.showMoreBtnContainer}>
          <Button
            className={classes.showMoreBtn}
            variant='outlined'
            color='default'
            size='large'
            onClick={showMoreBtnHandler}
            endIcon={<ArrowDropDownIcon />}
          >
            Show More
          </Button>
        </div>
      )}
    </Container>
  )
}

RecordList.propTypes = {
  editRecordsBtnHandler: PropTypes.func,
  deleteRecordsBtnHandler: PropTypes.func,
  records: PropTypes.instanceOf(Array),
  getRecordsLoading: PropTypes.bool,
  searchInputHandler: PropTypes.func,
  clearSearchBtnHandler: PropTypes.func,
  searchText: PropTypes.string,
  showMoreBtnHandler: PropTypes.func,
  isMoreData: PropTypes.bool
}

RecordList.defaultProps = {
  editRecordsBtnHandler: noop,
  deleteRecordsBtnHandler: noop,
  records: [],
  getRecordsLoading: false,
  searchInputHandler: noop,
  clearSearchBtnHandler: noop,
  searchText: '',
  showMoreBtnHandler: noop,
  isMoreData: false
}

export default RecordList
