import React from 'react'

import { Box, Typography, IconButton, Modal, Button } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

import './Dashboard.css'

const Dashboard = ({ onCreate, forms, onSelectForm }) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <Box className="dashboard-container">
      <Box className="form-container">
        <Box className="new-form-container" onClick={handleOpen}>
          <IconButton size="large" className="add-icon">
            <AddIcon />
          </IconButton>

          <Typography variant="h6" className="new-form-text">
            New Form
          </Typography>
        </Box>

        <Box className="saved-forms-container">
          {forms.length > 0 && (
            <Box className="saved-forms-row">
              {forms.map((form, index) => (
                <Box
                  key={index}
                  className="saved-form"
                  onClick={() => onSelectForm(form)}
                >
                  <Typography variant="body1">{form.name}</Typography>

                  <Typography variant="body1">View Submission</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="modal-box">
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            className="modal-title"
          >
            Create Feedback Form
          </Typography>

          <Typography id="modal-description" className="modal-description">
            Generic Website Rating
          </Typography>

          <hr className="modal-divider" />

          <Box className="modal-buttons">
            <Button onClick={handleClose} className="modal-button">
              Cancel
            </Button>

            <Button
              onClick={() => {
                onCreate()
                handleClose()
              }}
              variant="contained"
              className="modal-button"
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default Dashboard
