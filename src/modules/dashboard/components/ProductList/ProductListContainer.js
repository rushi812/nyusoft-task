import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as action from '../../redux/action'
import ProductList from './ProductList'
import { noop } from '../../../../utils'

const ProductListContainer = ({
  details,
  deleteDetailsBtnHandler,
  editDetailsBtnHandler,
  getAllRecords
}) => {
  useEffect(() => {
    if (details.length === 0) {
      getAllRecords('', 100, 0)
    }
  }, [details])

  return (
    <ProductList
      details={details}
      deleteDetailsBtnHandler={deleteDetailsBtnHandler}
      editDetailsBtnHandler={editDetailsBtnHandler}
    />
  )
}

ProductListContainer.propTypes = {
  details: PropTypes.instanceOf(Array),
  deleteDetailsBtnHandler: PropTypes.func,
  editDetailsBtnHandler: PropTypes.func
}

ProductListContainer.defaultProps = {
  details: [],
  deleteDetailsBtnHandler: noop,
  editDetailsBtnHandler: noop
}

const mapStateToProps = (state) => ({
  details: state.app.details
})

const mapDispatchToProps = (dispatch) => ({
  getAllRecords: (searchText, limit, offset) =>
    dispatch(action.getAllRecords(searchText, limit, offset))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListContainer)
