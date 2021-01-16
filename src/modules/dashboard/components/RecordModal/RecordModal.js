import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import RecordForm from './RecordForm/RecordForm'
import { noop } from '../../../../utils'

const useStyles = makeStyles((theme) => ({
  modal: {
    overflow: 'scroll',
    height: '100%'
  }
}))

const ProductModal = ({
  open,
  handleModal,
  addRecordsButtonHandler,
  addRecordsInputHandler,
  updateRecordsButtonHandler,
  state,
  clearState,
  handleGenderChange,
  handleEducationChange,
  handleHobbyChange,
  handleExperienceChange,
  handleAddClick,
  handleRemoveClick,
  handleInputFileChange
}) => {
  const classes = useStyles()

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <RecordForm
            addRecordsButtonHandler={() => {
              addRecordsButtonHandler()
              handleModal()
            }}
            addRecordsInputHandler={addRecordsInputHandler}
            updateRecordsButtonHandler={updateRecordsButtonHandler}
            state={state}
            handleModal={handleModal}
            clearState={clearState}
            handleGenderChange={handleGenderChange}
            handleEducationChange={handleEducationChange}
            handleHobbyChange={handleHobbyChange}
            handleExperienceChange={handleExperienceChange}
            handleAddClick={handleAddClick}
            handleRemoveClick={handleRemoveClick}
            handleInputFileChange={handleInputFileChange}
          />
        </Fade>
      </Modal>
    </div>
  )
}

ProductModal.propTypes = {
  open: PropTypes.bool,
  handleModal: PropTypes.func,
  addProductButtonHandler: PropTypes.func,
  addProductInputHandler: PropTypes.func,
  updateProductButtonHandler: PropTypes.func,
  state: PropTypes.instanceOf(Object),
  clearState: PropTypes.func
}

ProductModal.defaultProps = {
  open: false,
  handleModal: noop,
  addProductButtonHandler: noop,
  addProductInputHandler: noop,
  updateProductButtonHandler: noop,
  state: {},
  clearState: noop
}

export default ProductModal
