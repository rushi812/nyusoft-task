import * as actionTypes from './actionTypes'

import {
  addDetailsApi,
  getAllRecordsApi,
  deleteDetailsApi,
  updatedDetailsApi
} from '../../../api/api'

export const getAllRecords = (searchText, limit, offset) => ({
  type: actionTypes.GET_RECORDS,
  payload: getAllRecordsApi(searchText, limit, offset)
})

export const addDetails = (details) => ({
  type: actionTypes.ADD_DETAILS,
  payload: addDetailsApi(details)
})

export const deleteDetails = (id) => ({
  type: actionTypes.DELETE_DETAILS,
  payload: deleteDetailsApi(id)
})

export const updateDetails = (updatedDetails) => ({
  type: actionTypes.UPDATE_DETAILS,
  payload: updatedDetailsApi(updatedDetails)
})
