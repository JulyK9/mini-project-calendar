import React, { useState } from 'react'

const NewEventModal = ({ onSave, onClose }) => {

  const [title, setTitle] = useState("")
  const [error, setError] = useState(false)

  return (
    <>
      <div id="newEventModal">

        <h2>New Event</h2>

        <input
          id="eventTitleInput"
          className={error ? "error" : ""}
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button id="saveButton" onClick={() => {
          if (title) {
            setError(false)
            onSave(title)
          } else {
            setError(true)
          }
        }}>Save</button>

        <button id="cancelButton" onClick={onClose}>Cancle</button>
      </div>

      <div id="modalBackDrop"></div>
    </>
  );
}

export default NewEventModal