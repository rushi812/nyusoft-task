import * as actionTypes from './actionTypes'

import {
  addRecordsApi,
  getAllRecordsApi,
  deleteRecordsApi,
  updatedRecordsApi
} from '../../../api/api'

export const getAllRecords = (searchText, limit, offset) => ({
  type: actionTypes.GET_RECORDS,
  payload: getAllRecordsApi(searchText, limit, offset)
})

export const addRecords = (records) => ({
  type: actionTypes.ADD_RECORDS,
  payload: addRecordsApi(records)
})

export const deleteRecords = (id) => ({
  type: actionTypes.DELETE_RECORDS,
  payload: deleteRecordsApi(id)
})

export const updateRecords = (updatedRecords) => ({
  type: actionTypes.UPDATE_RECORDS,
  payload: updatedRecordsApi(updatedRecords)
})
