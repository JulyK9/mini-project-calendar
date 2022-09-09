import React from 'react'

const Day = ({ day, onClick }) => {

  // 날짜가 패딩에 해당할 경우 padding 클레스 네임이 없도록 하여 css가 적용되지 않도록 함
  const className = `day ${day.value === "padding" ? "padding" : ''} ${day.isCurrentDay ? "currentDay" : ""}`

  return (
    
    <div className={className} onClick={onClick}>
      {day.value !== 'padding' ? day.value : ''}
      
      {/* title 이 뭔지 아직 이해가 안됨??? */}
      {day.event && <div className='event'>{day.event.title}</div>}
    </div>
  )
}

export default Day