import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import { noop } from '../../../utils'
import RecordListContainer from './RecordList/RecordListContainer'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      // padding: theme.spacing(1)
      // padding: 0
    }
  },
  addNewBtn: {
    padding: '0.8rem',
    margin: '24px'
  }
}))

const Dashboard = ({
  deleteRecordsBtnHandler,
  editRecordsBtnHandler,
  handleModal
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Button
        variant='contained'
        color='primary'
        onClick={handleModal}
        className={classes.addNewBtn}
      >
        Add New Record
      </Button>
      <RecordListContainer
        deleteRecordsBtnHandler={deleteRecordsBtnHandler}
        editRecordsBtnHandler={editRecordsBtnHandler}
      />
    </div>
  )
}

Dashboard.propTypes = {
  deleteRecordsBtnHandler: PropTypes.func,
  editRecordsBtnHandler: PropTypes.func,
  handleModal: PropTypes.func
}

Dashboard.defaultProps = {
  deleteRecordsBtnHandler: noop,
  editRecordsBtnHandler: noop,
  handleModal: noop
}

export default Dashboard
