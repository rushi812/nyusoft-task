import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as action from '../../redux/action'
import RecordList from './RecordList'
import { noop } from '../../../../utils'

let dataLimit = 5

const RecordListContainer = ({
  records,
  deleteRecordsBtnHandler,
  editRecordsBtnHandler,
  getAllRecords,
  getRecordsLoading,
  isMoreData
}) => {
  const [computedRecords, setComputedRecords] = useState([])
  const [searchText, setSearchText] = useState('')
  const [currentOffset, setCurrentOffset] = useState(0)
  useEffect(() => {
    if (records.length === 0) {
      getAllRecords(searchText, dataLimit, 0).then((res) => {
        if (res && res.value.length > 0) {
          setComputedRecords(res.value)
        }
      })
    } else {
      setComputedRecords(records)
    }
  }, [records])

  useEffect(() => {
    if (searchText && searchText !== '') {
      const tempComputedRecords =
        computedRecords &&
        computedRecords.filter(
          (record) =>
            record.name.toLowerCase().includes(searchText) ||
            record.hobby.toLowerCase().includes(searchText) ||
            record.email.toLowerCase().includes(searchText)
        )

      setComputedRecords(tempComputedRecords)
    } else {
      setComputedRecords(records)
    }
  }, [searchText])

  const searchInputHandler = (e) => {
    const { value } = e.target
    setSearchText(value)
  }

  const clearSearchBtnHandler = () => {
    setSearchText('')
  }

  const showMoreBtnHandler = () => {
    setCurrentOffset(currentOffset + dataLimit)
    if (searchText !== '') {
      getAllRecords(searchText, dataLimit, currentOffset + dataLimit)
    } else {
      getAllRecords('', dataLimit, currentOffset + dataLimit)
    }
  }

  return (
    <RecordList
      records={computedRecords}
      deleteRecordsBtnHandler={deleteRecordsBtnHandler}
      editRecordsBtnHandler={editRecordsBtnHandler}
      getRecordsLoading={getRecordsLoading}
      searchInputHandler={searchInputHandler}
      clearSearchBtnHandler={clearSearchBtnHandler}
      searchText={searchText}
      showMoreBtnHandler={showMoreBtnHandler}
      isMoreData={isMoreData}
    />
  )
}

RecordListContainer.propTypes = {
  records: PropTypes.instanceOf(Array),
  deleteRecordsBtnHandler: PropTypes.func,
  editRecordsBtnHandler: PropTypes.func,
  getRecordsLoading: PropTypes.bool,
  isMoreData: PropTypes.bool
}

RecordListContainer.defaultProps = {
  records: [],
  deleteRecordsBtnHandler: noop,
  editRecordsBtnHandler: noop,
  getRecordsLoading: false,
  isMoreData: false
}

const mapStateToProps = (state) => ({
  records: state.app.records,
  getRecordsLoading: state.app.getRecordsLoading,
  isMoreData: state.app.isMoreData
})

const mapDispatchToProps = (dispatch) => ({
  getAllRecords: (searchText, limit, offset) =>
    dispatch(action.getAllRecords(searchText, limit, offset))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecordListContainer)
