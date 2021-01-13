import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dashboard from './Dashboard'
import * as action from '../redux/action'
import ProductModal from './ProductModal/ProductModal'

import { noop } from '../../../utils'

class DashboardContainer extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    education: '',
    hobby: [],
    experienceList: [{ experience: '' }],
    profileimg: {},
    message: '',
    open: false,
    isEditMode: false
  }

  handleModal = () => {
    const { open } = this.state
    this.setState({
      open: !open
    })
  }

  clearState = () => {
    this.setState({
      name: '',
      email: '',
      phone: '',
      gender: 'male',
      education: '',
      hobby: [],
      experienceList: [{ experience: '' }],
      profileimg: {},
      message: ''
    })
  }

  handleGenderChange = (event) => {
    const { value } = event.target
    this.setState({
      gender: value
    })
  }

  handleEducationChange = (event) => {
    const { value } = event.target
    this.setState({
      education: value
    })
  }

  handleHobbyChange = (event, selectedHobby) => {
    const { hobby } = this.state
    const { value, checked } = event.target
    if (checked) {
      this.setState({
        hobby: [
          ...this.state.hobby,
          {
            category: value
          }
        ]
      })
    } else {
      this.setState({
        hobby: hobby.filter((x) => x.category !== selectedHobby.category)
      })
    }
  }
  // EXPERIENCE STARTS

  handleExperienceChange = (e, index) => {
    const { experienceList } = this.state
    const { name, value } = e.target
    const list = [...experienceList]
    list[index][name] = value
    this.setState({
      experienceList: list
    })
  }

  handleRemoveClick = (index) => {
    const { experienceList } = this.state
    const list = [...experienceList]
    list.splice(index, 1)
    this.setState({
      experienceList: list
    })
  }

  handleAddClick = () => {
    const { experienceList } = this.state
    this.setState({
      experienceList: [...experienceList, { experience: '' }]
    })
  }

  // EXPERIENCE STOPS

  handleInputFileChange = (e) => {
    const { files } = e.target
    if (files.length > 0) {
      this.setState({
        profileimg: files[0]
      })
    }
  }

  addDetailsInputHandler = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  addDetailsButtonHandler = () => {
    const { addDetails } = this.props
    const { experienceList, hobby } = this.state

    const tempExperienceList =
      experienceList && experienceList.map((x) => x.experience).join()

    const tempHobby = hobby && hobby.map((x) => x.category.toLowerCase()).join()

    const details = {
      ...this.state,
      experience: tempExperienceList,
      hobby: tempHobby
    }
    delete details.experienceList
    delete details.open
    delete details.isEditMode
    addDetails(details)
    this.clearState()
  }

  deleteDetailsBtnHandler = (e, id) => {
    const { deleteDetails, getAllRecords } = this.props
    deleteDetails(id).then(() => {
      getAllRecords('', 100, 0)
    })
  }

  editDetailsBtnHandler = (e, detail) => {
    const {
      id,
      name,
      email,
      phone,
      gender,
      education,
      hobby,
      experience,
      profileimg,
      message
    } = detail
    console.log('RB:: => DashboardContainer => detail', detail)
    const tempExperience = experience.split(',').map((x) => {
      return {
        experience: x
      }
    })
    const tempHobby = hobby.split(',').map((x) => {
      return {
        category: x
      }
    })
    this.setState({
      id,
      name,
      email,
      phone,
      gender: gender.toLowerCase(),
      education,
      hobby: tempHobby,
      experienceList: tempExperience,
      profileimg,
      message,
      isEditMode: true
    })
    this.handleModal()
  }

  updateDetailsButtonHandler = () => {
    const { updateDetails, getAllRecords } = this.props
    const { experienceList, hobby } = this.state

    const tempExperienceList =
      experienceList && experienceList.map((x) => x.experience).join()

    const tempHobby = hobby && hobby.map((x) => x.category.toLowerCase()).join()

    const updatedDetails = {
      ...this.state,
      experience: tempExperienceList,
      hobby: tempHobby
    }
    delete updatedDetails.experienceList
    delete updatedDetails.open
    delete updatedDetails.isEditMode
    console.log('RB:: updated record', updatedDetails)
    updateDetails(updatedDetails).then(() => {
      getAllRecords('', 100, 0)
    })
    this.handleModal()
    this.clearState()
  }

  render() {
    const { open } = this.state
    return (
      <>
        <Dashboard
          addDetailsButtonHandler={this.addDetailsButtonHandler}
          addDetailsInputHandler={this.addDetailsInputHandler}
          state={this.state}
          deleteDetailsBtnHandler={this.deleteDetailsBtnHandler}
          editDetailsBtnHandler={this.editDetailsBtnHandler}
          handleModal={this.handleModal}
        />
        <ProductModal
          open={open}
          handleModal={this.handleModal}
          addDetailsButtonHandler={this.addDetailsButtonHandler}
          addDetailsInputHandler={this.addDetailsInputHandler}
          updateDetailsButtonHandler={this.updateDetailsButtonHandler}
          state={this.state}
          clearState={this.clearState}
          handleGenderChange={this.handleGenderChange}
          handleEducationChange={this.handleEducationChange}
          handleHobbyChange={this.handleHobbyChange}
          handleExperienceChange={this.handleExperienceChange}
          handleAddClick={this.handleAddClick}
          handleRemoveClick={this.handleRemoveClick}
          handleInputFileChange={this.handleInputFileChange}
        />
      </>
    )
  }
}

DashboardContainer.propTypes = {
  addDetails: PropTypes.func,
  deleteDetails: PropTypes.func,
  updateDetails: PropTypes.func
}

DashboardContainer.defaultProps = {
  addDetails: noop,
  deleteDetails: noop,
  updateDetails: noop
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  addDetails: (details) => dispatch(action.addDetails(details)),
  deleteDetails: (id) => dispatch(action.deleteDetails(id)),
  updateDetails: (updatedDetails) =>
    dispatch(action.updateDetails(updatedDetails)),
  getAllRecords: (searchText, limit, offset) =>
    dispatch(action.getAllRecords(searchText, limit, offset))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
