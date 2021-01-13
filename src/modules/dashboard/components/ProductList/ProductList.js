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
  block: {
    display: 'block',
    wordWrap: 'break-word'
  },
  root: {
    width: '100%'
  },
  purple: {
    color: '#fff',
    backgroundColor: '#3f51b5',
    padding: '1.5rem',
    marginRight: '1.3rem'
  },
  icon: {
    marginTop: '10px'
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
  }
}))

function ProductList({
  details,
  editDetailsBtnHandler,
  deleteDetailsBtnHandler
}) {
  const classes = useStyles()

  return (
    <Container component='main' maxWidth='xl'>
      <CssBaseline />
      <Paper className={classes.root}>
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
              {details &&
                details.length > 0 &&
                details.map((detail, index) => {
                  return (
                    <StyledTableRow
                      key={detail.id}
                      // ref={
                      //   questions.items.length === index + 1
                      //     ? lastQuestionElementref
                      //     : null
                      // }
                    >
                      <StyledTableCell component='th' scope='row'>
                        {detail.name}
                      </StyledTableCell>
                      <StyledTableCell>{detail.hobby}</StyledTableCell>
                      <StyledTableCell>{detail.email}</StyledTableCell>
                      <StyledTableCell>
                        <img
                          className={classes.profileImage}
                          src={detail.profileimg}
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
                            onClick={(e) => editDetailsBtnHandler(e, detail)}
                          >
                            Edit
                          </Button>
                          <Button
                            className={classes.actionBtn}
                            variant='contained'
                            color='primary'
                            size='large'
                            onClick={(e) =>
                              deleteDetailsBtnHandler(e, detail.id)
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
      </Paper>
    </Container>
  )
}

ProductList.propTypes = {
  editButtonHandler: PropTypes.func,
  removeButtonHandler: PropTypes.func,
  products: PropTypes.instanceOf(Array)
}

ProductList.defaultProps = {
  editButtonHandler: noop,
  removeButtonHandler: noop,
  products: []
}

export default ProductList
