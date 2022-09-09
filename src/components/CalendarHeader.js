import React from 'react'

const CalendarHeader = ({ dateDisplay, onNext, onBack }) => {
  return (
    <header id="header">
      <div id="monthDisplay">{dateDisplay}</div>
      <div className="button_container">
        <button className="backbutton" onClick={onBack}>Back</button>
        <button className="nextbutton" onClick={onNext}>Next</button>
      </div>
    </header>
  );
};

export default CalendarHeader