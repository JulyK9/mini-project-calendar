import React from 'react'

const DeleteEventModal = ({ onDelete, eventText, onClose }) => {
  return (
    <>
      <div id="deleteEventModal">
        <h2>Event</h2>

        <p id="eventText">{eventText}</p>

        <button id="deleteButton" onClick={onDelete}>Delete</button>
        <button id="closeButton" onClick={onClose}>Close</button>

      </div>

      <div id="modalBackDrop"></div>
    </>
  )
}

export default DeleteEventModal