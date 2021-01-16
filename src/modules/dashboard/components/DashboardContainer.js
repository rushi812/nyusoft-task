import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dashboard from './Dashboard'
import * as action from '../redux/action'
import RecordModal from './RecordModal/RecordModal'

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

  addRecordsInputHandler = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  addRecordsButtonHandler = () => {
    const { addRecords } = this.props
    const { experienceList, hobby } = this.state

    const tempExperienceList =
      experienceList && experienceList.map((x) => x.experience).join()

    const tempHobby = hobby && hobby.map((x) => x.category.toLowerCase()).join()

    const records = {
      ...this.state,
      experience: tempExperienceList,
      hobby: tempHobby
    }
    delete records.experienceList
    delete records.open
    delete records.isEditMode
    addRecords(records)
    this.clearState()
  }

  deleteRecordsBtnHandler = (e, id) => {
    const { deleteRecords, getAllRecords } = this.props
    deleteRecords(id).then(() => {
      getAllRecords('', 5, 0)
    })
  }

  editRecordsBtnHandler = (e, record) => {
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
    } = record
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

  updateRecordsButtonHandler = () => {
    const { updateRecords, getAllRecords } = this.props
    const { experienceList, hobby } = this.state

    const tempExperienceList =
      experienceList && experienceList.map((x) => x.experience).join()

    const tempHobby = hobby && hobby.map((x) => x.category.toLowerCase()).join()

    const updatedRecords = {
      ...this.state,
      experience: tempExperienceList,
      hobby: tempHobby
    }
    delete updatedRecords.experienceList
    delete updatedRecords.open
    delete updatedRecords.isEditMode
    console.log('RB:: updated record', updatedRecords)
    updateRecords(updatedRecords).then(() => {
      getAllRecords('', 5, 0)
    })
    this.handleModal()
    this.clearState()
  }

  render() {
    const { open } = this.state
    return (
      <>
        <Dashboard
          addRecordsButtonHandler={this.addRecordsButtonHandler}
          addRecordsInputHandler={this.addRecordsInputHandler}
          state={this.state}
          deleteRecordsBtnHandler={this.deleteRecordsBtnHandler}
          editRecordsBtnHandler={this.editRecordsBtnHandler}
          handleModal={this.handleModal}
        />
        <RecordModal
          open={open}
          handleModal={this.handleModal}
          addRecordsButtonHandler={this.addRecordsButtonHandler}
          addRecordsInputHandler={this.addRecordsInputHandler}
          updateRecordsButtonHandler={this.updateRecordsButtonHandler}
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
  addRecords: PropTypes.func,
  deleteRecords: PropTypes.func,
  updateRecords: PropTypes.func
}

DashboardContainer.defaultProps = {
  addRecords: noop,
  deleteRecords: noop,
  updateRecords: noop
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  addRecords: (records) => dispatch(action.addRecords(records)),
  deleteRecords: (id) => dispatch(action.deleteRecords(id)),
  updateRecords: (updatedRecords) =>
    dispatch(action.updateRecords(updatedRecords)),
  getAllRecords: (searchText, limit, offset) =>
    dispatch(action.getAllRecords(searchText, limit, offset))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
