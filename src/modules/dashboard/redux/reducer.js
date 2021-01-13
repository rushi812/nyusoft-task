import * as actionTypes from './actionTypes'

const INITIAL_STATE = {
  details: [],
  addDetailsLoading: false,
  getRecordsLoading: false,
  deleteDetailsLoading: false,
  updateDetailsLoading: false
}

const appReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case actionTypes.GET_RECORDS_LOADING:
      return {
        ...state,
        getRecordsLoading: true
      }
    case actionTypes.GET_RECORDS_SUCCESS:
      return {
        ...state,
        getRecordsLoading: true,
        details: payload
      }
    case actionTypes.GET_RECORDS_ERROR:
      return {
        ...state,
        getRecordsLoading: false
      }
    case actionTypes.ADD_DETAILS_LOADING:
      return {
        ...state,
        addDetailsLoading: true
      }
    case actionTypes.ADD_DETAILS_SUCCESS:
      return {
        ...state,
        addDetailsLoading: false,
        details: [...state.details, payload]
      }
    case actionTypes.ADD_DETAILS_ERROR:
      return {
        ...state,
        addDetailsLoading: false
      }
    case actionTypes.DELETE_DETAILS_LOADING:
      return {
        ...state,
        deleteDetailsLoading: true
      }
    case actionTypes.DELETE_DETAILS_SUCCESS:
      return {
        ...state,
        deleteDetailsLoading: false,
        details: state.details.filter((x) => x.id !== payload)
      }
    case actionTypes.DELETE_DETAILS_ERROR:
      return {
        ...state,
        deleteDetailsLoading: false
      }
    case actionTypes.UPDATE_DETAILS_LOADING:
      return {
        ...state,
        updateDetailsLoading: true
      }
    case actionTypes.UPDATE_DETAILS_SUCCESS:
      return {
        ...state,
        updateDetailsLoading: false
        // details: state.details.map((x) =>
        //   x.id === payload.id
        //     ? {
        //         ...payload
        //       }
        //     : x
        // )
      }
    case actionTypes.UPDATE_DETAILS_ERROR:
      return {
        ...state,
        updateDetailsLoading: false
      }
    default:
      return state
  }
}

export default appReducer
