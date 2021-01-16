import * as actionTypes from './actionTypes'

const INITIAL_STATE = {
  records: [],
  addRecordsLoading: false,
  getRecordsLoading: false,
  deleteRecordsLoading: false,
  updateRecordsLoading: false,
  isMoreData: false
}

const appReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case actionTypes.GET_RECORDS_LOADING:
      return {
        ...state,
        getRecordsLoading: true
      }
    case actionTypes.GET_RECORDS_SUCCESS: {
      let tempRecords
      if (payload && payload.length > 0) {
        if (state.records && state.records.length > 0) {
          tempRecords = [...state.records, ...payload]
        } else {
          tempRecords = payload
        }
      } else {
        tempRecords = []
      }
      return {
        ...state,
        getRecordsLoading: false,
        records: tempRecords,
        isMoreData: payload && payload.length > 0 ? true : false
      }
    }
    case actionTypes.GET_RECORDS_ERROR:
      return {
        ...state,
        getRecordsLoading: false
      }
    case actionTypes.ADD_RECORDS_LOADING:
      return {
        ...state,
        addRecordsLoading: true
      }
    case actionTypes.ADD_RECORDS_SUCCESS:
      return {
        ...state,
        addRecordsLoading: false,
        records: [...state.records, payload]
      }
    case actionTypes.ADD_RECORDS_ERROR:
      return {
        ...state,
        addRecordsLoading: false
      }
    case actionTypes.DELETE_RECORDS_LOADING:
      return {
        ...state,
        deleteRecordsLoading: true
      }
    case actionTypes.DELETE_RECORDS_SUCCESS:
      return {
        ...state,
        deleteRecordsLoading: false,
        records: state.records.filter((x) => x.id !== payload)
      }
    case actionTypes.DELETE_RECORDS_ERROR:
      return {
        ...state,
        deleteRecordsLoading: false
      }
    case actionTypes.UPDATE_RECORDS_LOADING:
      return {
        ...state,
        updateRecordsLoading: true
      }
    case actionTypes.UPDATE_RECORDS_SUCCESS:
      return {
        ...state,
        updateRecordsLoading: false
        // records: state.records.map((x) =>
        //   x.id === payload.id
        //     ? {
        //         ...payload
        //       }
        //     : x
        // )
      }
    case actionTypes.UPDATE_RECORDS_ERROR:
      return {
        ...state,
        updateRecordsLoading: false
      }
    default:
      return state
  }
}

export default appReducer
