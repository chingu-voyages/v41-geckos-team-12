import React from 'react'
import './styles.scss'

export const MessageDate = ({
  date,
}: {
  date: {
    minute: string
    hour: string
    day: string
    month: string
    year: string
  }
}) => {
  return (
    <div className="msg-date">
      {date.day}/{date.month}/{date.year} at {date.hour}:{date.minute}
    </div>
  )
}
