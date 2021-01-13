import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import { noop } from '../../../utils'
import ProductListContainer from './ProductList/ProductListContainer'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const Dashboard = ({
  deleteDetailsBtnHandler,
  editDetailsBtnHandler,
  handleModal
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Button variant='contained' color='primary' onClick={handleModal}>
        Add New Record
      </Button>
      <ProductListContainer
        deleteDetailsBtnHandler={deleteDetailsBtnHandler}
        editDetailsBtnHandler={editDetailsBtnHandler}
      />
    </div>
  )
}

Dashboard.propTypes = {
  deleteDetailsBtnHandler: PropTypes.func,
  editDetailsBtnHandler: PropTypes.func,
  handleModal: PropTypes.func
}

Dashboard.defaultProps = {
  deleteDetailsBtnHandler: noop,
  editDetailsBtnHandler: noop,
  handleModal: noop
}

export default Dashboard
