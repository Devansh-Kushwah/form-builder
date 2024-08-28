import React, { useState } from 'react'

import {
  Box,
  Typography,
  IconButton,
  Input,
  Button,
  FormControlLabel,
  Radio,
  Switch,
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'

import AddIcon from '@mui/icons-material/Add'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import DeleteIcon from '@mui/icons-material/Delete'

import StarIcon from '@mui/icons-material/Star'

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'

import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'

import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral'

import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'

import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'

import CategoryIcon from '@mui/icons-material/Category'

import TextFieldsIcon from '@mui/icons-material/TextFields'

import './Formbuilder.css'

const Formbuilder = ({ onBack, onSave }) => {
  const [fields, setFields] = useState([])

  const [showAddField, setShowAddField] = useState(true)

  const [editingFieldId, setEditingFieldId] = useState(null)

  const [label, setLabel] = useState('')

  const [required, setRequired] = useState(true)

  const [errorMessage, setErrorMessage] = useState('')

  const [radioOptions, setRadioOptions] = useState([
    'Option 1',
    'Option 2',
    'Option 3',
  ])

  const [categoryButtons, setCategoryButtons] = useState([
    'Bug',
    'Content',
    'Other',
  ])

  const [showCategories, setShowCategories] = useState(false)

  const handlePublish = () => {
    onSave(fields)

    onBack()
  }

  const addTextArea = () => {
    const newFieldId = fields.length

    setFields([
      ...fields,
      {
        type: 'textarea',
        id: newFieldId,
        label: '',
        required: true,
        errorMessage: '',
      },
    ])

    setShowAddField(false)

    setEditingFieldId(newFieldId)
  }

  const addNumericRating = () => {
    const newFieldId = fields.length

    setFields([
      ...fields,
      {
        type: 'numeric-rating',
        id: newFieldId,
        label: '',
        required: true,
        errorMessage: '',
      },
    ])

    setShowAddField(false)

    setEditingFieldId(newFieldId)
  }

  const addStarRating = () => {
    const newFieldId = fields.length

    setFields([
      ...fields,
      {
        type: 'star-rating',
        id: newFieldId,
        label: '',
        required: true,
        errorMessage: '',
      },
    ])

    setShowAddField(false)

    setEditingFieldId(newFieldId)
  }

  const addSmileyRating = () => {
    const newFieldId = fields.length

    setFields([
      ...fields,
      {
        type: 'smiley-rating',
        id: newFieldId,
        label: '',
        required: true,
        errorMessage: '',
      },
    ])

    setShowAddField(false)

    setEditingFieldId(newFieldId)
  }

  const addSingleLineInput = () => {
    const newFieldId = fields.length

    setFields([
      ...fields,
      {
        type: 'single-line-input',
        id: newFieldId,
        label: '',
        required: true,
        errorMessage: '',
      },
    ])

    setShowAddField(false)

    setEditingFieldId(newFieldId)
  }

  const addRadioButton = () => {
    const newFieldId = fields.length

    setFields([
      ...fields,
      {
        type: 'radio-button',
        id: newFieldId,
        label: '',
        required: true,
        errorMessage: '',
        options: ['Option 1', 'Option 2', 'Option 3'],
        selectedOption: null,
      },
    ])

    setShowAddField(false)

    setEditingFieldId(newFieldId)
  }

  const addCategoryButtons = () => {
    const newFieldId = fields.length

    setFields([
      ...fields,
      {
        type: 'category-buttons',
        id: newFieldId,
        label: '',
        required: true,
        errorMessage: '',
        buttons: ['Bug', 'Content', 'Other'],
      },
    ])

    setShowAddField(false)

    setEditingFieldId(newFieldId)
  }

  const backToAddFields = () => {
    setShowAddField(true)

    setEditingFieldId(null)

    setLabel('')

    setRequired(true)

    setErrorMessage('')

    setRadioOptions(['Option 1', 'Option 2', 'Option 3'])

    setCategoryButtons(['Bug', 'Content', 'Other'])

    setShowCategories(false)
  }

  const handleSave = () => {
    setFields(
      fields.map((field) => {
        if (field.id === editingFieldId) {
          if (field.type === 'radio-button') {
            return {
              ...field,
              label,
              required,
              errorMessage,
              options: radioOptions,
            }
          } else if (field.type === 'category-buttons') {
            return {
              ...field,
              label,
              required,
              errorMessage,
              buttons: categoryButtons,
            }
          } else {
            return { ...field, label, required, errorMessage }
          }
        }

        return field
      }),
    )

    backToAddFields()
  }

  const handleCancel = () => {
    backToAddFields()
  }

  const deleteField = (id) => {
    setFields(fields.filter((field) => field.id !== id))

    if (id === editingFieldId) {
      backToAddFields()
    }
  }

  const handleEditClick = (id) => {
    const fieldToEdit = fields.find((field) => field.id === id)

    setLabel(fieldToEdit.label)

    setRequired(fieldToEdit.required)

    setErrorMessage(fieldToEdit.errorMessage)

    if (fieldToEdit.type === 'radio-button') {
      setRadioOptions(fieldToEdit.options || [])
    } else if (fieldToEdit.type === 'category-buttons') {
      setCategoryButtons(fieldToEdit.buttons || [])

      setShowCategories(true)
    }

    setEditingFieldId(id)

    setShowAddField(false)
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...radioOptions]

    newOptions[index] = value

    setRadioOptions(newOptions)
  }

  const handleCategoryChange = (index, value) => {
    const newButtons = [...categoryButtons]

    newButtons[index] = value

    setCategoryButtons(newButtons)
  }

  return (
    <Box className="formbuilder-container">
      <Box className="bottom-buttons-container">
        <Button variant="contained" color="primary" onClick={handlePublish}>
          Publish
        </Button>

        <Button variant="outlined" onClick={onBack}>
          Back To Dashboard
        </Button>
      </Box>

      <Box className="form-content">
        <Box className="header-strip">
          <Typography variant="h6" component="h1" className="header-text">
            Generic Website Rating
          </Typography>

          <IconButton className="header-icon">
            <EditIcon />
          </IconButton>
        </Box>

        {fields.map((field) => (
          <Box key={field.id} className="form-field">
            {field.type === 'textarea' && (
              <Box className="textarea-container">
                <Typography variant="body1">{field.label}</Typography>

                <textarea
                  className="custom-textarea"
                  placeholder="Enter text..."
                />

                <Box className="textarea-icons">
                  <IconButton
                    onClick={() => handleEditClick(field.id)}
                    className="edit-icon"
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => deleteField(field.id)}
                    className="delete-icon"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            )}

            {field.type === 'numeric-rating' && (
              <Box className="numeric-rating-container">
                <Typography variant="body1">{field.label}</Typography>

                <Box className="numeric-rating">
                  {[...Array(10)].map((_, index) => (
                    <Box
                      key={index}
                      className={`rating-box ${
                        index < (field.rating || 0) ? 'filled' : ''
                      }`}
                      onClick={() => {
                        const updatedFields = fields.map((f) =>
                          f.id === field.id ? { ...f, rating: index + 1 } : f,
                        )

                        setFields(updatedFields)
                      }}
                    >
                      {index + 1}
                    </Box>
                  ))}
                </Box>

                <Box className="textarea-icons">
                  <IconButton
                    onClick={() => handleEditClick(field.id)}
                    className="edit-icon"
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => deleteField(field.id)}
                    className="delete-icon"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            )}

            {field.type === 'star-rating' && (
              <Box className="star-rating-container">
                <Typography variant="body1">{field.label}</Typography>

                <Box className="star-rating">
                  {[...Array(5)].map((_, index) => (
                    <IconButton
                      key={index}
                      className={`star-icon ${
                        index < (field.rating || 0) ? 'filled' : ''
                      }`}
                      onClick={() => {
                        const updatedFields = fields.map((f) =>
                          f.id === field.id ? { ...f, rating: index + 1 } : f,
                        )

                        setFields(updatedFields)
                      }}
                    >
                      <StarIcon />
                    </IconButton>
                  ))}
                </Box>

                <Box className="textarea-icons">
                  <IconButton
                    onClick={() => handleEditClick(field.id)}
                    className="edit-icon"
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => deleteField(field.id)}
                    className="delete-icon"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            )}

            {field.type === 'smiley-rating' && (
              <Box className="smiley-rating-container">
                <Typography variant="body1">{field.label}</Typography>

                <Box className="smiley-rating">
                  {[...Array(5)].map((_, index) => {
                    const SmileyIcon = [
                      SentimentVeryDissatisfiedIcon,

                      SentimentDissatisfiedIcon,

                      SentimentNeutralIcon,

                      SentimentSatisfiedIcon,

                      SentimentVerySatisfiedIcon,
                    ][index]

                    return (
                      <IconButton
                        key={index}
                        className={`smiley-icon ${
                          index < (field.rating || 0) ? 'filled' : ''
                        }`}
                        onClick={() => {
                          const updatedFields = fields.map((f) =>
                            f.id === field.id ? { ...f, rating: index + 1 } : f,
                          )

                          setFields(updatedFields)
                        }}
                      >
                        <SmileyIcon />
                      </IconButton>
                    )
                  })}
                </Box>

                <Box className="textarea-icons">
                  <IconButton
                    onClick={() => handleEditClick(field.id)}
                    className="edit-icon"
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => deleteField(field.id)}
                    className="delete-icon"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            )}

            {field.type === 'single-line-input' && (
              <Box className="single-line-input-container">
                <Typography variant="body1">{field.label}</Typography>

                <Input
                  className="single-line-input"
                  placeholder="Enter text..."
                  fullWidth
                />

                <Box className="textarea-icons">
                  <IconButton
                    onClick={() => handleEditClick(field.id)}
                    className="edit-icon"
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => deleteField(field.id)}
                    className="delete-icon"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            )}

            {field.type === 'radio-button' && (
              <Box className="radio-button-container">
                <Typography variant="body1">{field.label}</Typography>

                <Box className="radio-button-group">
                  {field.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Radio
                          checked={field.selectedOption === index}
                          onChange={() => {
                            const updatedFields = fields.map((f) =>
                              f.id === field.id
                                ? { ...f, selectedOption: index }
                                : f,
                            )

                            setFields(updatedFields)
                          }}
                        />
                      }
                      label={option}
                      className="radio-button"
                    />
                  ))}
                </Box>

                <Box className="textarea-icons">
                  <IconButton
                    onClick={() => handleEditClick(field.id)}
                    className="edit-icon"
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => deleteField(field.id)}
                    className="delete-icon"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            )}

            {field.type === 'category-buttons' && (
              <Box className="category-buttons-container">
                <Typography variant="body1">{field.label}</Typography>

                <Box className="category-buttons">
                  {field.buttons.map((button, index) => (
                    <Button
                      key={index}
                      className={`category-button ${
                        index < (field.selectedButton || 0) ? 'selected' : ''
                      }`}
                      onClick={() => {
                        const updatedFields = fields.map((f) =>
                          f.id === field.id
                            ? { ...f, selectedButton: index }
                            : f,
                        )

                        setFields(updatedFields)
                      }}
                    >
                      {button}
                    </Button>
                  ))}
                </Box>

                <Box className="textarea-icons">
                  <IconButton
                    onClick={() => handleEditClick(field.id)}
                    className="edit-icon"
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => deleteField(field.id)}
                    className="delete-icon"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Box>
        ))}
      </Box>

      <Box className="side-bar">
        {showAddField ? (
          <>
            <Typography variant="h6" className="side-bar-heading">
              Add Field
            </Typography>

            <Box className="add-field" onClick={addTextArea}>
              <Box className="field-image"></Box>

              <Typography variant="body1" className="field-text">
                Text Area
              </Typography>

              <IconButton className="add-icon">
                <AddIcon />
              </IconButton>
            </Box>

            <Box className="add-field" onClick={addNumericRating}>
              <Typography>98</Typography>

              <Typography variant="body1" className="field-text">
                Numeric Rating
              </Typography>

              <IconButton className="add-icon">
                <AddIcon />
              </IconButton>
            </Box>

            <Box className="add-field" onClick={addStarRating}>
              <StarIcon />

              <Typography variant="body1" className="field-text">
                Star Rating
              </Typography>

              <IconButton className="add-icon">
                <AddIcon />
              </IconButton>
            </Box>

            <Box className="add-field" onClick={addSmileyRating}>
              <SentimentSatisfiedIcon />

              <Typography variant="body1" className="field-text">
                Smiley Rating
              </Typography>

              <IconButton className="add-icon">
                <AddIcon />
              </IconButton>
            </Box>

            <Box className="add-field" onClick={addSingleLineInput}>
              <Box className="field-image">
                <TextFieldsIcon />
              </Box>

              <Typography variant="body1" className="field-text">
                Single Line Input
              </Typography>

              <IconButton className="add-icon">
                <AddIcon />
              </IconButton>
            </Box>

            <Box className="add-field" onClick={addRadioButton}>
              <RadioButtonCheckedIcon />

              <Typography variant="body1" className="field-text">
                Radio Button
              </Typography>

              <IconButton className="add-icon">
                <AddIcon />
              </IconButton>
            </Box>

            <Box className="add-field" onClick={addCategoryButtons}>
              <CategoryIcon />

              <Typography variant="body1" className="field-text">
                Category Buttons
              </Typography>

              <IconButton className="add-icon">
                <AddIcon />
              </IconButton>
            </Box>

            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                Show based on URL conditions
              </Typography>

              <Switch color="primary" sx={{ ml: 2 }} />
            </Box>

            <Input
              placeholder="http://"
              fullWidth
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px',
              }}
            />

            <Box display="flex" alignItems="center" mt={4} mb={2}>
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                Show on a specific date
              </Typography>

              <Switch color="primary" sx={{ ml: 2 }} />
            </Box>

            <Input
              placeholder="Start date"
              fullWidth
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px',
              }}
            />

            <Box display="flex" alignItems="center" mt={4}>
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                Show on a specific time
              </Typography>

              <Switch color="primary" sx={{ ml: 2 }} />
            </Box>

            <Input
              placeholder="Select time"
              fullWidth
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px',
              }}
            />
          </>
        ) : (
          <Box className="back-to-add-fields">
            <Box display="flex" alignItems="center" className="heading2">
              <IconButton className="back-icon" onClick={backToAddFields}>
                <ArrowBackIcon />
              </IconButton>

              <Typography variant="body1" className="back-text">
                Back to Add Fields
              </Typography>
            </Box>

            <Box className="textfield-container">
              <Typography variant="body1">Label</Typography>

              <Input
                fullWidth
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="custom-input"
                disableUnderline
              />
            </Box>

            <Box style={{ display: 'flex' }}>
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                Required
              </Typography>

              <Switch color="primary" />
            </Box>

            {editingFieldId !== null &&
            fields.find((f) => f.id === editingFieldId).type ===
              'radio-button' ? (
              <Box className="textfield-container">
                <Typography variant="body1">Options</Typography>

                {radioOptions.map((option, index) => (
                  <Box key={index} className="option-container">
                    <Input
                      fullWidth
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      className="custom-input"
                      disableUnderline
                    />
                  </Box>
                ))}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  className="cancel"
                >
                  Cancel
                </Button>
              </Box>
            ) : editingFieldId !== null &&
              fields.find((f) => f.id === editingFieldId).type ===
                'category-buttons' ? (
              <Box className="textfield-container">
                <Typography variant="body1">Buttons</Typography>

                {categoryButtons.map((button, index) => (
                  <Box key={index} className="option-container">
                    <Input
                      fullWidth
                      value={button}
                      onChange={(e) =>
                        handleCategoryChange(index, e.target.value)
                      }
                      className="custom-input"
                      disableUnderline
                    />
                  </Box>
                ))}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  className="cancel"
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              <Box className="textfield-container">
                <Typography variant="body1">Error Message</Typography>

                <Input
                  fullWidth
                  value={errorMessage}
                  onChange={(e) => setErrorMessage(e.target.value)}
                  className="custom-input"
                  disableUnderline
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  style={{ marginTop: '15px' }}
                >
                  Save
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  style={{ marginTop: '15px' }}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Formbuilder
