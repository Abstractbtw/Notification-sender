import React from 'react'
import './popup.css'

function ErrorText(props) {

  return (props.trigger) ? (
    <div className="error_text">{props.message}</div>
  ) : ""
}

function LabelText(props) {

  return (
    <div className="label_text">{props.message}</div>
  )
}

export {ErrorText, LabelText}