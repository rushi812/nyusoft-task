import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Navbar from './Navbar'

class NavbarContainer extends Component {
  render() {
    return <Navbar />
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavbarContainer))
