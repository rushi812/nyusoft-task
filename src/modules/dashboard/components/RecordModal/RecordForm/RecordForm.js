import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import { noop } from '../../../../../utils'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300
  },
  experienceContainer: {
    display: 'flex'
  }
}))

function ProductForm({
  addRecordsButtonHandler,
  addRecordsInputHandler,
  updateRecordsButtonHandler,
  state,
  handleModal,
  clearState,
  handleGenderChange,
  handleEducationChange,
  handleHobbyChange,
  handleExperienceChange,
  handleAddClick,
  handleRemoveClick,
  handleInputFileChange
}) {
  const classes = useStyles()
  const [educationOptions, setEducationOptions] = useState([])
  const [hobbys, setHobbys] = useState([])
  useEffect(() => {
    const tempEduOptions = ['puc', 'bsc', 'diploma', 'BE', 'ME']
    const tempHobbys = [
      { category: 'cricket' },
      { category: 'singing' },
      { category: 'travelling' },
      { category: 'dancing' }
    ]
    setEducationOptions(tempEduOptions)
    setHobbys(tempHobbys)
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {state.isEditMode ? (
            <Typography component='h1' variant='h4' align='center'>
              Update Record
            </Typography>
          ) : (
            <Typography component='h1' variant='h4' align='center'>
              Add New Record
            </Typography>
          )}
          <React.Fragment>
            <form className={classes.form} noValidate autoComplete='off'>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    type='text'
                    onChange={addRecordsInputHandler}
                    value={state.name}
                    id='name'
                    name='name'
                    label='Name'
                    fullWidth
                    autoComplete='name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type='email'
                    value={state.email}
                    onChange={addRecordsInputHandler}
                    id='email'
                    name='email'
                    label='Email'
                    fullWidth
                    autoComplete='email'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type='number'
                    onChange={addRecordsInputHandler}
                    value={state.phone}
                    id='phone'
                    name='phone'
                    label='Phone'
                    fullWidth
                    autoComplete='phone'
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Gender</FormLabel>
                    <RadioGroup
                      aria-label='gender'
                      name='gender1'
                      value={state.gender}
                      onChange={handleGenderChange}
                    >
                      <FormControlLabel
                        value='female'
                        control={<Radio />}
                        label='Female'
                      />
                      <FormControlLabel
                        value='male'
                        control={<Radio />}
                        label='Male'
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant='outlined'
                    className={classes.formControl}
                  >
                    <InputLabel id='demo-simple-select-outlined-label'>
                      Education
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-outlined-label'
                      id='demo-simple-select-outlined'
                      value={state.education}
                      onChange={handleEducationChange}
                      label='Education'
                    >
                      {educationOptions &&
                        educationOptions.map((x) => {
                          return <MenuItem value={x}>{x}</MenuItem>
                        })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup row>
                    {hobbys &&
                      hobbys.map((hobby, index) => {
                        return (
                          <FormControlLabel
                            key={index + 1}
                            control={
                              <Checkbox
                                checked={
                                  state.hobby.length > 0
                                    ? state.hobby.find(
                                        (x) => x.category === hobby.category
                                      )
                                    : false
                                }
                                value={hobby.category}
                                onChange={(e) => handleHobbyChange(e, hobby)}
                                name='hobby'
                                color='primary'
                              />
                            }
                            label={hobby.category}
                          />
                        )
                      })}
                  </FormGroup>
                </Grid>
                <Grid item xs={8}>
                  {state.experienceList &&
                    state.experienceList.map((x, i) => {
                      return (
                        <div
                          className={classes.experienceContainer}
                          key={i + 1}
                        >
                          <TextField
                            type='text'
                            onChange={(e) => handleExperienceChange(e, i)}
                            value={x.experience}
                            id='experience'
                            name='experience'
                            label='Experience'
                            fullWidth
                            autoComplete='experience'
                          />
                          {state.experienceList.length - 1 === i && (
                            <IconButton
                              color='primary'
                              aria-label='add experience'
                              component='span'
                              onClick={handleAddClick}
                            >
                              <AddCircleOutlineIcon fontSize='large' />
                            </IconButton>
                          )}
                          {state.experienceList.length !== 1 && (
                            <IconButton
                              color='primary'
                              aria-label='remove experience'
                              component='span'
                              onClick={() => handleRemoveClick(i)}
                            >
                              <RemoveCircleOutlineIcon fontSize='large' />
                            </IconButton>
                          )}
                        </div>
                      )
                    })}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Picture
                  </Typography>
                  <Button variant='contained' component='label'>
                    <input
                      type='file'
                      name='file'
                      required
                      onChange={handleInputFileChange}
                    />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type='text'
                    multiline
                    rows={2}
                    rowsMax={4}
                    onChange={addRecordsInputHandler}
                    value={state.message}
                    id='message'
                    name='message'
                    label='Message'
                    fullWidth
                    autoComplete='message'
                  />
                </Grid>
              </Grid>
              <div className={classes.buttons}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={() => {
                    handleModal()
                    clearState()
                  }}
                  className={classes.button}
                >
                  Cancel
                </Button>
                {state.isEditMode ? (
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={updateRecordsButtonHandler}
                    className={classes.button}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    onClick={addRecordsButtonHandler}
                  >
                    Save
                  </Button>
                )}
              </div>
            </form>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  )
}

ProductForm.propTypes = {
  addRecordsButtonHandler: PropTypes.func,
  addRecordsInputHandler: PropTypes.func,
  updateRecordsButtonHandler: PropTypes.func,
  state: PropTypes.instanceOf(Object),
  handleModal: PropTypes.func,
  clearState: PropTypes.func
}

ProductForm.defaultProps = {
  addRecordsButtonHandler: noop,
  addRecordsInputHandler: noop,
  updateRecordsButtonHandler: noop,
  state: {},
  handleModal: noop,
  clearState: noop
}

export default ProductForm
