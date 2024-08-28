import React, { useState } from 'react'

import './App.css'

import Dashboard from './components/Dashboard'

import Formbuilder from './components/Formbuilder/Formbuilder'

function App() {
  const [showFormBuilder, setShowFormBuilder] = useState(false)

  const [savedForms, setSavedForms] = useState([])

  const [selectedForm, setSelectedForm] = useState(null)

  const handleOpenNewFormbuilder = () => {
    setShowFormBuilder(true)
  }

  const handleBackToDashboard = () => {
    setShowFormBuilder(false)
  }

  const handleSaveForm = (formFields) => {
    setSavedForms([
      ...savedForms,
      { name: `Form ${savedForms.length + 1}`, fields: formFields },
    ])
  }

  const handleSelectForm = (form) => {
    setSelectedForm(form)

    setShowFormBuilder(false)
  }

  return (
    <div className="App">
      <header className="App-header">USER FEEDBACK</header>

      {showFormBuilder ? (
        <Formbuilder onBack={handleBackToDashboard} onSave={handleSaveForm} />
      ) : selectedForm ? (
        <Formbuilder
          formId={selectedForm.id}
          existingForm={selectedForm.fields}
          onBack={() => setSelectedForm(null)}
          onSave={() => {}}
        />
      ) : (
        <Dashboard
          onCreate={handleOpenNewFormbuilder}
          forms={savedForms}
          onSelectForm={handleSelectForm}
        />
      )}
    </div>
  )
}

export default App
